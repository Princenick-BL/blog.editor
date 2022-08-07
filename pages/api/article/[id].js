var mongo = require('mongodb');
const { connectToDatabase } = require('../mongodb');
const {ArticleSchema, updateValidation } = require("../models/article.model");

export default function handler(req, res) {

    switch(req.method){
        case  'GET' :
            return getArticle(req,res)
            break;
       
        case  'PATCH' :
            return patchArticle(req,res)
            break;
        case  'DELETE' :
            deleteArticle()
            break;
        default :
            res.status(400).json("Not Found")
        break;
    }
    
}

const getArticle = async (req,res) =>{

    const articleId = req.query.id
   

    try{

        let { db } = await connectToDatabase();
    
        // fetch the posts
        let Article = await db.collection('article')
        var o_id = new mongo.ObjectID(articleId);

        //Cherche un utilisateur avec cette email dans la base de donnée
        const article = await Article.findOne({_id : o_id})
    
    
        //Success
        return res.send({
            success: true,
            data : article
        });

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }

}

const patchArticle = async (req, res) => {
  
    const articleId = req.query.id

    
    try{

        let { db } = await connectToDatabase();

        const { error } = updateValidation(req.body);

        if (error){

            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });

        }


        let Article = await db.collection('article')
        var o_id = new mongo.ObjectID(articleId);

        const updatedDta = req.body
        delete updatedDta._id
        updatedDta.updatedAt =  new Date().toLocaleDateString()
        // Hash le mot de passe

        let article = await Article.updateOne({ _id: o_id},{$set: updatedDta});

        if (!article){

            return res.status(404).json({
                error: true,
                message: "Cannot found article",
            });

        }

        res.send({
            success: true,
            message: "Updated successfully",
            data : {
                ...updatedDta,
                _id : o_id
            }
        });

    } catch (err) {

        return res.status(400).json({
            error: true,
            message: err.message,
        });
    }

}


    // const article = {
    //     category : "Cars",
    //     title : "Ginger Strawberry Spritzer",
    //     poster : "https://picsum.photos/1024/700",
    //     updatedAt : Date.toString(),
    //     sections : [
    //         {
    //             pos : 1,
    //             type : "TEXT_BLOCK",
    //             meta : {

    //             },
    //             content : `
    //                 <p>Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
    //                 quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
    //                 Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
    //                 Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit
    //                 fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et
    //                 ultrices posuere.</p>`

    //         },
    //         {
    //           pos : 2,
    //             type : "IMAGE_BLOCK",
    //             meta : {
    //                 width : 1280,
    //                 height : 700,
    //                 alt :" Hello world and forstg nflksjl "
    //             },
    //             content : `https://picsum.photos/1024/700`

    //         },
    //         {
    //             pos : 3,
    //             type : "TEXT_BLOCK",
    //             meta : {

    //             },
    //             content : `
    //                 <p>Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
    //                 quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
    //                 Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
    //                 Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit
    //                 fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et
    //                 ultrices posuere.</p>`

    //         },
    //         {
    //             pos : 4,
    //             type : "IMAGE_BLOCK",
    //             meta : {
    //                 width : 1280,
    //                 height : 700,
    //                 alt :" Hello world and forstg nflksjl "
    //             },
    //             content : `https://picsum.photos/1024/700`

    //         },
    //         {
    //             pos : 5,
    //             type : "TEXT_BLOCK",
    //             meta : {

    //             },
    //             content : `
    //                 <p>Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
    //                 quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
    //                 Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
    //                 Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit
    //                 fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et
    //                 ultrices posuere.</p>`

    //         },
    //         {
    //             pos : 6,
    //             type : "IMAGE_BLOCK",
    //             meta : {
    //                 width : 1280,
    //                 height : 700,
    //                 alt :" Hello world and forstg nflksjl "
    //             },
    //             content : `https://picsum.photos/1024/700`

    //         },
    //         {
    //             pos : 7,
    //             type : "TEXT_BLOCK",
    //             meta : {

    //             },
    //             content : `
    //                 <p>Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
    //                 quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
    //                 Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
    //                 Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit
    //                 fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et
    //                 ultrices posuere.</p>`

    //         },
    //         {
    //             pos : 8,
    //             type : "IMAGE_BLOCK",
    //             meta : {
    //                 width : 1280,
    //                 height : 700,
    //                 alt :" Hello world and forstg nflksjl "
    //             },
    //             content : `https://picsum.photos/1024/700`

    //         }




    //     ]
    // }


    //return res.send(article)