import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TPostDbModels, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { getRandomId } from "../Helper/Helper";



export const db: {blogs: TBlogDbModel[], posts: TPostDbModels[]} ={blogs: [
  {id: "1",
  name: "string1",
  description: "string1",
  websiteUrl: "string1",
  createdAt: "string2",
  isMembership: true
},
  
  {
  id: "string2",
  name: "string2",
  description: "string2",
  websiteUrl: "string2",
  createdAt: "string2",
  isMembership: true
  }], 
  posts: [
    {
      id: "string1",
      title: "string1",
      shortDescription: "string1",
      content: "string1",
      blogId: "string1",
      blogName: "string1",
      createdAt: "string1"
    },
    {
      id: "string2",
      title: "string2",
      shortDescription: "string2",
      content: "string2",
      blogId: "string2",
      blogName: "string2", 
      createdAt: "string2"
    }
  ]}
  