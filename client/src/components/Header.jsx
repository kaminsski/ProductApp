import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loadDataAction, logoutAction } from "../redux/actions/auth";

import { FaBrain } from "react-icons/fa6";
import Search from "./Search";
import { getCartAction, loadCartAction } from "../redux/actions/cart";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.auth);
  useEffect(() => {
    dispatch(loadDataAction());
    dispatch(loadCartAction());
  }, []);

  const getRole = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    const role = user ? user.role : null;
    return role;
  };
  const userRole = getRole();

  const authSelectLogin = () => {
    setMenu(!menu);
    dispatch({ type: "FORM", payload: { authForm: false } });
  };
  const authSelectRegister = () => {
    setMenu(!menu);
    dispatch({ type: "FORM", payload: { authForm: true } });
  };

  const LogOutFunc = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    const cartFunc = () => {
      const user = JSON.parse(localStorage.getItem("auth"));
      if (user) {
        dispatch(getCartAction(user && user._id));
      }
    };

    cartFunc();
  }, [dispatch]);

  return (
    <>
      <nav className="sm:flex block justify-between bg-white items-center sm:h-32 h-48">
        <div className="leftNavigation flex gap-10 sm:ml-0 ml-2">
          <div className="logoContainer">
            <Link to="/" className="block w-[300px]">
              <img src="/smart.jpeg" alt="" />
            </Link>
          </div>
        </div>

        <div className="searchBar relative lg:w-[600px] md:w-[300px]  sm:w-full px-2 sm:p-0 mt-3 sm:mt-0 me-4">
          <Search></Search>
        </div>
        <div className=" linksContainer flex gap-5 items-center justify-center mt-3 me-4">
          <div className="login flex items-center gap-1 relative hover:text-orange-400 transition">
            <div className="toogle flex gap-1" onClick={() => setMenu(!menu)}>
              <FaUserAlt size={20} />
              {}
              <span
                onClick={auth ? LogOutFunc : null}
                className="text-gray-700 text-md "
              >
                {" "}
                {auth ? "Logout" : "Login"}{" "}
              </span>
            </div>

            {auth ? null : (
              <div
                className={`absolute bg-gray-300 p-3 -bottom-24 -left-3 rounded-xl z-10 ${
                  menu ? "block" : "hidden"
                }`}
              >
                <Link
                  onClick={authSelectLogin}
                  to="/auth"
                  className="block font-bold bg-orange-400 text-center p-1 rounded-lg text-white"
                >
                  Login
                </Link>
                <Link
                  onClick={authSelectRegister}
                  to="/auth"
                  className="block font-bold bg-white text-center p-1 rounded-lg text-orange-400 mt-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          {!auth ? null : (
            <div className="flex gap-5">
              <div className="fav flex items-center gap-1 hover:text-orange-400 transition">
                {userRole === "admin" ? (
                  <>
                    <FaBrain size={20} />

                    <Link className="text-gray-700 text-md" to="/admin">
                      Admin
                    </Link>
                  </>
                ) : (
                  <>
                    <FaHeart size={20} />

                    <Link to="/fav" className=" text-gray-700 text-md ">
                      Favorites
                    </Link>
                  </>
                )}
              </div>
              <Link
                to="/cart"
                className="cartBucket  flex items-center gap-1 hover:text-orange-400 transition"
              >
                <FaShoppingCart size={20} />

                <span className=" text-gray-700 text-md ">Cart</span>
                <span className="text-md  -top-6 -right-5 bg-white rounded-full p-1">
                  {cart.length > 0 ? cart[0].orders.length : 0}
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
