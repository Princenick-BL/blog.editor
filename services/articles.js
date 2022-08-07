import { secured_request } from "./secured-request";


export async function getArticles(file){

    return secured_request({
        type : "GET",
        endpoint : "article",
    })

}

export async function getArticle(id){

    return secured_request({
        type : "GET",
        endpoint : `article/${id}`,
    })

}

export async function postArticle({title,category,slug}){

    return secured_request({
        type : "POST",
        endpoint : "article",
        data : {
            title : title,
            category : category,
            slug : slug
        }
    })

}

export async function patchArticle(article){


    return secured_request({
        type : "PATCH",
        endpoint : `article/${article?._id}`,
        data : {
           ...article
        }
    })

}