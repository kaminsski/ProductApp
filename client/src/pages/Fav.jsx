import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Fav() {
  const { auth } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchUsersFav = async () => {
      try {
        if (auth && auth._id) {
          const user = auth._id;
          const response = await axios.get(
            `https://product-app-api.vercel.app//fav/userFav/${user}`
          );
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersFav();

  


  }, [auth]);
  const authInfo = JSON.parse(localStorage.getItem("auth"))
  if (authInfo === null) {
    return(window.location.href="/")
  }


  return (
    <div>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Favorites</h1>
        </div>
        <div className="mt-8">
          {product && product.length === 0 &&
          
          <div className=" bg-orange-300 p-4 font-bold">You haven't favorited any products yet</div>
          }
          
          {product
            ? product.map((order, id) => (
                <div
                  key={id}
                  className="flex flex-col md:flex-row border-b border-gray-400 py-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={order.product.image}
                      alt="Product image"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      to={`/product/${order.product._id}`}
                      className="text-lg font-bold text-blue-500"
                    >
                      {" "}
                      {order.product.name}{" "}
                    </Link>
                    <p className="mt-2 text-gray-600">
                      {" "}
                      {order.product.description}{" "}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Fav;
