import Order from "../models/order.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

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
