import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { StyledActionIcon } from "./DeviceModelManagement.styled";

const DeviceModelManagementActionButton = React.memo(
  ({ row, onView, canView = true }) => {
    const handleClick = useCallback(() => {
      if (canView) {
        onView(row);
      }
    }, [onView, row, canView]);

    const viewTitle = canView ? "View" : "No permission to view";

    return (
      <Tooltip title={viewTitle}>
        <IconButton size="small" onClick={handleClick} disabled={!canView}>
          <StyledActionIcon canView={canView} />
        </IconButton>
      </Tooltip>
    );
  },
);

DeviceModelManagementActionButton.displayName = "DeviceModelManagementActionButton";

export default DeviceModelManagementActionButton;
