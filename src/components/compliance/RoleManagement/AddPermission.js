// AddPermission.jsx

import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonTextField from "../../../common/CommonTextField";
import CommonLoading from "../../../common/CommonLoading";
import { useServices } from "../../../services/services";
import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  TopFieldsWrapper,
  StyledCard,
  CardHeaderWrapper,
  ModuleTitleWrapper,
  ModuleTitle,
  CountBadge,
  PermissionListWrapper,
  PermissionItem,
  PermissionContent,
  PermissionTitle,
  PermissionDescription,
  StyledSwitch,
  CardFooterWrapper,
  OutlineButton,
  FooterWrapper,
  FooterCancelButton,
  FooterSaveButton,
} from "./AddPermission.styles";

const AddPermission = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const [roleData, setRoleData] = useState(null);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [permissionState, setPermissionState] = useState({});

  useEffect(() => {
    if (roleId) {
      fetchRoleById();
    }
  }, [roleId]);

  const fetchRoleById = async () => {
    try {
      setLoading(true);

      const response = await fetchApi(
        `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
      );
      const roleDetails = response?.body?.Roles;
      setRoleData(roleDetails);

      const grouped = roleDetails?.permissions?.reduce((acc, permission) => {
        if (!acc[permission.module]) {
          acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
      }, {});

      setGroupedPermissions(grouped);
      const initialState = {};
      Object.keys(grouped || {}).forEach((module) => {
        initialState[module] = grouped[module]?.map(
          (permission) => permission.is_enabled === 1,
        );
      });

      setPermissionState(initialState);
    } catch (error) {
      console.error("Fetch Role Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (module, index) => {
    setPermissionState((prev) => {
      const updated = {
        ...prev,
      };

      updated[module][index] = !updated[module][index];

      return updated;
    });
  };

  const handleEnableAll = (module) => {
    setPermissionState((prev) => ({
      ...prev,

      [module]: groupedPermissions[module]?.map(() => true),
    }));
  };

  const handleDisableAll = (module) => {
    setPermissionState((prev) => ({
      ...prev,

      [module]: groupedPermissions[module]?.map(() => false),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const enabled_permissions = [];
      const disabled_permissions = [];
      Object.keys(groupedPermissions).forEach((module) => {
        groupedPermissions[module]?.forEach((permission, index) => {
          if (permissionState[module]?.[index]) {
            enabled_permissions.push(permission.id);
          } else {
            disabled_permissions.push(permission.id);
          }
        });
      });

      const payload = {
        role_id: Number(roleId),
        enabled_permissions,
        disabled_permissions,
      };
      console.log(payload);
    } catch (error) {
      console.error("Save Permission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPermissionCards = () => {
    return Object.keys(groupedPermissions || {}).map((module, index) => {
      const enabledCount = permissionState[module]?.filter(Boolean).length || 0;

      const totalCount = groupedPermissions[module]?.length || 0;

      const renderPermissionItems = (module) => {
        return groupedPermissions[module]?.map((permission, idx) => (
          <PermissionItem key={permission.id}>
            <PermissionContent>
              <Box>
                <PermissionTitle>{permission.action}</PermissionTitle>

                <PermissionDescription>
                  {permission.description || permission.code}
                </PermissionDescription>
              </Box>

              <StyledSwitch
                checked={permissionState[module]?.[idx] || false}
                onChange={() => handleToggle(module, idx)}
              />
            </PermissionContent>
          </PermissionItem>
        ));
      };

      const permissionCountText = `${enabledCount}/${totalCount}`;

      return (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard>
            <CardHeaderWrapper>
              <ModuleTitleWrapper>
                <ModuleTitle>{module}</ModuleTitle>
              </ModuleTitleWrapper>
              <CountBadge>{permissionCountText}</CountBadge>
            </CardHeaderWrapper>
            <PermissionListWrapper>
              {renderPermissionItems(module)}
            </PermissionListWrapper>
            <CardFooterWrapper>
              <OutlineButton
                fullWidth
                variant="outlined"
                onClick={() => handleEnableAll(module)}
              >
                Enable All
              </OutlineButton>

              <OutlineButton
                fullWidth
                variant="outlined"
                onClick={() => handleDisableAll(module)}
              >
                Disable All
              </OutlineButton>
            </CardFooterWrapper>
          </StyledCard>
        </Grid>
      );
    });
  };

  const handleCancel = () => {
    navigate("/role-management");
  };

  return (
    <>
      <LoadingContainer />
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <CommonPageHeader title="Add Permission" subtitle="Role details" />
          </HeaderWrapper>
          <TopFieldsWrapper>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CommonTextField
                  label="Role Name"
                  value={roleData?.name}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CommonTextField
                  label="Description"
                  value={roleData?.description}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
          </TopFieldsWrapper>
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              {renderPermissionCards()}
            </Grid>
          </Grid>
          <FooterWrapper>
            <FooterCancelButton variant="outlined" onClick={handleCancel}>
              Cancel
            </FooterCancelButton>
            <FooterSaveButton variant="contained" onClick={handleSave}>
              Save
            </FooterSaveButton>
          </FooterWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default AddPermission;
