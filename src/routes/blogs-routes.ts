import { Router } from "express"
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";
import { blogsRepositories } from "../repositories/Blog-in-db-Rep"
import { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import {descriptionBlogValidation, nameBlogValidation, websiteBlogUrlValidation} from "../Validation/blogValidation"; //
import { errorValidationMiddleware } from "../Validation/postValidation";
import { TUpdateBlogInputModel } from "../models/BlogsPostsmodels";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";
import { currentDate } from "../Helper/Helper";



export const blogsRoute = Router ({})  



blogsRoute.get('/', async (req: Request, res: Response) => {
      res.status(httpStatusCodes.OK_200).send(await blogsRepositories.getBlogs())
 })

blogsRoute.get('/:id', async (req: Request, res: Response) => {
    let foundBlogs = await blogsRepositories.getBlogById(req.params.id);
    if (foundBlogs) {
        res.status(httpStatusCodes.OK_200).json(foundBlogs)   
      } else {
        res.sendStatus(404)
      }
      
    })
                                                             //const foundBlogs = blogsRepositories.findBlog(req.query.name?.toISOString());

blogsRoute.post('/', 
authGuardMiddleware,
websiteBlogUrlValidation,
nameBlogValidation,
descriptionBlogValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const createdBlog = await blogsRepositories.createBlog({name, description, websiteUrl})
    res.status(httpStatusCodes.CREATED_201).send(createdBlog)
})
      
    
blogsRoute.put('/:id', 
authGuardMiddleware,
websiteBlogUrlValidation,
nameBlogValidation,
descriptionBlogValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const updateBlogModel: TUpdateBlogInputModel = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
    createdAt: currentDate.toISOString(),
    isMembership: true
  }
  const updatedBlogs: Boolean = await blogsRepositories.updateBlog(updateBlogModel) 
    
  if (!updatedBlogs) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

  blogsRoute.delete('/:id', 
  authGuardMiddleware,
  async (req: Request, res: Response) => {
    let isDeleted: boolean = await blogsRepositories.deleteBlog(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })


