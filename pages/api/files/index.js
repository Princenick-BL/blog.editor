const mongoose = require("mongoose");
const Grid = require('gridfs-stream')
const { connectToDatabase } = require('../mongodb');
const {ArticleSchema, registerValidation } = require("../models/article.model");


export default async function handler(req, res) {


    switch(req.method){
        case  'GET' :
            return await getFiles(req,res)
            break;
        default :
            res.status(400).json("Not Found")
        break;
    }
    
}



const getFiles = async (req,res) =>{

   
    try {
        let { db } = await connectToDatabase();

        var gfs = Grid(db, mongoose.mongo);
        gfs.collection('uploads');
        gfs.files.find().toArray((err,files)=>{
    
            if(!files || files.length === 0){
                return res.status(200).json({
                    success:true,
                    files : []
                })
            }
            let fileInfos = [];
            var baseUrl = req.headers.host;
            files.forEach((doc) => {
                fileInfos.push({
                    name: doc.filename,
                    url: 'http://'+baseUrl+"/api/files/"+ doc.filename,
                });
            });
            return res.status(200).json({
                success : true,
                files : fileInfos
            })
        })

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }


}
