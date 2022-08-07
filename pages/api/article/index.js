const mongoose = require("mongoose");
const { connectToDatabase } = require('../mongodb');
const {ArticleSchema, registerValidation } = require("../models/article.model");


export default async function handler(req, res) {


    switch(req.method){
        case  'GET' :
            return await getArticles(req,res)
            break;
        case  'POST' :
            return postArticle(req,res)
            break;
        default :
            res.status(400).json("Not Found")
        break;
    }
    
}



const getArticles = async (req,res) =>{

   
    try {

        let { db } = await connectToDatabase();

        // fetch the posts
        let Article = await db.collection('article')
            
        //Cherche un utilisateur avec cette email dans la base de donnée
        const articles = await Article.find({}).toArray()

        //Success
        return res.send({
            success: true,
            data : articles
        });

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }


}

const postArticle = async (req,res) =>{

    try{
        // fetch the posts
        let { db } = await connectToDatabase();

        const { error } = registerValidation(req.body);
    
        if (error){
            
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });
        }
    
        // fetch the posts
        let Article = await db.collection('article')
        let newArticle = req.body
        newArticle.poster = "https://picsum.photos/1024/700"
        newArticle.sections = []
        
        //Cherche un utilisateur avec cette email dans la base de donnée
        const articles = await Article.insert(newArticle)

        
        res.json({key : articles?.insertedIds[0]})
        //res.json("jj")
    }catch(err){
        return res.status(400).json({
            error: true,
            message: err.message,
        });
    }
    



}

