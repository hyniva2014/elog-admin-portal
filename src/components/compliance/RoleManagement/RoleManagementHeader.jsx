import { Box, Typography, Button } from "@mui/material";
import { AddButton, Header, RoleCount, roleManagementStyles, Subtitle, Title } from "./RoleManagement.styled";

const RoleManagementHeader = ({ roles, onAddRole }) => {
  return (
    <Header>
      <Box>
        <Title>
          Roles Overview
        </Title>

        <Subtitle>
          Quick view of all roles and their access levels
        </Subtitle>

        <RoleCount>
          {roles.length} roles configured
        </RoleCount>
      </Box>

      <AddButton
        onClick={onAddRole}
      >
        Add Role
      </AddButton>
    </Header>
  );
};

export default RoleManagementHeader;
