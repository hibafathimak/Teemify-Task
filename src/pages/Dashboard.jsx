import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Products from "../components/Products";

const Dashboard = () => {
  return (
    <div className="pt-4">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <Products/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
