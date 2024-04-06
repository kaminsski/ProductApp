const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    orders: [Object],


}, {timestamps:true})
CartSchema.index()


module.exports = mongoose.model("cart", CartSchema)