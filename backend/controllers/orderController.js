import Order from "../models/order.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../utils/errorHandler.js"
import Product from "../models/product.js"

//create new order ==> /api/v/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;
  // console.log("here");

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user : req.user._id,
  })
  // console.log(order);

  res.status(200).json({
    message :"create Successfully",
    order,
  })
});

// get order details ==> /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) =>{
  const order = await Order.findById(req.params.id);
  if(!order){
    return next(new Errorhandler(`Not Order Found with this id : ${req.params.id}`, 404))
  }

  res.status(200).json({
    message :"Order Details Found",
    order,
  })
})

//get all orders of current/loggedIN user ==> /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) =>{
  const order = await Order.find({ user : req.user._id}).populate("user", "name email");
  if(!order){
    return next(new Errorhandler("No Orders Found", 404));
  }

  // if you recieve empyt array it means you did'nt order anything
  if(order.length == 0){
    return next(new Errorhandler("You have no orders till now", 404))
  }

  res.status(200).json({
    message : "Your Order Details Fetched Successfully",
    order,
  })
})

// get all order ADMIN  ==> /api/v1/orders
export const allOrders = catchAsyncErrors(async (req, res, next) =>{
  const orders = await Order.find();
  if(!orders){
    return next(new Errorhandler("No Orders found in the database", 404));
  }

  res.status(200).json({
    message :"ALl orders",
    orders,
  })
})

// update order - ADMIN ==> /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) =>{
  const order = await Order.findById(req.params.id);
  if(!order){
    return next(new Errorhandler("No Order found with this id", 404));
  }

  if(order?.orderStatus == "Delivered"){
    return next(new Errorhandler("You have already Recieved this order", 400));
  }
  if(order?.orderStatus == "Shipped"){
    return next(new Errorhandler("Order Already Shipped.",400 ));
  }

  // updating product stock for each orderitem and save the product again
  order?.orderItems?.forEach(async (item)  =>{
    const product = await Product.findById(item?.product?.toString());
    product.stock = product.stock - item.quantity;
    await product.save({validateBeforeSave : false });
  })

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  
  await order.save();


  res.status(200).json({
    message : "orderStatus and Stock update successfully",
    success : true,
  })
})

// delete order  ==> /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) =>{
  const order = await Order.findById(req.params.id);
  if(!order){
    return next(new Errorhandler("No Order found with this id" , 404));
  }
  await order.deleteOne();

  res.status(200).json({
    message :"Deleted Succesfully",
    success : true,
  })

})