import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useServices } from "../../../services/services";
import CommonLoading from "../../../common/CommonLoading";
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  TopFieldsWrapper,
  RoleNameWrapper,
  DescriptionWrapper,
  CardsWrapper,
  FooterWrapper,
  CancelButton,
  SaveButton,
  CardHeader,
  PermissionCard,
  CardContentWrapper,
  CountBadge,
  PermissionsWrapper,
  PermissionsList,
  PermissionItem,
  PermissionTitle,
  PermissionDescription,
  StyledSwitch,
  StyledDivider,
  CardFooter,
  FooterActionButton,
  ModuleTitle,
} from "./RolePermissions.styled";

import CommonTextField from "../../../common/CommonTextField";
import CommonSnackbar from "../../../common/CommonSnackbar";
import PermissionCardItem from "./PermissionCardItem";

const RolePermissions = () => {
  const { roleId } = useParams();

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const [roleData, setRoleData] = useState(null);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [permissionState, setPermissionState] = useState({});

  const roleName = roleData?.name || "-";
  const roleDescription = roleData?.description || "-";
  
  useEffect(() => {
    let isMounted = true;

    const fetchRoleData = async () => {
      if (!roleId) {
        return;
      }

      try {
        setLoading(true);

        const response = await fetchApi(
          `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
        );

        if (!isMounted) {
          return;
        }

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

        const switchState = {};

        Object.keys(grouped || {}).forEach((module) => {
          switchState[module] = grouped[module].map(
            (permission) => permission.is_enabled === 1,
          );
        });

        setPermissionState(switchState);
      } catch (error) {
        console.error("Fetch Role Error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRoleData();

    return () => {
      isMounted = false;
    };
  }, [roleId]);

  const handleToggle = (module, permissionIndex) => {
    setPermissionState((prev) => {
      const updated = {
        ...prev,
      };
      updated[module][permissionIndex] = !updated[module][permissionIndex];
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
      const enabledPermissions = [];
      const disabledPermissions = [];
      Object.keys(groupedPermissions).forEach((module) => {
        groupedPermissions[module]?.forEach((permission, idx) => {
          if (permissionState[module]?.[idx]) {
            enabledPermissions.push(permission.id);
          } else {
            disabledPermissions.push(permission.id);
          }
        });
      });

      const payload = {
        role_id: Number(roleId),
        is_superuser: 1,
        enabled_permission_ids: enabledPermissions,
        disabled_permission_ids: disabledPermissions,
      };

      const response = await createApi(
        payload,
        "/masteradmin/roles/sync-permissions",
      );

      if (response?.statusCode === 200) {
        handleSnackbar(
          response?.body?.message || "Role permissions updated successfully",
          "success",
        );

        setTimeout(() => {
          navigate("/role-management");
        }, 1500);
      } else {
        handleSnackbar(
          response?.body?.message || "Something went wrong",
          "warning",
        );
      }
    } catch (error) {
      console.error("Save Permission Error:", error);

      handleSnackbar("Failed to update permissions", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

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
    [],
  );

  const getDisableAllHandler = useCallback(
    (module) => () => {
      handleDisableAll(module);
    },
    [],
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
        <PageTitle>Add Permission</PageTitle>

        <PageSubtitle>Role details</PageSubtitle>

        <TopFieldsWrapper>
          <RoleNameWrapper>
            <CommonTextField
              label="Enter Role Name"
              value={roleName}
              disabled
              fullWidth
            />
          </RoleNameWrapper>

          <DescriptionWrapper>
            <CommonTextField
              label="Description"
              value={roleDescription}
              disabled
              fullWidth
            />
          </DescriptionWrapper>
        </TopFieldsWrapper>

        <CardsWrapper>
          <Grid container spacing={3}>
            {permissionCards}
          </Grid>
        </CardsWrapper>

        <FooterWrapper>
          <CancelButton variant="outlined" onClick={handleCancel}>
            Cancel
          </CancelButton>

          <SaveButton variant="contained" onClick={handleSave}>
            Save
          </SaveButton>
        </FooterWrapper>
      </PageWrapper>
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default RolePermissions;
