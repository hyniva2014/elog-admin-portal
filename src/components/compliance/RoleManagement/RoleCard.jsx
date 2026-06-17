import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  RoleRow,
  LeftSection,
  RoleAvatar,
  RoleTitle,
  RoleDescription,
  UsersColumn,
  StatusColumn,
  ClickableUsersCount,
  ActiveStatusText,
  InactiveStatusText,
  ActionsWrapper,
  ViewButton,
  EditButton,
} from "./RoleCard.styles";

const RoleCard = ({ role, onEdit, canView, canUpdate }) => {
  const navigate = useNavigate();

  const handleUsersClick = () => {
    navigate(`/role-user-management?roleId=${role.id}&roleName=${role.title}`);
  };

  const handleViewClick = () => {
    navigate(`/role-permissions/${role.id}`);
  };

  const handleEditClick = () => {
    onEdit(role);
  };

  const avatarLetter = role.title?.charAt(0);

  const formattedUsersCount = String(role.users).padStart(2, "0");

  const isActive = role.status === "Active";

  const statusComponent = isActive ? (
    <ActiveStatusText>{role.status}</ActiveStatusText>
  ) : (
    <InactiveStatusText>{role.status}</InactiveStatusText>
  );

  const viewIcon = <VisibilityOutlinedIcon fontSize="small" />;

  const editIcon = <EditOutlinedIcon fontSize="small" />;

  return (
    <RoleRow>
      <LeftSection>
        <RoleAvatar>{avatarLetter}</RoleAvatar>
        <Box>
          <RoleTitle>{role.title}</RoleTitle>
          <RoleDescription>{role.description}</RoleDescription>
        </Box>
      </LeftSection>
      <UsersColumn>
        <ClickableUsersCount onClick={handleUsersClick}>
          {formattedUsersCount}
        </ClickableUsersCount>
      </UsersColumn>
      <StatusColumn>{statusComponent}</StatusColumn>
      <ActionsWrapper>
        <ViewButton onClick={handleViewClick} disabled={!canView}>{viewIcon}</ViewButton>
        <EditButton onClick={handleEditClick} disabled={!canUpdate}>{editIcon}</EditButton>
      </ActionsWrapper>
    </RoleRow>
  );
};

export default RoleCard;
