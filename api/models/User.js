const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        
    },
    balance:{
        type:Number,
        required:true,
        default:100,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    orders: [Object],

}, {timestamps:true})

module.exports = mongoose.model("user", UserSchema)