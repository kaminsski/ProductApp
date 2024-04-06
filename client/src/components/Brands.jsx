import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductByBrandAction } from "../redux/actions/product";

export default function Brands({ brands }) {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProductsFunc = (brandId) => {
    dispatch(getProductByBrandAction(brandId));
    navigate("/productList");
  };

  return (
    <div className="flex gap-5 overflow-auto mt-4 mx-4">
      {brands.map((item, id) => (
        <div
          onClick={() => selectedProductsFunc(item._id)}
          key={id}
          className="brandContainer gap-2 shrink-0 flex items-center"
        >
          <img
            className="block h-[100px] w-[100px] object-cover rounded-full "
            src={`https://product-app-api.vercel.app/${item && item.image}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
