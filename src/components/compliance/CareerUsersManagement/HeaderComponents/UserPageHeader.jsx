import { Box, Button, Typography } from "@mui/material";
import { DRIVER_STATUS_FORM } from "../Constants";
import {
  PageHeaderContainerSx,
  PageHeaderLeftSx,
  BackButtonSx,
  StatusChipSx,
  StatusDotSx,
  HeaderButtonsSx,
} from "./UserPageHeader.styled";

const UserPageHeader = ({
  handleBack,
  editMode,
  setEditMode,
  handleCancelEdit,
  handleDiscard,
  handleSaveChanges,
  canUpdate,
  formData,
  mode,
}) => {
  const statusLabel = DRIVER_STATUS_FORM.find(
    (item) => item.value === formData.status_id,
  )?.label;

  const isActive = statusLabel?.toLowerCase() === "active";

  const handleStartEdit = () => {
    if (!canUpdate) return;
    setEditMode(true);
  };

  return (
    <Box sx={PageHeaderContainerSx}>
      {/* LEFT SIDE */}
      <Box sx={PageHeaderLeftSx}>
        {/* ✅ Back Button (black style like image) */}
        <Button variant="outlined" onClick={handleBack} sx={BackButtonSx}>
          ← Back
        </Button>

        {/* Title */}
        <Typography fontWeight={700} fontSize={17}>
          Career User Details
        </Typography>

        {/* ✅ Status Chip with Dot */}
        {statusLabel && (
          <Box sx={StatusChipSx(isActive)}>
            {/* Dot */}
            <Box sx={StatusDotSx(isActive)} />
            {statusLabel}
          </Box>
        )}
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={HeaderButtonsSx}>
        {mode !== "add" &&
          (!editMode ? (
            <Button
              variant="contained"
              disabled={!canUpdate}
              onClick={handleStartEdit}
            >
              Edit
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default UserPageHeader;