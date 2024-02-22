import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/authapi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Register = () => {

    // setting up the sates 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // using regisetr Hook that we made in Redux
    const [register, {isLoading, error}] = useRegisterMutation();
    
    // handle for submit 
    const handleFormSubmit = (event) =>{
        event.preventDefault();

        // preparing Register data 
        const registerData = {
            name,
            email,
            password,
        }
        register(registerData);
    }

    useEffect(() =>{
        if(error){
            toast.error(error?.data?.message);
        }
    },[error])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleFormSubmit}
          enctype="multipart/form-data"
        >
          <h2 className="mb-4">Register</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2">
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="my-3">
            <Link to="/login" className="float-end">Already have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
