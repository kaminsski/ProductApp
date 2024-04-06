const mongoose = require('mongoose');

const FavSchema = mongoose.Schema({
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


}, {timestamps:true})


module.exports = mongoose.model("fav", FavSchema)