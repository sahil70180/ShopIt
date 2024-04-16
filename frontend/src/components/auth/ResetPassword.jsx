import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();

    let [searchParams] = useSearchParams();

    const mail = searchParams.get("email");

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();

    useEffect(() =>{
        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success("Password Reset Successfully");
            navigate("/login")
        }
    },[error, isSuccess, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();

        if(!email || !otp || !password){
            return toast.error("All fields are required")
        }
        if(otp.length < 6){
            return toast.error("OTP should be of 6 characters long")
        }
        const userData = {
            email,
            OTP : otp,
            newPassword : password
        }
        await resetPassword(userData);
    }


    useEffect(() => {
        if(!mail){
            navigate("/password/forgot")
        }
        if(mail === ""){
            navigate("/password/forgot")
        }
        setEmail(mail);
    },[navigate, setEmail, mail])

  return (
    <div>
        <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          method="post"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Reset Password</h2>
          <div className="mt-3">
            <label for="email_field" className="form-label">Your Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              disabled={true}
            />
          </div>
          <div className="mt-3">
            <label for="email_field" className="form-label">Enter OTP</label>
            <input
              type="text"
              id="email_field"
              className="form-control"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span style={{color : "#623a20", fontSize : "12px"}}>OTP is valid only for 30 minutes</span>
          </div>
          <div className="mt-3">
            <label for="email_field" className="form-label">Set Password</label>
            <input
              type="password"
              className="form-control"
              name="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
      
    </div>
  )
}

export default ResetPassword
