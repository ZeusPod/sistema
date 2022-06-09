import React from "react";
import { Outlet } from "react-router-dom";
import PanelNavbar from "../ui/PanelNavbar";
import PanelSideBar from "../ui/PanelSideBar";

const PanelLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <PanelSideBar />
      <div className="flex flex-col flex-1 overflow-x-auto overflow-y-auto">
        <PanelNavbar />
        <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;
