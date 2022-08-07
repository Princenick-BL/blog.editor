const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema(
    {
        userId: { type: String, unique: true, required: true },
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        userRight : { type:String , require: true, enum: [1, 2, 3,4,5] },
        userAvatar : { type:String, require: false },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        versionKey: false
    }
);

const registerValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().min(2),
    lastname: Joi.string().min(2),
    userRight: Joi.string().valid(1,2,3,4,5),//5:visitor
    userAvatar : Joi.string().min(2).uri(),

});

const updateValidation = Joi.object({
    userId: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6),
    firstname: Joi.string().min(2),
    lastname: Joi.string().min(2),
    userRight: Joi.string().valid(1,2,3,4,5),
    userAvatar : Joi.string().min(2).uri(),
});



module.exports.registerValidation = (data) => {
    return registerValidation.validate(data);
}

module.exports.updateValidation = (data) => {
    return updateValidation.validate(data);
}

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error("Comparaison failed", error);
    }
};