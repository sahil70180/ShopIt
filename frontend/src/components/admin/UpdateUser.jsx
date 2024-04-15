import React, { useEffect, useState } from 'react'
import Adminlayout from '../layout/Adminlayout'
import MetaData from '../layout/MetaData'
import { useGetUserDetailsQuery, useUpdateUserDetailsMutation } from '../../redux/api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const {data} = useGetUserDetailsQuery(params?.id);
    const user = data?.user;

    const [updateUserDetails, {isLoading, isSuccess, error}] = useUpdateUserDetailsMutation();

    useEffect(() => {
        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success("Details Updated")
            navigate("/admin/users");
        }
    },[error, isSuccess, navigate])

    useEffect(() => {
        if(user){
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role)
        }
    },[user])

    if(isLoading){
        return <Loader/>
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            role
        }
        await updateUserDetails({id : params?.id, body : userData});
    }
    
  return (
    <Adminlayout>
        <MetaData title={"Update User"}/>
        <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="name"
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
            <label htmlFor="role_field" className="form-label">Role</label>
            <select id="role_field" className="form-select" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button type="submit" className="btn update-btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Updating..." :"Update"}
          </button>
        </form>
      </div>
    </div>
      
    </Adminlayout>
  )
}

export default UpdateUser
