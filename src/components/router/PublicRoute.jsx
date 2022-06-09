import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as path from "../../config/path";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) return <Navigate to={path.DASHBOARD} />;

  return children;
};

export default PublicRoute;
