import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import ModalBrand from "./ModalBrand";

function AdminBrand() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);

  const [nameModal, setNameModal] = useState("");
  const [imageModal, setImageModal] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("https://product-app-api.vercel.app/brand/");

        setBrands(response.data);
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
        "https://product-app-api.vercel.app/brand/",
        formData
      );
      setName("");
      setImage("");
      const updatedBrands = [...brands, response.data];
      setBrands(updatedBrands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      const response = await axios.delete(`https://product-app-api.vercel.app/brand/${id}`);
      const updatedBrands = brands.filter((brand) => brand._id !== id);
      setBrands(updatedBrands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBrand = async (id) => {
    const response = await axios.put(`https://product-app-api.vercel.app/brand/${id}`);
    const productToEdit = response.data;

    setEditingCategoryId(id);
    setNameModal(productToEdit.name);
    setImageModal(productToEdit.image);

    setModal(true);
  };

  return (
    <div>
      <ModalBrand
        brands={brands}
        setBrands={setBrands}
        setImageModal={setImageModal}
        imageModal={imageModal}
        setEditingCategoryId={setEditingCategoryId}
        editingCategoryId={editingCategoryId}
        nameModal={nameModal}
        setNameModal={setNameModal}
        modal={modal}
        setModal={setModal}
      ></ModalBrand>
      <h1 className="text-2xl font-bold my-4">Add Brand</h1>

      <form
        className="bg-white flex flex-col justify-center p-4"
        encType="multipart/form-data"
        onSubmit={brandSubmit}
      >
        <label htmlFor="name">Brand name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="border p-2 mb-2"
          id="name"
          name="name"
          required
        />

        <label htmlFor="image">Brand image</label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="border p-2 mb-2"
          id="image"
          name="image"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Brand
        </button>
      </form>

      <h1 className="text-2xl font-bold my-4">Dashboard</h1>
      <div className="productList flex flex-wrap m-4 mb-3">
        {brands &&
          brands.map((pro, id) => (
            <div key={id} className="w-full sm:w-1/2 lg:w-1/3 p-1 sm:p-4">
              <div className="bg-white p-4 rounded shadow relative">
                <img src={pro.image} alt="" />
                <h1 className="text-lg font-bold my-2">{pro.name}</h1>

                <button
                  onClick={() => handleDeleteBrand(pro._id)}
                  className=" hover:p-1 hover:bg-red-500 hover:text-white absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEditBrand(pro._id)}
                  className="hover:p-1 hover:bg-blue-500 hover:text-white text-blue-400 absolute top-2 right-9 "
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

export default AdminBrand;
