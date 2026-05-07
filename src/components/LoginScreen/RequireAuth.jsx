import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.token,
  );

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
