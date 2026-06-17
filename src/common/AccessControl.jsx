import React from "react";
import CommonNoAccess from "./CommonNoAccess";

/**
 * AccessControl Component
 * Conditionally renders children based on access permission
 * Shows CommonNoAccess if access is denied
 * 
 * @param {Object} props
 * @param {Boolean} props.hasAccess - Whether user has access
 * @param {React.ReactNode} props.children - Children to render if hasAccess is true
 * @param {String} props.message - Message to show when access is denied (default: "No Access")
 */
const AccessControl = ({ hasAccess, children, message = "No Access" }) => {
  if (!hasAccess) {
    return <CommonNoAccess message={message} />;
  }

  return <>{children}</>;
};

export default AccessControl;
