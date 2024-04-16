import React, { useEffect, useState } from "react";
import Adminlayout from "../layout/Adminlayout";
import { MDBDataTable } from "mdbreact";
import {
  useDeleteProductReviewsMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productApi";
import toast from "react-hot-toast";

const ProductReviews = () => {
  const [productId, setproductId] = useState("");
  const [id, setid] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [getProductReviews, { data, error }] = useLazyGetProductReviewsQuery();
  const [
    deleteProductReviews,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteProductReviewsMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Review Deleted");
    }
  }, [deleteError, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await getProductReviews(productId);
  };

  const handleDeleteReview = async (id) => {
    setid(id);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    if (id) {
      await deleteProductReviews({ productId, id });
    }
    setIsConfirmationOpen(false);
    setid(null);
  };

  const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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

    data?.reviews?.forEach((review) => {
      reviews?.rows?.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: (
          <>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => handleDeleteReview(review?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return reviews;
  };

  return (
    <Adminlayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setproductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {data?.reviews?.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <p className="mt-5 text-center">No Reviews</p>
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

export default ProductReviews;
