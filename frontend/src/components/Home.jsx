import React from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";

const Home = () => {
  const { data } = useGetProductsQuery();
  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-12">
            <h1 id="products_heading" className="text-secondary">
              Latest Products
            </h1>
            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product) => (
                  <ProductItem product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
