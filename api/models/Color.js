const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
   
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
        
  
}, {timestamps:true})

module.exports = mongoose.model("color", ColorSchema)