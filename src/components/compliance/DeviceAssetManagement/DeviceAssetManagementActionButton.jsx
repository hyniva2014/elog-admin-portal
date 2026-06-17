import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { actionIconSx, DeleteIconSx } from "./DeviceAssetManagement.styles";

const DeviceAssetManagementActionButton = React.memo(
  ({ row, onView, onDelete, canView = true, canDelete = true }) => {
    const handleViewClick = useCallback(() => {
      if (canView) {
        onView(row);
      }
    }, [onView, row, canView]);

    const handleDeleteClick = useCallback(() => {
      if (canDelete) {
        onDelete(row);
      }
    }, [onDelete, row, canDelete]);

    const isOutOfService = row.status === "Out of Service";

    const iconStyle = canView ? actionIconSx : { color: "action.disabled" };

    const tooltipTitle = isOutOfService
      ? "Out of Service"
      : canDelete
        ? "Delete"
        : "No permission to delete";

    const isDeleteDisabled = isOutOfService || !canDelete;

    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Tooltip title={canView ? "View" : "No permission to view"}>
          <IconButton
            size="small"
            onClick={handleViewClick}
            disabled={!canView}
          >
            <VisibilityOutlinedIcon sx={iconStyle} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={tooltipTitle}
        >
          <span>
            <IconButton
              size="small"
              onClick={handleDeleteClick}
              disabled={isDeleteDisabled}
            >
              <DeleteOutlineIcon sx={DeleteIconSx(isOutOfService, canDelete)} />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  },
);

export default DeviceAssetManagementActionButton;
