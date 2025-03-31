const asyncHandler = require("express-async-handler");
const session = require("express-session");
const { generateToken } = require('../config/jwtToken');
const User = require("../models/User");
const AppError = require("../models/AppError");


//create user
const createUser = asyncHandler(async(req, res) => {
    try {
        const { nif, email } = req.body

        const user = await User.findOne({where : {nif, email}})
        
        if(user){
            throw new AppError("Nif or Email Already registed" , 400)
        }
        const newUser = await User.create(req.body)
        return res.json(newUser)
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//login user
const login = asyncHandler(async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: { email: email }})
        
        if(!user){
            throw new AppError("Credencias Invalidos", 400)
        }

        if(user.email !== email || user.password !== password){
            throw new AppError("Credencias Invalidos", 400)
        }

        const token = generateToken(user.id)
        
        return res.status(200).json({
            name : user.name,
            nif: user.nif,
            email: user.email,
            role: user.role,
            token: token
        })

    } catch (error) {
        throw new AppError(error, 400)
    }
})


const updateUser = asyncHandler(async(req, res) => {
    const { id } = req.user

    try {
        const  user = User.findOne({ where: {id}})

        if(!user){
            throw new AppError("User not Found", 404)
        }

        User.create(req.body)

        res.status(200).json({
            message: "Usuario atualizado"
        })
    
    } catch (error) {
        throw new AppError(error, 400)
    }
})

const getUser = asyncHandler(async(req, res) => {
    try {
        return res.json({
            name : req.user.name,
            nif: req.user.nif,
            email: req.user.email,
            role: req.user.role
        })
    } catch (error) {
        throw new   AppError(error, 400)
    }
})


module.exports = {createUser, login, getUser, updateUser}