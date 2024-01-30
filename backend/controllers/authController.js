import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";


export const registerUser = catchAsyncErrors(async(req, res) =>{
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(404).json({
            message: "Email Already Exist ! Please Sign In"
        })
    }

    const user = await User.create({
        name,email,password
    });

    return res.status(201).json({
        message: "User Register Successfully",
        success : true,
        user,
    })
});