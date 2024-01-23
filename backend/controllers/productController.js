import Product from "../models/product.js";

// Getting all Product ==> /api/v1/products
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


// get single product details ==> /api/v1/products/:id
export const getProductDetails = async (req, res) =>{

    const product = await Product.findById(req?.params?.id);

    if(!product){
        return res.status(404).json({
            message: "Product Not Found"
        });
    }
    res.status(200).json({
        message: "Prodcut Fetched with ID Successfully",
        product,
    })
};

