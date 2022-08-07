const { connectToDatabase } = require('../mongodb');
const { createSecureToken } = require("../middlewares/secured");
const { comparePasswords, registerValidation } = require("../models/users.model");

const authenticate = async (req,res)=>{
    try {

        let { db } = await connectToDatabase();
        // fetch the posts
        let Users = await db.collection('users')
            
        //Vérifie si toutes les données sont presentes
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Missing credential",
            });
        }

        //Cherche un utilisateur avec cette email dans la base de donnée
        const user = await Users.findOne({ email: email });

        //Vérifie si il y a un résultat, sinon retourne
        if (!user) {
            return res.json({
                error: true,
                message: "Sorry we didn't find your account",
                code : 205
            });
        }

        //Vérifie si le mot de passe correspond
        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
            return res.json({
                error: true,
                message: "Wrong credentials",
            });
        }

        //Créé le token d'authentification
    
        const token = createSecureToken(user);
        if (!token)
            return res.json({
                error: true,
                message: "Token creation error"
            });

        //Success
        return res.send({
            success: true,
            message: "Welcome back!",
            token: token,
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
}

export default async function handler(req, res) {
    // switch the methods
    switch(req.method){
        case  'POST' :
            return await authenticate(req,res)
        default :
            return res.status(400).json('Not found')
        break;
    }
    
}