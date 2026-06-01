import React from "react";
import { Box } from "@mui/material";
import RoleCard from "./RoleCard";

const renderRoleCards = () =>
  roles.map((role) => <RoleCard key={role.id} role={role} onEdit={onEdit} />);

const RoleList = ({ roles, onEdit }) => {
  return <Box>{renderRoleCards()}</Box>;
};

export default RoleList;
