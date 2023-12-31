import request from "supertest"
import { httpStatusCodes } from "../src/http-status-codes/http-status-codes";
import { app } from './../src';

const createBlog = {
"name": "Silich",
"description": "string",
"websiteUrl" : "https://samurai.it-incubator.io/pc/video-content/watch/clk9blozj08zcn113881muilc"
};
const headers= {
    "Authorization": 'Basic YWRtaW46cXdlcnR5'
}



describe ('/blogs', () =>{
    beforeAll(async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(httpStatusCodes.NO_CONTEND_204)
    })

    it ('should return 200 add empty array', async () => {
    await request(app)
        .get("/blogs")
        .expect (httpStatusCodes.OK_200)
        })
    it ('should return 404 for not existing blogs', async () => {
    await request(app)
        .get("/blogs/11")
        .expect (httpStatusCodes.BAD_REQUEST_400)
       })

    it ("shouldn't create blogs with incorrect input data", async () => {
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
    afterAll (done => {
        done()
    })

})