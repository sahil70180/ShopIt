import React, { useEffect, useState } from "react";
import Adminlayout from "../layout/Adminlayout";
import { MDBDataTable } from "mdbreact";
import { useLazyGetProductReviewsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";

const ProductReviews = () => {
  const [productId, setproductId] = useState("");

  const [getProductReviews, { data, error }] = useLazyGetProductReviewsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await getProductReviews(productId);
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
            <button className="btn btn-outline-danger ms-2">
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
    </Adminlayout>
  );
};

export default ProductReviews;
