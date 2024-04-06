import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (event) => {
    try {
      const value = event.target.value;
      setSearchTerm(value);

      if (value.trim() !== "") {
        const response = await axios.get(
          `https://product-app-api.vercel.app//product/search/?query=${value}`
        );
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, [navigate]);

  return (
    <>
      <div className=" relative">
        <input
          className=" bg-gray-300 p-2 w-full rounded-lg"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <FaSearch
          color="orange"
          size={20}
          className=" absolute right-2 top-2"
        />

        <ul className=" bg-gray-200 absolute top-10 w-full z-10  rounded-md ">
          <div className="">
            {searchResults.map((result, index) => (
              <li
                onClick={() => navigate(`/product/${result._id}`)}
                className="bg-white m-4 p-2 flex justify-between hover:bg-gray-500"
                key={index}
              >
                <div className=" font-bold overflow-hidden gap-10">
                  {" "}
                  {result.name}
                </div>
                <div>
                  <img
                    className=" object-cover h-[100px]"
                    src={result.image}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}

export default Search;
