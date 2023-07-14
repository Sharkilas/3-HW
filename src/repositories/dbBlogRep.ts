import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { db } from "./db";
import { randomUUID } from "crypto";

  export const blogsRepositories = {
  async getBlogs() {
    return db.blogs
  },
  async getBlogById(id: string) {
     return db.blogs.find(p=>p.id===id)
     },

  async updateBlog(updateBlogModel: TUpdateBlogInputModel): Promise <boolean> {
    let filterBlogs =  db.blogs.find(b=>b.id=== updateBlogModel.id)
    if (filterBlogs) {
      filterBlogs.name = updateBlogModel.name;                       
      filterBlogs.description = updateBlogModel.description;
      filterBlogs.websiteUrl = updateBlogModel.websiteUrl;
      filterBlogs.createdAt = currentDate.toISOString();
      filterBlogs.isMembership = true

      return true
      }
      else {
        return false}

  },

  async createBlog({name, description, websiteUrl}: TCreateBlogInputModel): Promise <TBlogViewModel> {                   
    const newBlog: TBlogDbModel = {
      id:	randomUUID(),                      // todo почитай 
      name:	name,
      description:	description,
      websiteUrl: websiteUrl,
      createdAt: currentDate.toISOString(),
      isMembership: true
  }
    db.blogs.push(newBlog); 
    return newBlog      

}, 
  async deleteBlog(id: string) {
    const blogIndex = db.blogs.findIndex(item => item.id === id)
    if(blogIndex === -1)
    return false
    db.blogs.splice(blogIndex, 1)
    return true
  }
}
