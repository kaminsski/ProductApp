const Cart = require("../models/Cart");

const getCartByUser = async(req,res) =>{
    try {
        const id = req.params.id

        const response = await Cart.find({user:id})
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const postCart = async(req,res) =>{
    try {
        const {user} = req.body
        const response = await Cart.create(
           {user,
            orders:[]}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const deleteCart = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Cart.findByIdAndDelete(id)
        res.json(response)

    } catch (error) {
        console.log(error);
    }
}

const updateCart = async(req,res) =>{
    try {
        const id = req.params.id
        const updateData = req.body
        const response = await Cart.findByIdAndUpdate(
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
    updateCart, deleteCart, getCartByUser, postCart
}