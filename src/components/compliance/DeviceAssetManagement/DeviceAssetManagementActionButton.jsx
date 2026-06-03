import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { actionIconSx } from "./DeviceAssetManagement.styles";

const DeviceAssetManagementActionButton = React.memo(
  ({ row, onView, onDelete }) => {
    const handleViewClick = useCallback(() => {
      onView(row);
    }, [onView, row]);

    const handleDeleteClick = useCallback(() => {
      onDelete(row);
    }, [onDelete, row]);

    const isOutOfService = row.status === "Out of Service";

    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Tooltip title="View">
          <IconButton size="small" onClick={handleViewClick}>
            <VisibilityOutlinedIcon sx={actionIconSx} />
          </IconButton>
        </Tooltip>
        <Tooltip title={isOutOfService ? "Out of Service" : "Delete"}>
          <span>
            <IconButton
              size="small"
              onClick={handleDeleteClick}
              disabled={isOutOfService}
            >
              <DeleteOutlineIcon
                sx={isOutOfService ? { color: "action.disabled" } : { color: "#E02020" }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  },
);

export default DeviceAssetManagementActionButton;