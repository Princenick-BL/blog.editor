import { secured_request } from "./secured-request";


export async function uploadfile(file){

    return secured_request({
        type : "POST",
        endpoint : "upload",
        data : file
    })

    
}
export async function getFiles(type){

    return secured_request({
        type : "GET",
        endpoint : `files?type=${type}`,
    })

    
}