import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";
import DefaultImage from "../../assets/images/default_product.png"

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setactiveImg] = useState("");


  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;

  const {isAuthenticated} = useSelector((state) => state.auth);


  useEffect(() => {
    setactiveImg(
      product?.images[0]
        ? product?.images[0].url
        : DefaultImage
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if(count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    
    if(count.valueAsNumber <=1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  const setItemToCart = async () => {
    const cartItem = {
      product  : product?._id,
      name : product?.name,
      price : product?.price,
      image : product?.images[0]?.url,
      stock : product?.stock,
      quantity
    };
    await dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart Successfully")
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
    <MetaData title={`${product.name}`} />
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImg}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <Link role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImg ? "border-warning" : ""
                  }`}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => setactiveImg(img?.url)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product {product?._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="24px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            {product?.numOfReviews} Reviews
          </span>
        </div>
        <hr />

        <p id="product_price">Rs.{product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readonly
            />
          <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock <= 0}
          onClick={setItemToCart}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
            >
            {product?.stock > 0 ? "In Stock" : "Out Of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        {isAuthenticated ? (<NewReview productId={product?._id} />) :(
        <div className={"alert alert-danger my-5"} type="alert">
          Login to post your review
        </div>
        ) }
      </div>
    </div>
    {product?.reviews?.length > 0 && ( <ListReviews reviews={product?.reviews}/>) }
    </>
  );
};

export default ProductDetails;
