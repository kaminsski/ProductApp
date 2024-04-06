const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator');

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d"})
}

const register = async(req,res) =>{
    try {
        const {username, password, email, role} = req.body
        
        if(!username || !password || !email){
            return res.json({message:"Please do not leave the registration form blank!"})
        }
        if(!validator.isLength(username,{min:5})){
            return res.status(400).json({ message: 'Username must be at least 5 characters long' });

        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
          }
        if (!validator.isLength(password, { min: 6 })) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }  
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({message:"Please use different username "})

        }

        const hashed = await bcrypt.hash(password,10)
        const response = await User.create({
            username,
            password:hashed,
            email,
            role
         
        })
        if(response){
            res.json({
                _id:response._id,
                username,
                email,
                token:createToken(response._id),
                role,
                balance:response.balance


                
            })     
        }
       

    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res) =>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({msg:"Please do not leave the login form blank!"})
        }
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({msg:"User not found"})

        }
        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            return res.status(400).json({msg:"Password did not match"})
        }
        if(user && compare){
            res.json({
                _id:user.id,
                username:user.username,
                email:user.email,
                role:user.role,
                token: createToken(user._id),
                balance:user.balance
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async(req,res) =>{
    try {
        const response = await User.find()
        if(response){
            res.json({
                user:response
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getUser = async(req,res) =>{
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(req,res) =>{
    try {
        const id = req.params.id
        const updateData = req.body

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {new:true}
        )
        if (!updatedUser) {
            return res.json({ error: 'User not found' });
        }
        res.json(updatedUser)
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getUser,getUsers, register,login, updateUser
}