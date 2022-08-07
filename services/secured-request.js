import axios from "axios";
import { config } from "../config";

const getAccessToken = ()=>{

    if(typeof window !== 'undefined'){
        return window.localStorage.getItem("access_token");
    }
    return null
} 



export async function secured_request({type,endpoint,data}){

    const authorization = getAccessToken()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization
    }
    

    var res = null

    switch(type){

        case "POST" :
            res = await axios.post(`${config.API_ENDPOINT}/${endpoint}`,
                data,
                {
                    headers: headers
                }
            )
        
        break;

        case "PATCH" :

            res = await axios.patch(`${config.API_ENDPOINT}/${endpoint}`,
                data,
                {
                    headers: headers
                }
            )
    
        break;
            

        case "GET" :
            res = await axios.get(`${config.API_ENDPOINT}/${endpoint}`,
                {
                    headers: headers
                }
            )
        
        break

        default : 
            res = await axios.get(`${config.API_ENDPOINT}/${endpoint}`,
                {
                    headers: headers
                }
            )
        break
        
    }
   

    return res?.data

}