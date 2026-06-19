import React, { useCallback, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { StyledActionIcon,actionContainer } from "./DeviceModelManagement.styled";
import GroupIcon from "../../../assets/images/svg/Group.png";
import DeviceModelAuditDialog from "./DeviceModelAuditDialog";

const DeviceModelManagementActionButton = React.memo(
  ({ row, onView, canView = true }) => {
    const [auditDialogOpen, setAuditDialogOpen] = useState(false);

    const handleViewClick = useCallback(() => {
      if (canView) {
        onView(row);
      }
    }, [onView, row, canView]);

    const viewTitle = canView ? "View" : "No permission to view";

    return (
      <>
        <Box sx={actionContainer}>
          <Tooltip title="Audit History" placement="top">
            <IconButton
              size="small"
              onClick={() => setAuditDialogOpen(true)}
            >
              <img src={GroupIcon} alt="audit history" width={16} height={16} />
            </IconButton>
          </Tooltip>

          <Tooltip title={viewTitle} placement="top">
            <span>
              <IconButton
                size="small"
                onClick={handleViewClick}
                disabled={!canView}
              >
                <StyledActionIcon canView={canView} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <DeviceModelAuditDialog
          open={auditDialogOpen}
          onClose={() => setAuditDialogOpen(false)}
        />
      </>
    );
  },
);

DeviceModelManagementActionButton.displayName =
  "DeviceModelManagementActionButton";

export default DeviceModelManagementActionButton;
