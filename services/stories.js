import { secured_request } from "./secured-request";


export async function getStories(file){

    return secured_request({
        type : "GET",
        endpoint : "stories",
    })

}

export async function getStory(id){

    return secured_request({
        type : "GET",
        endpoint : `stories/${id}`,
    })

}

export async function postStory({title,category}){

    return secured_request({
        type : "POST",
        endpoint : "stories",
        data : {
            title : title,
            category : category
        }
    })

}

export async function patchStory(story){


    return secured_request({
        type : "PATCH",
        endpoint : `stories/${story?._id}`,
        data : {
           ...story
        }
    })

}