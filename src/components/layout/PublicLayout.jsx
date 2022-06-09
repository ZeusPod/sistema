import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicLayout;
