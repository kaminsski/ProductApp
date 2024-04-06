import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getNewProductsAction,
  getProductsAction,
} from "../redux/actions/product";

export default function SpecialLinks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortByPrice = () => {
    dispatch(getProductsAction());
    navigate("/productList");
  };
  const sortByNew = () => {
    dispatch(getNewProductsAction());
    navigate("/productList");
  };
  return (
    <div className="flex sm:gap-10 gap-2 items-center mt-5 mx-2 ">
      <div className=" h-16 flex items-center w-1/3 justify-center text-center bg-indigo-500 p-3 font-bold text-white rounded-lg">
        Best Sellers
      </div>
      <div
        onClick={() => sortByPrice()}
        className="h-16 flex justify-center items-center  w-1/3 text-center bg-orange-500 p-3 font-bold text-white rounded-lg"
      >
        Cheapest Products
      </div>
      <div
        onClick={() => sortByNew()}
        className="h-16 flex items-center justify-center w-1/3 text-center bg-black p-3 font-bold text-white rounded-lg"
      >
        Newly Added
      </div>
    </div>
  );
}
