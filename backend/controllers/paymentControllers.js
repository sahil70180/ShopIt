import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe"
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


// console.log(process.env.STRIPE_SECRET_KEY)
//create strip chcekout session
export const stripeCheckoutSession = catchAsyncErrors(async (req, res, next) => {

    const body = req.body;
    const line_items = body?.orderitems?.map((item) => {
        return {
            price_data : {
                currency : "INR",
                product_data :{
                    name : item?.name,
                    images : [item?.image],
                    metadata : {productid : item?.product},
                },
                unit_amount : Math.round(item?.price *100)
            },
            tax_rates : ["txr_1Ot5sgSBsiaztdG1hz8lOy6C"],
            quantity : item?.quantity,
        };
    });
    const shippingInfo = body?.shippingInfo;

    const shipping_rate = body.itemsPrice > 500 ? "shr_1Ot5j1SBsiaztdG1Wsi7XFvC" : "shr_1Ot5klSBsiaztdG10Pyaf6F8";

    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        success_url : `${process.env.FRONTEND_URL}/me/orders`,
        cancel_url : `${process.env.FRONTEND_URL}`,
        customer_email : req?.user?.email,
        client_reference_id : req?.user?._id?.toString(),
        mode : "payment",
        metadata : {...shippingInfo, itemsPrice : body?.itemsPrice},
        shipping_options : [
            {
                shipping_rate,
            }
        ],
        line_items,
    });

    res.status(200).json({
        url : session.url,
    })
});