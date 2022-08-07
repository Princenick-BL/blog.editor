import React,{useEffect,useState,useContext} from 'react'
import { getCookie } from 'react-use-cookie';
import jwtDecode from 'jwt-decode';
import { THEME } from '../constant';

export const GlobalContext = React.createContext();


const GlobalReducer = (state,action) =>{    
    
    switch (action.type) {
        case 'toggle/theme':
            return {...state,theme:action.payload }
        case 'LOGIN':
            if(action.payload){
                const identity = jwtDecode(action.payload)
                return {...state,identity:identity }
            }
            return {...state}

        case 'LOGOUT':
            if(typeof window !== 'undefined'){
                window.localStorage.removeItem("access_token");
            }
            return {...state,identity:null }    
        default:
            break;
    }
}



function GlobalProvider({children}){
    

    if(typeof window !== 'undefined'){
        var access_token =  window.localStorage.getItem("access_token");
        var identity = null
        if(access_token){
            identity = jwtDecode(access_token)
        }
    }

    const defaultvalue ={
        identity : identity,
        theme : THEME.LIGHT
    }

    const [state,dispatch] = React.useReducer(GlobalReducer,defaultvalue)

    const value = {state,dispatch}

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

function useGlobalContext(){
    const context = useContext(GlobalContext)
    if(context == undefined){
        throw new Error('useGlobalContext must be used within a GlobalContext')
    }
    return context
}

export {GlobalProvider,useGlobalContext}