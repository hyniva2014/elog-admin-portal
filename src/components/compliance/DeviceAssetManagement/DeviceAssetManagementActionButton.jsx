import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GroupIcon from "../../../assets/images/svg/Group.png";

import { actionIconSx, DeleteIconSx } from "./DeviceAssetManagement.styles";

const DeviceAssetManagementActionButton = React.memo(
  ({ row, onView, onDelete, onHistory, canView = true, canDelete = true }) => {
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

    const handleHistoryClick = useCallback(() => {
      onHistory(row);
    }, [onHistory, row]);

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
        <Tooltip title="Audit History">
          <IconButton size="small" onClick={handleHistoryClick}>
            <img src={GroupIcon} alt="Device History" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={tooltipTitle}>
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
