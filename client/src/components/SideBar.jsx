import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsAction } from "../redux/actions/brand";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { getCategoriesAction } from "../redux/actions/category";
import { getColorAction } from "../redux/actions/color";
import axios from "axios";
import { getProductFilteredAction } from "../redux/actions/product";

export default function SideBar() {
  const [drop, setDrop] = useState(true);
  const [dropCol, setDropCol] = useState(true);
  const [dropCtg, setDropCtg] = useState(true);

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);
  const { colors } = useSelector((state) => state.colors);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = async (event, setter, selected) => {
    const { id, checked } = event.target;
    let updatedBrandSelection = [...selectedBrands];
    let updatedCategorySelection = [...selectedCategories];
    let updatedColorSelection = [...selectedColors];

    if (checked) {
      if (event.target.className === "brand") {
        updatedBrandSelection = [...selected, id];
        setter(updatedBrandSelection);
      }
      if (event.target.className === "category") {
        updatedCategorySelection = [...selected, id];
        setter(updatedCategorySelection);
      }
      if (event.target.className === "color") {
        updatedColorSelection = [...selected, id];
        setter(updatedColorSelection);
      }
    } else {
      if (event.target.className === "brand") {
        updatedBrandSelection = selected.filter((item) => item !== id);
        setter(updatedBrandSelection);
      }
      if (event.target.className === "category") {
        updatedCategorySelection = selected.filter((item) => item !== id);
        setter(updatedCategorySelection);
      }
      if (event.target.className === "color") {
        updatedColorSelection = selected.filter((item) => item !== id);
        setter(updatedColorSelection);
      }
    }

    try {
      const data = {
        selectedBrands: updatedBrandSelection,
        selectedCategories: updatedCategorySelection,
        selectedColors: updatedColorSelection,
      };

      const response = await axios.post(
        "https://product-app-api.vercel.app/product/filter",
        data
      );
      dispatch(getProductFilteredAction(response.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getBrandsAction());
    dispatch(getColorAction());
  }, [dispatch]);

  return (
    <div className=" min-h-screen max-h-screen overflow-auto">
      <div className="brandContainer">
        <div
          onClick={() => setDrop(!drop)}
          className="iconWrapper flex justify-between items-center p-2"
        >
          <h2 className=" font-bold text-lg">Brands</h2>
          <div className="me-4">{!drop ? <FaArrowUp /> : <FaArrowDown />}</div>
        </div>
        <div
          className={`dropdown ${
            drop && "hidden"
          } h-[200px] overflow-scroll p-1 bg-gray-100 m-2`}
        >
          {brands.map((brand, id) => (
            <div key={id} className="checkboxWrapper">
              <input
                className="brand"
                type="checkbox"
                name={brand.name}
                id={brand._id}
                onChange={(event) =>
                  handleCheckboxChange(event, setSelectedBrands, selectedBrands)
                }
              />
              <label className="ml-1 font-semibold" htmlFor={brand.name}>
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="colorContainer">
        <div
          onClick={() => setDropCol(!dropCol)}
          className="iconWrapper flex justify-between items-center p-2"
        >
          <h2 className=" font-bold text-lg">Colors</h2>
          <div className="me-4">
            {!dropCol ? <FaArrowUp /> : <FaArrowDown />}
          </div>
        </div>
        <div
          className={`dropdown ${
            dropCol && "hidden"
          } h-[200px] overflow-scroll p-1 bg-gray-100 m-2`}
        >
          {colors.map((brand, id) => (
            <div key={id} className="checkboxWrapper">
              <input
                className="color"
                type="checkbox"
                name={brand.name}
                id={brand._id}
                onChange={(event) =>
                  handleCheckboxChange(event, setSelectedColors, selectedColors)
                }
              />
              <label className="ml-1 font-semibold" htmlFor={brand.name}>
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="categoriesContainer">
        <div
          onClick={() => setDropCtg(!dropCtg)}
          className="iconWrapper flex justify-between items-center p-2"
        >
          <h2 className=" font-bold text-lg">Categories</h2>
          <div className="me-4">
            {!dropCtg ? <FaArrowUp /> : <FaArrowDown />}
          </div>
        </div>
        <div
          className={`dropdown ${
            dropCtg && "hidden"
          } h-[200px] overflow-scroll p-1 bg-gray-100 m-2`}
        >
          {categories.map((category, id) => (
            // Using category's 'id' as a unique key
            <div key={id} className="checkboxWrapper">
              <input
                className="category"
                type="checkbox"
                name={category.name}
                id={category._id}
                onChange={(event) =>
                  handleCheckboxChange(
                    event,
                    setSelectedCategories,
                    selectedCategories
                  )
                }
              />
              <label className="ml-1 font-semibold" htmlFor={category.name}>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
