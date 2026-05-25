import React from "react";
import { EditButton, CancelEditButton, AddButton } from "./DeviceModelManagement.styled";

export const HeaderEditButton = ({ onClick }) => (
  <EditButton variant="contained" onClick={onClick}>
    Edit
  </EditButton>
);

export const HeaderCancelEditButton = ({ onClick }) => (
  <CancelEditButton variant="outlined" onClick={onClick}>
    Cancel Edit
  </CancelEditButton>
);

export const HeaderAddButton = ({ onClick }) => (
  <AddButton variant="contained" onClick={onClick}>
    Add Asset
  </AddButton>
);
