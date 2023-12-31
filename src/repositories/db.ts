import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TPostDbModels, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { getRandomId } from "../Helper/Helper";
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb//:0.0.0.0:27017'
export const client = new MongoClient(mongoURI);

export let blogsClientCollection = client.db("homework-api").collection<TBlogDbModel>('blogs'); 
export let postsClientCollection = client.db("homework-api").collection<TPostDbModels>('posts'); 

export async function runDB () {
  try {
    await client.connect();                                                        // точно это надо?
    await client.db("homework-api").command({ping: 1});
    console.log("Connected successufully to mongo server");
    }
    catch {
      console.log("Can't connect to db");
      await client.close();
    }
  
} 



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
  