import React from "react";
import { useSelector } from "react-redux";
import ProductCart from "./ProductCart";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

  const goProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex gap-2 justify-center mt-3 flex-wrap">
      {products && products.length === 0 
      
      ? <div className=" bg-white p-3 mx-4 flex items-center flex-col">
        <p className=" font-semibold text-justify">The product you were looking for was not found. Please make another search</p>
        <img className="w-[100px] mt-10" src="eyes.gif" alt="" />

      </div> 
      
      : null}
      {products &&
        products.map((product, id) => (
          <div
            className="flex items-stretch"
            key={id}
            onClick={() => goProductDetail(product._id)}
          >
            <ProductCart product={product}></ProductCart>
          </div>
        ))}
    </div>
  );
}
