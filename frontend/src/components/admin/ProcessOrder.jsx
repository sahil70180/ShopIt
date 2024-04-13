import React, { useEffect, useState } from 'react'
import Adminlayout from '../layout/Adminlayout'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi'
import toast from "react-hot-toast"

const ProcessOrder = () => {
    const params = useParams();
    const [status , setStatus] = useState("");

    const {data} = useOrderDetailsQuery(params?.id);
    const order = data?.order;

    const [updateOrder, {isLoading, error, isSuccess}] = useUpdateOrderMutation();

    useEffect(() => {
      if(order?.orderStatus){
        setStatus(order?.orderStatus)
      }
    },[order])
    useEffect(() => {
      if(error){
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        toast.success("Order Updated")
      }
    },[error, isSuccess])

    const updateOrderhandler = async (id) => {
      const data = {status}
      await updateOrder({id, body : data});
    }
  return (
    <Adminlayout>
        <MetaData title={"Process Order"}/>
        <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-8 order-details">
        <h3 className="mt-5 mb-4">Order Details</h3>

        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Order Status</th>
              <td className={order?.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                <b>{order?.orderStatus}</b>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{order?.user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{order?.shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{order?.shippingInfo?.address}</td>
            </tr>
            <tr>
              <th scope="row">Zip Code</th>
              <td>{order?.shippingInfo?.zipCode}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className={order?.paymentInfo?.status.toUpperCase() === "PAID" ? "greenColor" : "redColor"}>
              <b>{order?.paymentInfo?.status.toUpperCase()}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{order?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>{order?.paymentMethod === "COD" ? "Nill/-" : order?.paymentInfo?.id}</td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>Rs. {order?.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
          {order?.orderItems?.map((item) => (
        <div className="cart-item my-1">

            <div className="row my-5">
            <div className="col-4 col-lg-2">
              <img
                src={item?.image}
                alt={item?.name}
                height="45"
                width="65"
              />
            </div>
            <div className="col-5 col-lg-5">
              <Link to={`/product/${item?.product}`}>{item?.name}</Link>
            </div>
            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>Rs. {item?.price}</p>
            </div>
            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>Quantity {item?.quantity}</p>
            </div>
          </div>
        </div>
      ))}
        <hr />
      </div>

      <div className="col-12 col-lg-3 mt-5">
        <h4 className="my-4">Status</h4>

        <div className="mb-3">
          <select className="form-select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" disabled={isLoading} onClick={() => updateOrderhandler(order?._id)}>Update Status</button>

        <h4 className="mt-5 mb-3">Order Invoice</h4>
        <Link to={`/invoice/orders/${order?._id}`} className="btn btn-success w-100">
          <i className="fa fa-print"></i> Generate Invoice
        </Link>
      </div>
    </div>
      
    </Adminlayout>
  )
}

export default ProcessOrder
