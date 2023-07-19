import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { blogsClientCollection, client, db } from "./db";
import { randomUUID } from "crypto";

  
  export const blogsRepositories = {
  async getBlogs() {
    return blogsClientCollection               // в вмдео не было но мне кажется так правильно                                
  },
  async getBlogById(id: string): Promise<TBlogDbModel| null> {           // не понятно какие нужно указывать модели
     const filter: any = {}                       
     if (id)
     {filter.id= {$regex: id}                            // как в видео не подчеркивает ID
     }
    
    return await blogsClientCollection.findOne(filter)
     },

  async updateBlog({id, name, description, websiteUrl}: TUpdateBlogInputModel): Promise <boolean> {
    const result = await blogsClientCollection.updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl, createdAt: currentDate.toISOString()}})
      return result.modifiedCount === 1
     },

  async createBlog({name, description, websiteUrl}: TCreateBlogInputModel): Promise <TBlogViewModel> {                   
    const newBlog: TBlogDbModel = {
      id:	randomUUID(),                     
      name:	name,
      description:	description,
      websiteUrl: websiteUrl,
      createdAt: currentDate.toISOString(),
      isMembership: true
  }
   const result =  await blogsClientCollection.insertOne(newBlog)
   return newBlog      

}, 
  async deleteBlog(id: string): Promise <boolean> {
  const result = await blogsClientCollection.deleteOne({id: id}) 
  return  result.deletedCount === 1
  }
}
