import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { hasPermission, shouldAllowRoute } from "../utils/permissionUtils";

const ProtectedRoute = ({ 
  children, 
  moduleKey = "", 
  actionKey = "",
  fallbackPath = "/dashboard",
  checkRoutePermissions = false
}) => {
  const location = useLocation();
  const token = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.token,
  );
  
  const loginPermissions = useSelector(
    (state) => state.loginSlice.permissions || {},
  );
  
  const rolePermissions = useSelector(
    (state) => state.rolePermissions?.permissions || {},
  );
  
  const permissions = Object.keys(rolePermissions).length > 0 
    ? rolePermissions 
    : loginPermissions;

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (moduleKey && actionKey) {
    const hasAccess = hasPermission(permissions, moduleKey, actionKey);
    
    if (!hasAccess && location.pathname !== fallbackPath) {
      return <Navigate to={fallbackPath} replace state={{ unauthorized: true }} />;
    }
  }

  if (checkRoutePermissions && !moduleKey && !actionKey) {
    const hasAccess = shouldAllowRoute(location.pathname, permissions);
    
    if (!hasAccess && location.pathname !== fallbackPath) {
      return <Navigate to={fallbackPath} replace state={{ unauthorized: true }} />;
    }
  }

  return children;
};

export default ProtectedRoute;
