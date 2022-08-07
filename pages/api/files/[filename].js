const mongoose = require("mongoose");
const Grid = require('gridfs-stream')
const { connectToDatabase } = require('../mongodb');
const {ArticleSchema, registerValidation } = require("../models/article.model");


export default async function handler(req, res) {


    switch(req.method){
        case  'GET' :
            return await getFile(req,res)
            break;
        default :
            res.status(400).json("Not Found")
        break;
    }
    
}



const getFile = async (req,res) =>{

    const filename = req.query.filename

   
    try {
        let { db } = await connectToDatabase();

        var gfs = Grid(db, mongoose.mongo);
        gfs.collection('uploads');
        let bucket = new mongoose.mongo.GridFSBucket(db,  {
            bucketName: "uploads"
          });
        gfs.files.findOne({filename: filename}, (err, file) => {

            if(!file || file.length === 0){
                return res.status(404).json({err: 'No File Exists'});
            } else {
                // Check if is image
                if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
                    // Read output to broswer
                    bucket.openDownloadStreamByName(filename)  // code for other query
                    .pipe(res);
                    // readstream.pipe(res);
                    //return res.send("true")
                } else {
                    return  res.status(404).json({err: 'Not and image'});
                }
            }
        });
    } catch (err) {

        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }


}
