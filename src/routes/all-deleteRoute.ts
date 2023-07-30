import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction, Router} from 'express';
import { blogsClientCollection, postsClientCollection } from '../repositories/db';

export const testingRouters = Router({})



testingRouters.delete ('/testing/all-data', 
async (req: Request, res: Response) => {
  await Promise.all([ 
      blogsClientCollection.deleteMany({}),  
      postsClientCollection.deleteMany({})
]) 
  res.sendStatus(204) 
})