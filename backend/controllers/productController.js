import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// Getting all Product ==> /api/v1/products
export const getProdcuts = catchAsyncErrors(async (req, res, next) =>{

    const apiFilters = new APIFilters(Product, req.query).search().filters();
    
    let products = await apiFilters.query;
    let Total_Products = products.length; 
    
    
    res.status(200).json({
        Total_Products,
        products,
    });
})

// create new Product (ADMIN ROUTE) ==> /api/v1/admin/create
export const newProduct = catchAsyncErrors(async (req, res) =>{

    const product = await Product.create(req.body);

    res.status(200).json({
        message: "Prodcut Created Succesfully",
        product,
    })
})


// get single product details ==> /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) =>{

    const product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        message: "Prodcut Fetched with ID Successfully",
        product,
    })
})

// update product details ==> api/v1/products/:id
export const updateProduct = catchAsyncErrors( async (req, res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new:true});

    res.status(200).json({
        message: "Product Updated Successfully",
        product,
    })
})

// delete product using id ==> api.v1/products/:id
export const deleteProduct = catchAsyncErrors(async(req, res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Product Deleted Successfully",
    })
})
