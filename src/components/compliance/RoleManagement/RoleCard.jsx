import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import groupIcon from "../../../assets/images/svg/Group.png";
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
  AuditLogIcon,
} from "./RoleCard.styles";

const RoleCard = ({ role, onEdit, onOpenAuditLog, canView, canUpdate }) => {
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

  const handleAuditLogClick = () => {
    onOpenAuditLog(role);
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

        <Tooltip title={canView ? "View" : "View - Permission denied"}>
          <ViewButton onClick={handleViewClick} disabled={!canView}>{viewIcon}</ViewButton>
        </Tooltip>

        <Tooltip title="Audit History">
          <IconButton size="small" onClick={handleAuditLogClick}>
            <AuditLogIcon src={groupIcon} alt="Audit Log" />
          </IconButton>
        </Tooltip>

        <Tooltip title={canUpdate ? "Edit" : "Edit - Permission denied"}>
          <EditButton onClick={handleEditClick} disabled={!canUpdate}>{editIcon}</EditButton>
        </Tooltip>

      </ActionsWrapper>
    </RoleRow>
  );
};

export default RoleCard;
