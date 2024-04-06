const Color = require("../models/Color");

const getColor = async(req,res) =>{
    try {
        const response = await Color.find()
        res.json(response)   
     } catch (error) {
        console.log(error);
    }
}

const postColor = async(req,res) =>{
    try {
        const {name} = req.body
        const response = await Color.create(
           {name}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}


module.exports={
   getColor, postColor
}