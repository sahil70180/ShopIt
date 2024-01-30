import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [50, "Your name cannot exceed 50 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken : String,
    resetpasswordExpire : Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
