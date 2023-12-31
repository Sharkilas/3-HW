import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TCreatePostInputModels, TPostDbModels, TPostViewModels, TUpdateBlogInputModel, TUpdatePostInputModels} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { blogsClientCollection, client, db, postsClientCollection } from "./db";
import { randomUUID } from "crypto";
import { MongoClient } from 'mongodb'
import { title } from "process";


export const postsRepositories = {
  async getPosts() {
    return postsClientCollection.find({}, {projection: {_id: 0}}).toArray()
  }, 
  async getPostsId(id: string ): Promise<TPostDbModels| null>  {
    const filter: any = {}                       
     if (id)
     {filter.id= {$regex: id}                            // как в видео не подчеркивает ID
     }
     return await postsClientCollection.findOne(filter, {projection: {_id: 0}})
     
  },
  async createPosts({title, shortDescription, content, blogId}: TCreatePostInputModels): Promise <TPostViewModels | null> {        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
  const blog =  await blogsClientCollection.findOne({id: blogId})  
  if(!blog) return null      
    const newPost: TPostViewModels = {
    id: randomUUID(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: blog.name,
    createdAt: currentDate.toISOString(),
  } 
  await postsClientCollection.insertOne({...newPost})
  return newPost  
 },
 async updatePost({id, shortDescription, content, title, blogId}: TUpdatePostInputModels): Promise <boolean> {                  
  const result = await postsClientCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
  return result.modifiedCount === 1
 },
 
 async deletePost(id: string):  Promise <boolean> {
  const result = await postsClientCollection.deleteOne ({id: id}) 
  return  result.deletedCount === 1
},
async deleteAllPost() {
  await postsClientCollection.deleteMany({})
  return true
} 
}