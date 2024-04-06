import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAction } from "../redux/actions/cart";
import { FaHeart } from "react-icons/fa6";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [fav, setFav] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://product-app-api.vercel.app//product/productDetail/${productId}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const user = auth && auth._id;
        const isExist = await axios.get(
          `https://product-app-api.vercel.app//fav/${productId}`,
          { params: { user } }
        );
        if (isExist.data.length > 0) {
          setFav(true);
        } else {
          setFav(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFav();
  }, [auth, productId]);

  const handleSubmit = async () => {
    const editProduct = {
      ...product,
      brand: product.brand._id,
      category: product.category._id,
      color: product.category._id,
      quantity: 1,
    };

    try {
      const userCartId = await axios.get(
        `https://product-app-api.vercel.app//cart/${auth._id}`
      );
      const existingOrders = userCartId.data[0].orders;

      let productExists = false;
      const updatedOrders = existingOrders.map((order) => {
        if (order._id === editProduct._id) {
          productExists = true;
          order.quantity += 1;
        }
        return order;
      });

      if (!productExists) {
        updatedOrders.push(editProduct);
      }

      const updatedCart = {
        orders: updatedOrders,
      };
      dispatch(updateCartAction(userCartId.data[0]._id, updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const favoriteFunc = async () => {
    try {
      const user = auth._id;
      const isExist = await axios.get(
        `https://product-app-api.vercel.app//fav/${productId}`,
        { params: { user } }
      );
      if (isExist.data.length === 0) {
        const response = await axios.post(
          `https://product-app-api.vercel.app//fav/${productId}`,
          { user }
        );
        setFav(true);
      } else {
        const response = await axios.delete(
          `https://product-app-api.vercel.app//fav/${isExist.data[0]._id}`
        );
        setFav(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row mb-10">
        <div className="p-5 md:p-0 pictureContainer w-full md:w-1/2  relative">
          {auth && (
            <FaHeart
              onClick={favoriteFunc}
              size={50}
              className={
                fav
                  ? "absolute right-0 sm:right-[-20px] top-0 sm:top-[-20px] text-4xl text-red-700 hover:text-red-300"
                  : "absolute right-0 sm:right-[-20px] top-0 sm:top-[-20px] text-4xl text-red-300 hover:text-red-700"
              }
            />
          )}

          <img
            className="h-[400px] md:h-[800px] w-full object-cover"
            src={product && product.image}
            alt=""
          />
        </div>
        {product && (
          <div className="p-5 w-full sm:w-1/2">
            <h3 className="text-2xl uppercase font-semibold">
              {" "}
              {product.name}{" "}
            </h3>
            <h3 className=""> {product.description} </h3>
            <div>
              <p className="text-lg font-semibold inline"> Category: </p>
              <a className=" text-blue-400 ">
                {" "}
                {product.category && product.category.name}{" "}
              </a>
            </div>
            <div>
              <p className="inline text-lg font-semibold "> Brand: </p>
              <a className=" text-blue-400 "> {product.brand.name} </a>
            </div>
            <div>
              <p className="inline text-lg font-semibold "> Color: </p>
              <a className=" text-blue-400 "> {product.color.name} </a>
            </div>
            <div>
              <p className="inline text-lg font-semibold "> Gender: </p>
              <a className=" text-blue-400 "> {product.gender} </a>
            </div>
            <p className="inline text-lg font-semibold "> Price: </p>
            <h3 className=" inline-block p-5 text-orange-500 text-lg font-semibold ">
              {" "}
              {product.price} tl{" "}
            </h3>
            <h3 className="text-sm "> Last {product.stock} items </h3>
            {auth && (
              <button
                onClick={handleSubmit}
                className=" bg-orange-400 p-4 rounded-xl text-white font-bold cursor-pointer my-2"
              >
                {" "}
                Add to Cart{" "}
              </button>
            )}
          </div>
        )}
      </div>
      {auth && <Comment />}
    </>
  );
}

export default ProductDetail;
