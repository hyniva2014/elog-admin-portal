import { Box, Button, Typography } from "@mui/material";
import { DRIVER_STATUS_FORM } from "../Constants";
import {
  PageHeaderContainerSx,
  PageHeaderLeftSx,
  BackButtonSx,
  StatusChipSx,
  StatusDotSx,
  HeaderButtonsSx,
  PageHeaderTitleSx,
  EditButtonStyle,
} from "./UserPageHeader.styled";

const StatusChip = ({ statusLabel, isActive }) => {
  if (!statusLabel) return null;

  return (
    <Box sx={StatusChipSx(isActive)}>
      <Box sx={StatusDotSx(isActive)} />
      {statusLabel}
    </Box>
  );
};

const EditActionButton = ({ canUpdate, handleStartEdit }) => (
  <Button
    variant="contained"
    disabled={!canUpdate}
    onClick={handleStartEdit}
    sx={EditButtonStyle(canUpdate)}
  >
    Edit
  </Button>
);

const EditButtonSection = ({ mode, editMode, canUpdate, handleStartEdit }) => {
  if (mode === "add") return null;
  if (editMode) return null;
  return (
    <EditActionButton canUpdate={canUpdate} handleStartEdit={handleStartEdit} />
  );
};

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
      <Box sx={PageHeaderLeftSx}>
        <Button variant="outlined" onClick={handleBack} sx={BackButtonSx}>
          ← Back
        </Button>

        <Typography sx={PageHeaderTitleSx}>Platform User Details</Typography>

        <StatusChip statusLabel={statusLabel} isActive={isActive} />
      </Box>

      <Box sx={HeaderButtonsSx}>
        <EditButtonSection
          mode={mode}
          editMode={editMode}
          canUpdate={canUpdate}
          handleStartEdit={handleStartEdit}
        />
      </Box>
    </Box>
  );
};

export default UserPageHeader;
