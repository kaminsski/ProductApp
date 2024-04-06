const Fav = require("../models/Fav");

const getFavByUser = async(req,res) =>{
    try {
        const user = req.query.user;

        const productId = req.params.id
       const response = await Fav.find({user:user,product:productId});
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const getFavUser = async(req,res) =>{
     try {
        const user = req.params.id;

       const response = await Fav.find({user:user}).populate('product');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const postFav = async(req,res) =>{
    try {
        const {user} = req.body
        const product = req.params.id
         const response = await Fav.create(
           {user,product
            }
        )
        res.json(response) 
    } catch (error) {
        console.log(error);
    }
}

const deleteFav = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Fav.findByIdAndDelete(id)
        res.json(response)

    } catch (error) {
        console.log(error);
    }
}

const updateFav = async(req,res) =>{
    try {
        const id = req.params.id
        const updateData = req.body
        const response = await Fav.findByIdAndUpdate(
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
    updateFav, deleteFav, getFavByUser, postFav,getFavUser
}