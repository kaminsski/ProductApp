const Product = require("../models/Product");


const filterProducts = async (req, res) => {
    try {
      const { selectedBrands, selectedColors, selectedCategories } = req.body;
        const filters = {};
        if (selectedBrands.length > 0) filters.brand = { $in: selectedBrands };
        if (selectedColors.length > 0) filters.color = { $in: selectedColors };
        if (selectedCategories.length > 0) filters.category = { $in: selectedCategories };
    
        const filteredProducts = await Product.find(filters);
      res.json(filteredProducts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const searchProduct = async(req,res) => {

    try {
    const searchQuery = req.query.query; 

    const results = await Product.find({     name: { $regex: searchQuery, $options: 'i' }      }).limit(5);

    res.json(results); 
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async(req,res) =>{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        .populate('category')
        .populate('brand')
        .populate('color');

        res.json({
            product
        })
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async(req,res) =>{
    try {
        const response = await Product.find().sort({ price: 1 });
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const getNewProduct = async(req,res) =>{
    try {
        const response = await Product.find().sort({ createdAt: -1 }).limit(5);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}


const getByBrandProduct = async(req,res) =>{
    try {
        const brandId = req.params.id
        const response = await Product.find({ brand: brandId });
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const getByCategoryProduct = async(req,res) =>{
    try {
        const brandId = req.params.id
        const response = await Product.find({ category: brandId });
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const postProduct = async(req,res) =>{
    try {
        const {category,name, description, image, stock, price,gender, color ,brand} = req.body
        const response = await Product.create(
           { category,
            name,
            price,
            image,
            stock,
            description, gender, color ,brand}
        )
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async(req,res) =>{
    try {
        const id = req.params.id
        const response = await Product.findByIdAndDelete(id)
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res) =>{
    try {
        const id = req.params.id
        const updateData = req.body
        const response = await Product.findByIdAndUpdate(
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
    filterProducts,searchProduct,getByCategoryProduct,updateProduct, postProduct, deleteProduct, getProduct, getByBrandProduct, getProductById, getNewProduct
}