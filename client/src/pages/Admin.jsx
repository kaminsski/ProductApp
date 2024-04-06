import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import AdminBrand from "../components/AdminBrand";
import AdminCategory from "../components/AdminCategory";
import { FaSearch } from "react-icons/fa";


export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  const [brand, setBrand] = useState("");

  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");

  const [stock, setStock] = useState([]);

  const [products, setProducts] = useState(null);
  const [update, setUpdate] = useState(null);

  const [side, setSide] = useState(false);
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


  const handleBrandChange = (e) => {
    setBrand(e.target.value); // Seçilen markayı güncelle
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Seçilen markayı güncelle
  };
  const handleColorChange = (e) => {
    setColor(e.target.value); // Seçilen markayı güncelle
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value); // Seçilen markayı güncelle
  };

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("https://product-app-api.vercel.app//brand/");
        const responseCategory = await axios.get(
          "https://product-app-api.vercel.app//category/"
        );
        const responseColor = await axios.get("https://product-app-api.vercel.app//color/");

        setBrands(response.data);
        setCategories(responseCategory.data);
        setColors(responseColor.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrand();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await axios.get("https://product-app-api.vercel.app//product/", {
          headers: {
            Authorization: token,
          },
        });

        setProducts(response.data);
      } catch (error) {
        navigate("/");
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!gender || !brand || !category || !color) {
      toast.error("Lütfen tüm alanları doldurun.");
    }
    try {
      const response = await axios.post(
        "https://product-app-api.vercel.app//product/",
        {
          name,
          price,
          image,
          gender,
          description,
          brand,
          category,
          color,
          stock,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedBrands = [...products, response.data];

      setProducts(updatedBrands);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setPrice("");
    setImage("");
    setStock("");
    setDescription("");
    setUpdate(!update);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://product-app-api.vercel.app//product/${id}`
      );
      const updatedBrands = products.filter((brand) => brand._id !== id);
      setProducts(updatedBrands);
      setSearchResults([])
      setSearchTerm("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSide = () => {
    setSide(!side);
  };

  return (
    <div>
      <div className="flex bg-gray-200 mt-5 min-h-screen">
        <div className={`sm:w-1/2 ${!side ? "w-1/3" : "w-1/7"} bg-gray-800`}>
          {/* Sol menü */}
          <div onClick={handleSide} className="row">
            {side ? (
              <FaArrowRight className="text-white m-2 text-xl" />
            ) : (
              <div className="flex justify-end">
                <FaArrowLeft className="text-white m-2 text-xl " />
              </div>
            )}
          </div>
          <div
            className={`text-white p-4 font-bold text-2xl sm:block ${
              side ? "hidden" : ""
            } `}
          >
            Admin Panel
          </div>
          <ul className={`p-2 space-y-2 sm:block ${side ? "hidden" : ""}`}>
            <li
              onClick={() => setPage(1)}
              className="hover:bg-gray-700 text-white font-semibold p-2"
            >
              Product
            </li>
            <li
              onClick={() => setPage(2)}
              className="hover:bg-gray-700 text-white font-semibold p-2"
            >
              Brand
            </li>

            <li
              onClick={() => setPage(3)}
              className="hover:bg-gray-700 text-white font-semibold p-2"
            >
              Category
            </li>
          </ul>
        </div>
        <div className={`mx-4 sm:w-1/2 ${side ? "w-full" : "w-2/4"}`}>
          {/* İçerik */}

          {page === 1 ? (
            <>
              <h2 className="text-2xl font-bold my-4">Add Product</h2>
              <div className="bg-white p-4 rounded shadow">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                  action=""
                >
                  <label htmlFor="name">Product name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="border p-2 mb-2"
                    id="name"
                    name="name"
                    required
                  />
                  <label htmlFor="name">Product description</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    className="border p-2 mb-2"
                    id="description"
                    name="description"
                    required
                  />
                  <label htmlFor="price">Product price</label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="text"
                    className="border p-2 mb-2"
                    id="price"
                    name="price"
                    required
                  />
                  <label htmlFor="image">Product image</label>
                  <input
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    type="text"
                    className="border p-2 mb-2"
                    id="image"
                    name="image"
                    required
                  />

                  <label htmlFor="image">Product stock</label>
                  <input
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="text"
                    className="border p-2 mb-2"
                    id="stock"
                    name="stock"
                    required
                  />

                  <label htmlFor="brands">Product brand</label>

                  <select
                    className="p-2  border-blue-500 border-2 rounded-2xl text-xs mb-2"
                    name="brands"
                    id="brands"
                    onChange={handleBrandChange}
                  >
                    <option value={null}>Select a brand</option>{" "}
                    {/* Başlangıç değeri null olarak göstermek için */}
                    {brands &&
                      brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                  </select>

                  <label htmlFor="category">Product category</label>

                  <select
                    className="p-2  border-blue-500 border-2 rounded-2xl text-xs mb-2"
                    name="category"
                    id="category"
                    onChange={handleCategoryChange}
                  >
                    <option value={null}>Select a category</option>{" "}
                    {/* Başlangıç değeri null olarak göstermek için */}
                    {categories &&
                      categories.map((ctg) => (
                        <option
                          className="bg-white"
                          key={ctg._id}
                          value={ctg._id}
                        >
                          {ctg.name}
                        </option>
                      ))}
                  </select>

                  <label htmlFor="color">Product color</label>

                  <select
                    className="p-2  border-blue-500 border-2 rounded-2xl text-xs mb-2"
                    name="color"
                    id="color"
                    onChange={handleColorChange}
                  >
                    <option value={null}>Select a color</option>{" "}
                    {/* Başlangıç değeri null olarak göstermek için */}
                    {colors &&
                      colors.map((ctg) => (
                        <option
                          className="bg-white"
                          key={ctg._id}
                          value={ctg._id}
                        >
                          {ctg.name}
                        </option>
                      ))}
                  </select>

                  <label htmlFor="gender">Product gender</label>

                  <select
                    className="p-2  border-blue-500 border-2 rounded-2xl text-xs mb-2"
                    name="gender"
                    id="gender"
                    onChange={handleGenderChange}
                  >
                    <option value={null}>Select a gender</option>{" "}
                    {/* Başlangıç değeri null olarak göstermek için */}
                    <option
                      onClick={() => setGender("man")}
                      className="bg-white"
                      key="man"
                      value="male"
                    >
                      Male
                    </option>
                    <option className="bg-white" key="woman" value="female">
                      Female
                    </option>
                  </select>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Add Product
                  </button>
                </form>
              </div>
              <h1 className="text-2xl font-bold mb-4 mt-4">Dashboard</h1>
              <div className="productList flex flex-wrap m-4 mb-3">




              <>
      <div className="w-full">
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

        <ul className=" bg-gray-200 rounded-md w-full">
          <div className="w-full flex flex-wrap">
            {searchResults.map((pro, id) => (
              <div
              key={id}
              className="w-full p-1 sm:p-4"
            >
              <div className="bg-white p-4 rounded shadow relative">
                <p className="text-lg font-bold my-2 overflow-hidden">{pro.name}</p>
                <p className="text-gray-700 mb-2">${pro.price}</p>

                <button
                  onClick={() => handleDeleteProduct(pro._id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            ))}
          </div>
        </ul>
      </div>
    </>



              </div>
            </>
          ) : page === 2 ? (
            <AdminBrand></AdminBrand>
          ) : page === 3 ? (
            <AdminCategory></AdminCategory>
          ) : (
            <div>Not Page 0, 1, or 2</div>
          )}
        </div>
      </div>
    </div>
  );
}
