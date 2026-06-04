import React from "react";

import { Grid } from "@mui/material";

import PermissionList from "./PermissionList";

import {
  CardHeader,
  PermissionCard,
  CardContentWrapper,
  CountBadge,
  PermissionsWrapper,
  StyledDivider,
  CardFooter,
  FooterActionButton,
  ModuleTitle,
} from "./RolePermissions.styled";

const PermissionCardItem = ({
  module,
  permissions,
  permissionState,
  onToggle,
  onEnableAll,
  onDisableAll,
}) => {
  const enabledCount = permissionState[module]?.filter(Boolean).length || 0;

  const totalCount = permissions?.length || 0;

  const permissionCount = `${enabledCount}/${totalCount}`;

  const isAllEnabled = enabledCount === totalCount;

  const isAllDisabled = enabledCount === 0;

  const permissionCardEnabled = enabledCount === totalCount;

  const enableAllDisabled = isAllEnabled ? 1 : 0;

  const disableAllDisabled = isAllDisabled ? 1 : 0;

  return (
    <Grid item xs={12} md={6}>
      <PermissionCard isenabled={permissionCardEnabled}>
        <CardContentWrapper>
          <CardHeader>
            <ModuleTitle>{module}</ModuleTitle>

            <CountBadge>{permissionCount}</CountBadge>
          </CardHeader>

          <PermissionsWrapper>
            <PermissionList
              module={module}
              permissions={permissions}
              permissionState={permissionState}
              onToggle={onToggle}
            />
          </PermissionsWrapper>
        </CardContentWrapper>

        <StyledDivider />

        <CardFooter>
          <FooterActionButton
            fullWidth
            variant="outlined"
            disabledbutton={enableAllDisabled}
            disabled={isAllEnabled}
            onClick={onEnableAll(module)}
          >
            Enable All
          </FooterActionButton>

          <FooterActionButton
            fullWidth
            variant="outlined"
            disabledbutton={disableAllDisabled}
            disabled={isAllDisabled}
            onClick={onDisableAll(module)}
          >
            Disable All
          </FooterActionButton>
        </CardFooter>
      </PermissionCard>
    </Grid>
  );
};

export default PermissionCardItem;
