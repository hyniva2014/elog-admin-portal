import { Box } from "@mui/material";
import React from "react";
import RoleCard from "./RoleCard";

const RoleList = ({ roles, onEdit }) => {
  const roleCards = roles.map((role) => (
    <RoleCard key={role.id} role={role} onEdit={onEdit} />
  ));

  return <Box>{roleCards}</Box>;
};

export default RoleList;
