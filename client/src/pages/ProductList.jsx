import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import { GrConfigure } from "react-icons/gr";

export default function ProductList() {
  const [side, setSide] = useState(false);
  return (
    <>
      <div className="detailProduct flex mb-20 mt-5">
        <div
          className={`sideBarContainer bg-gray-200 h-10 ${
            side ? "w-2/4" : "sm:w-1/7  w-1/7"
          } rounded-lg`}
        >
          <GrConfigure
            onClick={() => setSide(!side)}
            className=" text-3xl p-1 bg-white rounded-full ml-auto m-1"
          />
          {side && (
            <>
              <SideBar></SideBar>
            </>
          )}{" "}
        </div>

        <div
          className={`dashboardContainer min-h-screen bg-orange-100 rounded-lg ${
            side ? "w-3/4" : "w-full"
          }`}
        >
          <Dashboard></Dashboard>
        </div>
      </div>
    </>
  );
}
