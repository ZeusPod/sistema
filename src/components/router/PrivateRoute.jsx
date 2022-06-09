import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import * as path from "../../config/path";

const PrivateRouter = ({ children, hasRole: role }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn)
    return (
      <Navigate to={{ pathname: path.SIGNIN }} state={{ from: location }} />
    );

  return children;
};

export default PrivateRouter;
