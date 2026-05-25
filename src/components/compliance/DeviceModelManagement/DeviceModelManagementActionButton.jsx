import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { StyledActionIcon } from "./DeviceModelManagement.styles";

const DeviceModelManagementActionButton = React.memo(
  ({ row, onView }) => {
    const handleClick = useCallback(() => {
      onView(row);
    }, [onView, row]);

    return (
      <Tooltip title="View">
        <IconButton size="small" onClick={handleClick}>
          <StyledActionIcon />
        </IconButton>
      </Tooltip>
    );
  },
);

export default DeviceModelManagementActionButton;
