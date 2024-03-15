import React, { useEffect } from "react";
import { useMyOdersQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const { data, error, isLoading } = useMyOdersQuery();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "status",
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

    data?.order?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `Rs. ${order?.totalAmount}`,
        status: order?.paymentInfo?.status.toUpperCase(),
        orderStatus: order?.orderStatus.toUpperCase(),
        actions: (
          <>
            <Link
              to={`/me/orders/${order?._id}`}
              className="btn btn-primary ms-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/invoice/orders/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      });
    });
    return orders;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <MetaData title={"Your Orders"} />
      {data?.order?.length > 0 ? (
        <>
          <h1 className="my-5">Total Orders : {data?.order?.length}</h1>
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <h1 className="m-5">Your have No orders</h1>
      )}
    </div>
  );
};

export default MyOrder;
