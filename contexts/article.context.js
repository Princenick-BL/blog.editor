import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios';

export const ArticleContext = React.createContext();


const ArticleReducer = (state,action) =>{    

    const {
        pos,
        value,
        url
    } = action?.payload;

    const sections = state?.article?.sections
    var section = null
    
    //console.log(action?.payload)
    
    if(sections && pos!==null){
        section = sections[pos];
    }

    //console.log(section)

    switch (action.type) {

        case 'init':

            state.article = value

            return {
                ...state,
            } 

        break

        case 'add-object':

            state.article.sections = [...state?.article?.sections,value]

            return {
                ...state,
            } 
        break

        case 'patch-text':


            if(section){
                section.content = value;
                state.article.sections[pos] = section
            }

            return {
                ...state,
            } 
        break

        case 'patch-image':


            if(section){
                section.content = url;
                state.article.sections[pos] = section
            }


            return {
                ...state,
            } 
        break

        case 'patch-image-dim':

            console.log("1",value?.width ,"&", value?.height)

            if(section && value?.width && value?.height){
                section.meta.width = value?.width;
                section.meta.height = value?.height;
                state.article.sections[pos] = section
            }


            return {
                ...state,
            } 
        break
    
        case 'patch-header':

            const {
                title,
                category,
                poster,
                description
            } = value;


            if(title || category){

                state.article.title = title
                state.article.category  = category
                state.article.poster  = poster
                state.article.description = description
                state.article.slug = title.toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            }

            return {
                ...state,
            } 

        break
            
            
               
        case 'remove':


            state.article.sections.splice(pos, 1); 
            

            return {
                ...state,
            } 
        break

        default:
            return {
                ...state,
            } 
        break;
    }
}



function ArticleProvider({children}){
    
    var article = null
   
    const defaultValue = {
        article : article
    }
    
    const [state,dispatch] = React.useReducer(ArticleReducer,defaultValue)

    const value = {state,dispatch}

    return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
}

function useArticleContext(){
    const context = useContext(ArticleContext)
    if(context == undefined){
        throw new Error('useArticleContext must be used within a ArticleContext')
    }
    return context
}

export {ArticleProvider,useArticleContext}