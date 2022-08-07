const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const slugify = require("slugify");

mongoose.Promise = global.Promise;
const model = mongoose.model

const Section = new Schema(
    {
        pos : {
            type : Number,
            required : true,
        },
        type : {
            type : String,
        },
        meta : {
            type : String,
        },
        content: { type: String},
    }
);

export const ArticleSchema = new Schema(
    {
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
        },
        poster : {
            type : String,
        },
        category : {
            type : String,
        },
        slug : {
            type : String,
            unique : true
        },
        sections : {
            type : Array
        }
        
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        versionKey: false
    }
);



// articleSchema.pre('validate',function(next){
//     if(this.title){
//         this.slug = slugify(this.title,{lower : true,strict : true})
//     }
//     next()
// })

//module.exports = mongoose.models.Article || mongoose.model("article",ArticleSchema)


const registerValidation = Joi.object({
    title: Joi.string().min(2).required(),
    category: Joi.string(),
    poster: Joi.string(),
    description: Joi.string().min(2),
    slug : Joi.string(),
    meta:  Joi.object({
        width: Joi.number(),
        height: Joi.number(),
        alt: Joi.string(),
    }),
    sections: Joi.array(),
});

const updateValidation = Joi.object({
    _id: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    category: Joi.string(),
    poster: Joi.string(),
    description: Joi.string().min(2),
    updatedAt : Joi.string(),
    slug : Joi.string(),
    meta:  Joi.object({
        width: Joi.number(),
        height: Joi.number(),
        alt: Joi.string(),
    }),
    sections: Joi.array(),
});


module.exports.registerValidation = (data) => {
    return registerValidation.validate(data);
}

module.exports.updateValidation = (data) => {
    return updateValidation.validate(data);
}
