import { BlogModelMongoDb, TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { blogsClientCollection, client, db } from "./db";
import { randomUUID } from "crypto";

  
  export const blogsRepositories = {
  async getBlogs() {
    return blogsClientCollection.find({}, {projection: {_id: 0}}).toArray()               // в вмдео не было но мне кажется так правильно                                
  },
  async getBlogById(id: string): Promise<BlogModelMongoDb| null> { 
    
    return await blogsClientCollection.findOne({id}, {projection: {_id: 0}})
     },

     async updateBlog({id, name, description, websiteUrl}: TUpdateBlogInputModel): Promise <boolean> {
    const result = await blogsClientCollection.updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
      return result.modifiedCount === 1
     },

     //TODO: map || mongodb projection чтобы убрать монго id

  async createBlog({name, description, websiteUrl}: TCreateBlogInputModel): Promise <TBlogViewModel> {                   
    const newBlog: TBlogDbModel = {         ////пробовал ставить BlogModelMongoDb все равно подчеркивает ошибку
      id:	randomUUID(),                     
      name:	name,
      description:	description,
      websiteUrl: websiteUrl,
      createdAt: currentDate.toISOString(),
      isMembership: false
  }
  
   await blogsClientCollection.insertOne({...newBlog});

   return newBlog   

}, 
// result.insertedId
   //const: TBlogDbModel = newBlog.map()
   //const withIdResult: any = blogsClientCollection.find({name:	name}).project({
    //id:1, name:1, description:1, websiteUrl:1, createdAt:1, isMembership:1, _id:0});
    // const withIdResult: BlogModelMongoDb = newBlog.shift()



  async deleteBlog(id: string): Promise <boolean> {
  const result = await blogsClientCollection.deleteOne({id: id}) 
  return  result.deletedCount === 1
  },
 
  async deleteAllBlogs() {
    await blogsClientCollection.deleteMany({})
    return true
  } 
}
