import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TCreatePostInputModels, TPostDbModels, TPostViewModels, TUpdateBlogInputModel, TUpdatePostInputModels} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { db } from "./db";
import { randomUUID } from "crypto";

export const postsRepositories = {
  async getPosts() {
    return db.posts
  }, 
  async getPostsId(id: string ) {
    return db.posts.find(p=>p.id===id)
  },
  async createPosts({title, shortDescription, content, blogId}: TCreatePostInputModels): Promise <TPostViewModels> {                        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
  const blog = db.blogs.find(b => b.id === blogId)
    const newPost: TPostDbModels = {
    id: randomUUID(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: blog!.name,
    createdAt: currentDate.toISOString(),
  } 
  db.posts.push(newPost)
  return newPost  
 },
 async updatePost ({id, shortDescription, content, title, blogId}:TUpdatePostInputModels) {                  
  let filterPosts =  db.posts.find(p=>p.id===id)
  if (filterPosts) {
    filterPosts.title = title
    filterPosts.shortDescription = shortDescription;                       
    filterPosts.content = content;
    filterPosts.blogId = blogId

    return true
    }
    else {return false}
 },
 async deletePost(id: string) {
  const post = db.posts.find(p => p.id === id)
  if(!post)return false
  db.posts = db.posts.filter(p => p.id !== id)
  return true
} 
}