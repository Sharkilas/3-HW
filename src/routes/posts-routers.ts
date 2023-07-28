import { Router } from "express";
import { Request, Response } from "express";
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";

import { blogIdPostValidation, contentPostValidation, errorValidationMiddleware,  shortDescriptionPostValidation, titlePostValidation } from "../Validation/postValidation";
import {body, validationResult} from "express-validator";
import { TCreatePostInputModels, TUpdatePostInputModels } from "../models/BlogsPostsmodels";
import { postsRepositories } from "../repositories/Post-in-db-Rep";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";

export const postsRoute = Router ({})  



  
postsRoute.get('/', async (req: Request, res: Response) => {
    res.status(httpStatusCodes.OK_200).send(await postsRepositories.getPosts())                   //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
  })
  
postsRoute.get('/:id', async (req: Request, res: Response) => {
  let foundPost = await postsRepositories.getPostsId(req.params.id);
  if (foundPost) {
    res.status(httpStatusCodes.OK_200).json(foundPost)    
      } else {
        res.sendStatus(404)
      }
  })
postsRoute.post('/', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware,                  
async  (req: Request, res: Response) => { 
 const title = req.body.title
 const shortDescription = req.body.shortDescription
 const content = req.body.content
 const blogId = req.body.blogId

const createdPost = await postsRepositories.createPosts({title, shortDescription, content, blogId})
  res.status(httpStatusCodes.CREATED_201).send(createdPost)
})
   
    
  
postsRoute.put('/:id', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware, 
  async (req: Request, res: Response) => { 
  const updatedPostModel: TUpdatePostInputModels = {   // исправить как в блоге
  id: req.params.id,
  title: req.body.title,
  shortDescription: req.body.shortDescription,
  content: req.body.content,
  blogId: req.body.blogId
   } 
   const updatedPost: Boolean = await postsRepositories.updatePost(updatedPostModel)  
  if (!updatedPost) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

postsRoute.delete('/:id', 
authGuardMiddleware,
async  (req: Request, res: Response) => {
    let isDeleted: boolean = await postsRepositories.deletePost(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })
  