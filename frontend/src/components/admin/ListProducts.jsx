import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAdminProdcutsQuery,
} from "../../redux/api/productApi";
import Adminlayout from "../layout/Adminlayout";

const ListProducts = () => {
  const { data, error, isLoading } = useGetAdminProdcutsQuery();

  const [deleteproductId, setdeleteProductId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Deleted Successfully");
    }
  }, [error, deleteError, isSuccess]);

  const handleDeleteConfirmation = () => {
    if (deleteproductId) {
      deleteProduct(deleteproductId);
    }
    setIsConfirmationOpen(false);
    setdeleteProductId(null);
  };

  const deleteProductHandler = (id) => {
    setdeleteProductId(id);
    setIsConfirmationOpen(true);
  };

  const setProducts = () => {
    const products = {
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
          label: "Stock",
          field: "stock",
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

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name.substring(0, 22)}...`,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary ms-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteProductHandler(product?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return products;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Adminlayout>
      <MetaData title={"All products"} />
      {data?.products?.length > 0 ? (
        <>
          <h1 className="my-5">Total Products : {data?.products?.length}</h1>
          <MDBDataTable
            data={setProducts()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <h1 className="m-5">No products in the Database</h1>
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

export default ListProducts;
