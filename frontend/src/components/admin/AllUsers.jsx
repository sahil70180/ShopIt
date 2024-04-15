import React, { useEffect } from "react";
import Adminlayout from "../layout/Adminlayout";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";

const AllUsers = () => {

    const {data, error} = useGetAdminUsersQuery();
    
    useEffect(() => {
        if(error){
            toast.error(error?.data?.message)
        }
    },[error])

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
              className="btn btn-outline-danger ms-2"
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
    </Adminlayout>
  );
};

export default AllUsers;
