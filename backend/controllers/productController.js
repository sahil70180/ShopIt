import Product from "../models/product.js";

// Getting all Product ==> /api/v1/getproducts
export const getProdcuts = async (req, res) =>{

    const products = await Product.find();

    if(!products){
        res.status(400).json({
            message: "No Product Found"
        })
    }
    res.status(200).json({
        message : "All Products Fetched Successully",
        products,
    });
};

// create new Product (ADMIN ROUTE) ==> /api/v1/admin/create
export const newProduct = async (req, res) =>{

    const product = await Product.create(req.body);

    res.status(200).json({
        message: "Prodcut Created Succesfully",
        product,
    })
};


