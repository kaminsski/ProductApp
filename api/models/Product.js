const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"category"
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"brand"
    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"color"
    },
    gender:{
        type: String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
}, {timestamps:true})
ProductSchema.index({ name: 'text', description: 'text' })


module.exports = mongoose.model("product", ProductSchema)