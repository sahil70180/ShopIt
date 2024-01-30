import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js"
import assignToken from "../utils/assignToken.js";

// Register User ==> /api/v1/resister
export const registerUser = catchAsyncErrors(async(req, res, next) =>{
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return next(new ErrorHandler("Email Already Exist! Please SignIn.", 401))
    }

    const user = await User.create({
        name,email,password
    });
    const token = user.getJWTToken();

    assignToken(user, 201, res);
});

// login User ==> /api/v1/login
export const login = catchAsyncErrors(async (req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordCompare = await user.comparePassword(password)
    if(!isPasswordCompare){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const token = user.getJWTToken();

    assignToken(user, 200, res);
});

// logout user ==> /api/v1/logout

export const logout = catchAsyncErrors(async (req, res, next) =>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly: true
    })
    return res.status(200).json({
        message: "Logged Out"
    });
})