const Brand = require("../models/Brand");


const getBrandById = async (req,res) =>{
    try {
        const id = req.params.id
        const product = await Brand.findById(id)

        res.json({
            product
        })
    } catch (error) {
        console.log(error);
    }
}

const getBrand = async(req,res) =>{
    try {
        const response = await Brand.find()
        res.json(response)   
     } catch (error) {
        console.log(error);
    }
}

const postBrand = async(req,res) =>{
    try {
        const {name} = req.body
        let image = "";

        if (req.file) {
            image = req.file.path;
          }
        const response = await Brand.create(
           {name, image}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const deleteBrand = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Brand.findByIdAndDelete(id)
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const updateBrand = async(req,res) =>{
    try {
        const id = req.params.id
        const {name} = req.body
        let image = "";

        if (req.file) {
            image = req.file.path;
          }
        const response = await Brand.findByIdAndUpdate(
            id,
            { name: name, image: image },

            {new:true}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}
module.exports={
    getBrandById,updateBrand, deleteBrand, getBrand, postBrand
}