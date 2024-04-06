import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import Modal from "./Modal";

function AdminCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);

  const [nameModal, setNameModal] = useState("");
  const [imageModal, setImageModal] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("https://product-app-api.vercel.app/category/");

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrand();
  }, []);

  const brandSubmit = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      e.preventDefault();

      const response = await axios.post(
        "https://product-app-api.vercel.app/category/",
        formData
      );
      setName("");
      setImage("");
      const updatedBrands = [...categories, response.data];
      setCategories(updatedBrands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `https://product-app-api.vercel.app/category/${id}`
      );
      const updatedBrands = categories.filter((brand) => brand._id !== id);
      setCategories(updatedBrands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = async (id) => {
    const response = await axios.get(`https://product-app-api.vercel.app/category/${id}`);
    const productToEdit = response.data.product;

    setEditingCategoryId(id);
    setNameModal(productToEdit.name);
    setImageModal(productToEdit.image);

    setModal(true);
  };
  return (
    <div>
      <Modal
        categories={categories}
        setCategories={setCategories}
        setImageModal={setImageModal}
        imageModal={imageModal}
        setEditingCategoryId={setEditingCategoryId}
        editingCategoryId={editingCategoryId}
        nameModal={nameModal}
        setNameModal={setNameModal}
        modal={modal}
        setModal={setModal}
      ></Modal>

      <h1 className="text-2xl font-bold my-4">Add Category</h1>
      <form
        className="bg-white flex flex-col justify-center p-4"
        encType="multipart/form-data"
        onSubmit={brandSubmit}
      >
        <label htmlFor="name">Category name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="block border p-2 mb-2"
          id="name"
          name="name"
          required
        />

        <label className="block" htmlFor="image">
          Category image
        </label>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
          className="border p-2 mb-2 block"
          id="image"
          name="image"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Category
        </button>
      </form>

      <h1 className="text-2xl font-bold my-4">Dashboard</h1>
      <div className="productList flex flex-wrap m-4 mb-3">
        {categories &&
          categories.map((pro, id) => (
            <div key={id} className="w-full sm:w-1/2 lg:w-1/3 p-1 sm:p-4">
              <div className="bg-white p-4 rounded shadow relative">
                <img src={pro.image} alt="" />
                <h1 className="text-lg font-bold my-2">{pro.name}</h1>

                <button
                  onClick={() => handleDeleteCategory(pro._id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEditCategory(pro._id)}
                  className="text-blue-400 absolute top-2 right-6"
                >
                  <GrUpdate />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminCategory;
