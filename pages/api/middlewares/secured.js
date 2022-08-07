const jwt = require("jsonwebtoken");
const {Users} = require("../models/users.model");

module.exports.createSecureToken = function (user) {
    return jwt.sign(
        { 
            id: user.id ,
            email : user.email,
            firstName : user.firstname,
            lastName : user.lastname,
            right : user.userRight,
            avatar: user.userAvatar
        },
        process.env.NEXT_PUBLIC_APP_JWT_KEY,
        { expiresIn: "1h" });
}

module.exports.verifyToken = (userCheck) => {
    return (req, res, next) => {
        if (process.env.DEV !== undefined && process.env.DEV === 'true') return next();
        var token, header;
        try {
            token = req.headers.authorization;
            // if (!header) return res.status(401).send({ error: 'Please authenticate before' });
            // token = header.split(' ');
            // console.log(token)
        }
        catch (err) {
            token = "";
        }
        if (!token) return res.status(401).send({ error: 'Please authenticate before' });
        try {
            req.user = jwt.verify(token, process.env.NEXT_PUBLIC_APP_JWT_KEY, {expiresIn: "12h"});
            // check if id exists in db

            Users.findOne({ id: req.user.id }).then(user => {
                if (!user){ 
                    res.status(403).send({ error: 'Access Denied' });
                }else {
                    // if (userCheck !== undefined && userCheck !== null){
                    //     console.log(userCheck)
                    //     if (!userCheck(user, req)){
                    //         return res.status(401).send({ error: 'Access Denied' });
                    //     }
                    // }
                    next();
                }
            });
        }catch (err) {
            return res.status(400).send({ error: 'Expired Token' });
        }
    }
}