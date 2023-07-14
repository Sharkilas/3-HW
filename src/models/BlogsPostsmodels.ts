export type TCreatePostInputModels =
{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  }
 
 export type TUpdatePostInputModels =
  {
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      }
  export type TPostDbModels =
      {
       id: string,
       title: string,
       shortDescription: string,
       content: string,
       blogId: string,
       blogName: string, 
       createdAt: string
    }
    export type TPostViewModels =
    {
     id: string,
     title: string,
     shortDescription: string,
     content: string,
     blogId: string,
     blogName: string,
     createdAt: string
  }



//export const qualityCheck = (arr: string [], arr2: string []) => {
//    return arr.every((res: string) => arr2.includes(res))
//}


export type TCreateBlogInputModel = {
  name: string,
  description: string,
  websiteUrl: string
}

export type TUpdateBlogInputModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string,
  createdAt: string,
  isMembership: true
}

export type TBlogDbModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string,
  createdAt: string,
  isMembership: true
}

export type TBlogViewModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string,
  createdAt: string,
  isMembership: true

}