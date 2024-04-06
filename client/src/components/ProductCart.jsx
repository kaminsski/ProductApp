import React from "react";

function ProductCart({ product }) {
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <div className=" bg-white mb-3">
      <div className="flex flex-col justify-between h-full md:w-[250px] w-[130px] max-w-sm bg-white border border-gray-200 rounded-lg">
        <img
          className="object-cover rounded-t-lg "
          src={product.image}
          alt="product image"
        />

        <div className="px-5 pb-5">
          <h5 className="text-sm md:text-xl font-semibold tracking-tight text-gray-900 ">
            {" "}
            {product.name}{" "}
          </h5>
          <h5 className=" overflow-hidden text-nowrap text-mda tracking-tight text-gray-500">
            {" "}
            {product.description}{" "}
          </h5>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              5.0
            </span>
          </div>
          <div className="flex flex-col self-stretch">
            <h5 className="text-mda tracking-tight text-orange-500 font-bold">
              {product.price} ₺
            </h5>
            <h4 className=" text-xs">{formatDate(product.createdAt)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
