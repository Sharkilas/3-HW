import request from "supertest"
import { httpStatusCodes } from "../src/http-status-codes/http-status-codes";
import { app } from './../src';
describe ('/blogs', () =>{
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it ('should return 200 add empty array', async () => {
    await request(app)
        .get("/blogs")
        .expect (httpStatusCodes.OK_200)
        })
    it ('should return 404 for not existing blogs', async () => {
    await request(app)
        .get("/blogs/1")
        .expect (httpStatusCodes.BAD_REQUEST_400)
       })

    it ("should'nt create blogs with incorrect input data", async () => {
       await request(app)
       .post ('/blogs')
       .send ({name : ''})
       .expect(httpStatusCodes.BAD_REQUEST_400)
       
       await request(app)
       .get("/blogs")
       .expect (httpStatusCodes.OK_200)
       
    
    }) 
    let createdBlog: any = null
    it ("should create blogs with correct input data", async () => {
     const createResponse  =  await request(app)
        .post ('/blogs')
        .send ({name : 'VASILICH'})
        .expect(httpStatusCodes.CREATED_201)

       const createdBlog = createResponse.body;
       expect(createdBlog).toEqual({
        id : expect.any(Number),
        name : 'VASILICH'
       })
        
        await request(app)
        .get("/blogs")
        .expect (httpStatusCodes.OK_200, [createdBlog])
        
     
     }) 

     it ("should'nt update blogs with incorrect input data", async () => {
        await request(app)
        .put ('/blogs/'+ createdBlog.id)
        .send ({name : ''})
        .expect(httpStatusCodes.BAD_REQUEST_400)
        
        await request(app)
        .get("/blogs/"+ createdBlog.id)
        .expect (httpStatusCodes.OK_200, createdBlog)
    }) 

    it ("should'nt update blogs that not exist", async () => {
        await request(app)
        .put ('/blogs/'+ "-22")
        .send ({name : 'good title'})
        .expect(httpStatusCodes.NOT_FOUND_404)
             
    }) 
    it ("should update blogs with correct input data", async () => {
        await request(app)
        .put ('/blogs/'+ createdBlog.id)
        .send ({name : 'good new title'})
        .expect(httpStatusCodes.NO_CONTEND_204)
        
        await request(app)
        .get("/blogs/"+ createdBlog.id)
        .expect (httpStatusCodes.OK_200, {
            ...createdBlog,
            title: 'good new title'})
    }) 

    it ("should delete blogs", async () => {
        await request(app)
        .delete ('/blogs/'+ createdBlog.id)
        .expect(httpStatusCodes.NO_CONTEND_204)
        
        await request(app)
        .get("/blogs/"+ createdBlog.id)
        .expect (httpStatusCodes.NOT_FOUND_404)
        
        await request(app)
        .get("/blogs")
        .expect (httpStatusCodes.OK_200, [])
    }) 

})