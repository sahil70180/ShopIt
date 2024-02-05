import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import assignToken from "../utils/assignToken.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"

// Register User ==> /api/v1/resister
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("Email Already Exist! Please SignIn.", 401));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.getJWTToken();

  assignToken(user, 201, res);
});

// login User ==> /api/v1/login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordCompare = await user.comparePassword(password);
  if (!isPasswordCompare) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();

  assignToken(user, 200, res);
});

// logout user ==> /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    message: "Logged Out",
  });
});

// Forgot Password ==> /api/v1/login
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required", 404));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User Not Found in the database", 401));
  }

  // get resetPassword Token from Model Method getRestPasswordToken();
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // prepare rest URL
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
        email: user.email,
        subject: "SHOPIT Password Recovery",
        message,
    });
    res.status(200).json({
      message: `Email send to : ${user.email} successfully`,
    });
  } 
  catch (error) {
    user.resetPasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});


// Rest Password ==> /api/vi/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) =>{
  //hash the URL Token 
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  // now search the user 
  const user = await User.findOne({
    resetPasswordToken,
    resetpasswordExpire : {$gt : Date.now()}, 
  })
  if(!user){
    return next(new ErrorHandler("Password reset token is Invalid or has been expired"), 400);
  };

  // check both password are same or not 
  if(req.body.password != req.body.confirmPassword){
    return next(new ErrorHandler("Passwords does not Match"), 400);
  };
  // set the passwod 
  user.password = req.body.password;

  // set the token to undefined 
  user.resetPasswordToken = undefined;
  user.resetpasswordExpire = undefined;
  await user.save();

  assignToken(user, 200, res);

})