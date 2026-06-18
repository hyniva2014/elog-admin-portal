import React from "react";
import { EditButton, CancelEditButton, AddButton } from "./DeviceModelManagement.styled";

export const HeaderEditButton = ({ onClick, disabled }) => (
  <EditButton variant="contained" onClick={onClick} disabled={disabled}>
    Edit
  </EditButton>
);

export const HeaderCancelEditButton = ({ onClick }) => (
  <CancelEditButton variant="outlined" onClick={onClick}>
    Cancel Edit
  </CancelEditButton>
);

export const HeaderAddButton = ({ onClick, disabled }) => (
  <AddButton variant="contained" onClick={onClick} disabled={disabled}>
    Add Asset
  </AddButton>
);
