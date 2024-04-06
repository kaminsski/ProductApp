import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartAction,
  loadCartAction,
  updateCartAction,
} from "../redux/actions/cart";

function Cart() {
  const { auth } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      dispatch(getCartAction(auth && auth._id));
    };

    getCart();
  }, [subtotal]);

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart[0].orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      );
      setSubtotal(total);
    }
  }, [cart]);

  const increaseQuantitiy = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/product/productDetail/${id}`
      );
      const editProduct = response.data.product;

      try {
        const userCartId = await axios.get(
          `http://localhost:5005/cart/${auth._id}`
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
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const userCartId = await axios.get(
        `http://localhost:5005/cart/${auth._id}`
      );

      const existingOrders = userCartId.data[0].orders;

      const updatedOrders = existingOrders.map((order) => {
        if (order._id === id && order.quantity > 1) {
          order.quantity -= 1;
        }
        return order;
      });

      const updatedCart = {
        orders: updatedOrders,
      };

      dispatch(updateCartAction(userCartId.data[0]._id, updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const authInfo = JSON.parse(localStorage.getItem("auth"))
  if (authInfo === null) {
    return(window.location.href="/")
  }
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
      <div className="mt-8">
        {cart[0].orders.length === 0 && <div className=" bg-orange-300  font-bold p-4">Your cart is currently empty</div>}
        {cart.length > 0
          ? cart[0].orders.map((order, id) => (
              <div
                key={id}
                className="flex flex-col md:flex-row border-b border-gray-400 py-4"
              >
                <div className="flex-shrink-0">
                  <img
                    src={order.image}
                    alt="Product image"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold"> {order.name} </h2>
                  <p className="mt-2 text-gray-600"> {order.description} </p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 rounded-l-lg px-2 py-1"
                        onClick={() => decreaseQuantity(order._id)}
                      >
                        -
                      </button>
                      <span className="mx-2 text-gray-600">
                        {" "}
                        {order.quantity}{" "}
                      </span>
                      <button
                        onClick={() => increaseQuantitiy(order._id)}
                        className="bg-gray-200 rounded-r-lg px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto font-bold">
                      {" "}
                      {order.price * order.quantity} ₺
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="flex justify-end items-center mt-8">
        <span className="text-gray-600 mr-4">Balance:</span>
        <span className="text-xl font-bold me-4">
          {" "}
          {auth && auth.balance} ₺{" "}
        </span>
        <span className="text-gray-600 mr-4">Subtotal:</span>
        <span className="text-xl font-bold"> {subtotal} ₺</span>
      </div>
    </div>
  );
}

export default Cart;
