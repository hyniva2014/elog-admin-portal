import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { actionIconSx } from "./DeviceAssetManagement.styles";

const DeviceAssetManagementActionButton = React.memo(
  ({ row, onView }) => {
    const handleClick = useCallback(() => {
      onView(row);
    }, [onView, row]);

    return (
      <Tooltip title="View">
        <IconButton size="small" onClick={handleClick}>
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
    );
  },
);

export default DeviceAssetManagementActionButton;