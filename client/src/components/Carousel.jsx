import React, { useState, useEffect } from "react";
import { MdCircle } from "react-icons/md";
import { FiCircle } from "react-icons/fi";

export default function Carousel() {
  const [carouselImg, setCarouselImg] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCarouselImg((prevImg) => (prevImg % 3) + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-10 relative mx-2 sm:mx-0">
      <img
        className="sm:h-[800px] h-[300px] w-full object-cover rounded-xl"
        src={`/carousel/c${carouselImg}.jpg`}
        alt=""
      />
      <div className=" flex absolute bottom-5 gap-2 left-1/2">
        <div onClick={() => setCarouselImg(1)}>
          {" "}
          {carouselImg === 1 ? (
            <FiCircle></FiCircle>
          ) : (
            <MdCircle></MdCircle>
          )}{" "}
        </div>
        <div onClick={() => setCarouselImg(2)}>
          {" "}
          {carouselImg === 2 ? (
            <FiCircle></FiCircle>
          ) : (
            <MdCircle></MdCircle>
          )}{" "}
        </div>
        <div onClick={() => setCarouselImg(3)}>
          {" "}
          {carouselImg === 3 ? (
            <FiCircle></FiCircle>
          ) : (
            <MdCircle></MdCircle>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
