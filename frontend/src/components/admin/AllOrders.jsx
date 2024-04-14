import React, { useEffect } from 'react'
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../redux/api/orderApi'
import Adminlayout from '../layout/Adminlayout';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"

const AllOrders = () => {

    const {data} = useGetAdminOrdersQuery();
    const [deleteOrder, {error, isLoading, isSuccess}] = useDeleteOrderMutation();

    useEffect(() => {
      if(error){
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        toast.success("Order Deleted");
      }
    },[error, isSuccess])

    const handleDelete = (id) =>{
      deleteOrder(id);
    }

    const setOrders = () => {
        const orders = {
          columns: [
            {
              label: "ID",
              field: "id",
              sort: "asc",
            },
            {
              label: "Payment Status",
              field: "paymentStatus",
              sort: "asc",
            },
            {
              label: "Order Status",
              field: "orderStatus",
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
    
        data?.orders?.forEach((order) => {
          orders.rows.push({
            id: order?._id,
            paymentStatus: order?.paymentInfo?.status.toUpperCase(),
            orderStatus: order?.orderStatus,
            actions: (
              <>
                <Link
                  to={`/admin/orders/${order?._id}`}
                  className="btn btn-outline-primary ms-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <button
                  className="btn btn-outline-danger ms-2"
                  disabled={isLoading}
                  onClick={() => handleDelete(order?._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </>
            ),
          });
        });
        return orders;
      };




  return (
    <Adminlayout>
        <MetaData title={"All Orders"} />
      {data?.orders?.length > 0 ? (
        <>
          <h1 className="my-5">Total Orders : {data?.orders?.length}</h1>
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <h1 className="m-5">No products in the Database</h1>
      )}
      
    </Adminlayout>
  )
}

export default AllOrders
