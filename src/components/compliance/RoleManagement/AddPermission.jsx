import React, { useCallback, useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonTextField from "../../../common/CommonTextField";
import CommonLoading from "../../../common/CommonLoading";

import { useServices } from "../../../services/services";

import PermissionCardItem from "./PermissionCardItem";

import {
  fetchRoleDetailsApi,
  syncRolePermissionsApi,
} from "./RolePermissionsApi";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  TopFieldsWrapper,
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

      const roleDetails = await fetchRoleDetailsApi(fetchApi, 1, roleId);

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

      await syncRolePermissionsApi(createApi, payload);
    } catch (error) {
      console.error("Save Permission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getToggleHandler = useCallback(
    (module, idx) => () => {
      handleToggle(module, idx);
    },
    [],
  );

  const getEnableAllHandler = useCallback(
    (module) => () => {
      handleEnableAll(module);
    },
    [groupedPermissions],
  );

  const getDisableAllHandler = useCallback(
    (module) => () => {
      handleDisableAll(module);
    },
    [groupedPermissions],
  );

  const handleCancel = () => {
    navigate("/role-management");
  };

  const permissionCards = Object.keys(groupedPermissions || {}).map(
    (module) => (
      <PermissionCardItem
        key={module}
        module={module}
        permissions={groupedPermissions[module]}
        permissionState={permissionState}
        onToggle={getToggleHandler}
        onEnableAll={getEnableAllHandler}
        onDisableAll={getDisableAllHandler}
      />
    ),
  );

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
              {permissionCards}
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
