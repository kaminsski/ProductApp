import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductByCategoryAction } from "../redux/actions/product";

export default function CategoryCards({ categories }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProductsFunc = (brandId) => {
    dispatch(getProductByCategoryAction(brandId));
    navigate("/productList");
  };
  return (
    <div className="flex flex-wrap mt-10 justify-center">
      {categories.map((category, id) => (
        <div
          onClick={() => selectedProductsFunc(category._id)}
          key={id}
          className="categoryContainer w-1/2 sm:w-1/2 md:w-1/3 my-5"
        >
          <div className="categoryWrapper p-2">
            <img
              className="object-cover rounded-xl w-full h-48 md:h-96"
              src={`http://localhost:5005/${category && category.image}`}
              alt={`${category.name}`}
            />
            <p className=" tracking-widest font-link mt-4 uppercase font-bold text-lg sm:text-2xl text-center">
              {category.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
