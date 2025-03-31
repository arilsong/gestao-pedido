const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            error: "Login required"
        })
    }

    const token = authorization.split(' ')


    try {
        const data = jwt.verify(token[1],  process.env.TOKEN_SECRET)
        const {id} = data


        const user = await User.findOne({
            where: {
                id
            }
        })


        if(!user){
            return res.status(401).json({
                error: 'Usuario invalido'
            })
        }

        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({
            error: ['Token ivalido ou expirado, faca login novamente']
        })
    }
}


const isAdmin = async (req, res, next) => {
    try{
        const {id} = req.user;
        
        //const adminUser = await User.findOne({ id });
        if(req.user.role !== "admin"){
            return res.status(403).json({
                error: ['Acesso negado']
            })
        }else{
            next()
        }

    }catch(e){
        throw new Error(e)
    }
}


module.exports = {isAuthenticated, isAdmin}