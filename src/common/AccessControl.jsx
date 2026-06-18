import React from "react";
import CommonNoAccess from "./CommonNoAccess";

const AccessControl = ({ hasAccess, children, message = "No Access" }) => {
  if (!hasAccess) {
    return <CommonNoAccess message={message} />;
  }

  return <>{children}</>;
};

export default AccessControl;
