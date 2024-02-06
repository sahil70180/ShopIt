import Order from "../models/order.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../utils/errorHandler.js"

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