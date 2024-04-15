import React, { useEffect, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";
import Adminlayout from "../layout/Adminlayout";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllOrders = () => {
  const { data } = useGetAdminOrdersQuery();

  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deleteOrder, { error, isLoading, isSuccess }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Deleted");
    }
  }, [error, isSuccess]);

  const handleDeleteConfirmation = () => {
    if (deleteOrderId) {
      deleteOrder(deleteOrderId);
    }
    setIsConfirmationOpen(false);
    setDeleteOrderId(null);
  };

  const handleDelete = (id) => {
    setDeleteOrderId(id);
    setIsConfirmationOpen(true);
  };

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
        <h1 className="m-5">No Orders in the Database</h1>
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

export default AllOrders;
