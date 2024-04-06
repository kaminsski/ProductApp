const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"product"
    },
    comment:{
        type:String,
        required:true,
        trim:true,
        
    }
}, {timestamps:true})

module.exports = mongoose.model("comment", CommentSchema)