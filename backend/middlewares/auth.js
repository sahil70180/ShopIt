import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken"

// chcek if user is authenticated or not 
export const isAuthenticated = catchAsyncErrors(async (req, res, next) =>{
    
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // setting up user 
    req.user = await User.findById(decoded.id);

    next();
});