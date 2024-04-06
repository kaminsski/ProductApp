const Comment = require("../models/Comment");
const User = require("../models/User");


const getCommentByProduct = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Comment.find({ product: id }).populate('user'); 
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const getComment = async(req,res) =>{
    try {
        const response = await Comment.find()
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const postComment = async(req,res) =>{
    try {
        const {userId, comment, productId} = req.body
        const response = await Comment.create(
           {user: userId,
            comment,
        product:productId}
        )
        const userDetail = await User.findById(userId)
        const configResponse = { ...response._doc, user: userDetail };

        res.json(configResponse)    } 
        catch (error) {
        console.log(error);
    }
}

const deleteComment = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Comment.findByIdAndDelete(id)
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const updateComment = async(req,res) =>{
    try {
        const id = req.params.id
        const updateData = req.body
        const response = await Comment.findByIdAndUpdate(
            id,
            updateData,
            {new:true}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}
module.exports={
deleteComment, updateComment, postComment, getComment,getCommentByProduct
}