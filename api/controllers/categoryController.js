const Category = require("../models/Category");
const fs = require('fs');
const path = require('path');

const getCategoryById = async(req,res) =>{
    try {
        const id = req.params.id
        const product = await Category.findById(id)


        res.json({
            product
        })
    } catch (error) {
        console.log(error);
    }
}

const getCategory = async(req,res) =>{
    try {
        const response = await Category.find()
        res.json(response)   
     } catch (error) {
        console.log(error);
    }
}

const postCategory = async(req,res) =>{
    try {
        const {name} = req.body
        let image = "";

        if (req.file) {
            image = req.file.path;
          }
        const response = await Category.create(
           {name, image}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory = async(req,res) =>{
    try {
        const id = req.params.id

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Kategori resminin dosya yolu
        const imagePath = category.image;


        const response = await Category.findByIdAndDelete(id)
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const updateCategory = async(req,res) =>{
    try {
        const id = req.params.id
        const {name} = req.body
        let image = "";

        if (req.file) {
            image = req.file.path;
          }
        const response = await Category.findByIdAndUpdate(
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
    getCategoryById,updateCategory, deleteCategory, getCategory, postCategory
}