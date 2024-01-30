import mongoose from "mongoose";
import bcrypt from "bcryptjs"

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

// encrypt password before saving into database 
userSchema.pre("save", async function (next) {

    // if password is not modified then no need to do anything 
    if(!this.isModified("password")){
        next();
    }

    // else encrypt the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();

});

export default mongoose.model("User", userSchema);
