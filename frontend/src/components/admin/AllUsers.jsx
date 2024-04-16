import React, { useEffect, useState } from "react";
import Adminlayout from "../layout/Adminlayout";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../redux/api/userApi";

const AllUsers = () => {

  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const {data, error} = useGetAdminUsersQuery();

    const [deleteUser,{error : deleteError, isLoading, isSuccess}] = useDeleteUserMutation();
    
    // for getting user 
    useEffect(() => {
        if(error){
            toast.error(error?.data?.message)
        }
    },[error])

    // for delete user 
    useEffect(() => {
      if(deleteError){
        toast.error(deleteError?.data?.message)
      }
      if(isSuccess){
        toast.success("Deleted Successfully")
      }
    },[deleteError, isSuccess])

    const handleDeleteConfirmation = async () => {
      if (deleteUserId) {
        await deleteUser(deleteUserId);
      }
      setIsConfirmationOpen(false);
      setDeleteUserId(null);
    };

    const deleteUserHander = (id) => {
      setDeleteUserId(id);
      setIsConfirmationOpen(true);
    };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) => {
      users?.rows?.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role : user?.role,
        actions: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary ms-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2" disabled={isLoading} onClick={() => deleteUserHander(user?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return users;
  };

  return (
    <Adminlayout>
      <MetaData title={"All Users"} />
      {data?.users?.length > 0 ? (
        <>
          <h1 className="my-5">Total Users : {data?.users?.length}</h1>
          <MDBDataTable
            data={setUsers()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <h1 className="m-5">No Users in the Database</h1>
      )} 
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{
          display: isConfirmationOpen ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button
                type="button"
                className="close"
                onClick={() => setIsConfirmationOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Are you sure you want to delete?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsConfirmationOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirmation}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>      
    </Adminlayout>
  );
};

export default AllUsers;
