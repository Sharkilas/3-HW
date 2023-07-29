import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';
import dotenv from 'dotenv'
import { blogsRoute } from './routes/blogs-routes';
import { postsRoute } from './routes/posts-routers';
import { blogsClientCollection, db, postsClientCollection, runDB } from './repositories/db';
import { authGuardMiddleware } from './autorization/autorizationmidleware';
import { errorValidationMiddleware } from './Validation/postValidation';
export const app = express()
const port = process.env.port || 3003 //const port = process.env.port || 3003
dotenv.config()
                   
app.use(express.json());

app.use ('/blogs', blogsRoute);
app.use ('/posts', postsRoute);


app.get('/', (req: Request, res: Response) => {
  res.send('Очень Доброе утро 29/07!!!!!')
})    

app.delete ('/testing/all-data', 
  authGuardMiddleware,
  errorValidationMiddleware,
async (req: Request, res: Response) => {
  await Promise.all([ 
      blogsClientCollection.deleteMany({}),  
      postsClientCollection.deleteMany({})
]) 
  res.sendStatus(204) 
})
  
const startApp = async () =>{
  await runDB()
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
}
startApp ()

