import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBrandsAction } from "../redux/actions/brand";
import Brands from "../components/Brands";
import SpecialLinks from "../components/SpecialLinks";
import Carousel from "../components/Carousel";
import CategoryCards from "../components/CategoryCards";
import { getCategoriesAction } from "../redux/actions/category";

export default function Home() {
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getBrandsAction());
  }, [dispatch]);
  return (
    <>
      <div className=" min-h-screen">
        <Brands brands={brands}></Brands>
        <SpecialLinks></SpecialLinks>
        <Carousel></Carousel>
        <CategoryCards categories={categories}></CategoryCards>
      </div>
    </>
  );
}
