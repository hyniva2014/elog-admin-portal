import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useServices } from "../../../services/services";
import RoleCard from "./RoleCard";
import RoleManagementForm from "./RoleManagementForm";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonLoading from "../../../common/CommonLoading";
import CommonSnackbar from "../../../common/CommonSnackbar";
import {
  Container,
  Header,
  Title,
  Subtitle,
  AddButton,
  COLORS,
} from "./RoleManagement.styled";

const RoleManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { loading, setLoading, LoadingContainer } = CommonLoading();
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    description: "",
    status: 1,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

  // ---------------- Fetch Roles ----------------

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const response = await fetchApi(
        "/masteradmin/role/get-roles?is_superuser=1",
      );

      const apiRoles = response?.body?.Roles || [];

      setRoles(apiRoles);
    } catch (error) {
      console.error("Fetch Roles Error:", error);

      handleSnackbar("Failed to fetch roles", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleById = async (roleId) => {
    try {
      setLoading(true);

      const response = await fetchApi(
        `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
      );

      const roleDetails = response?.body?.Roles;

      setDefaultValues({
        id: roleDetails?.id,

        title: roleDetails?.name || "",

        description: roleDetails?.description || "",

        status: roleDetails?.status,
      });

      setIsEditMode(true);

      setIsEditing(true);

      setOpenDialog(true);
    } catch (error) {
      console.error("Fetch Role By Id Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = useCallback(() => {
    setIsEditMode(false);

    setIsEditing(true);

    setDefaultValues({
      title: "",

      description: "",

      status: 1,
    });

    setOpenDialog(true);
  }, []);

  const handleEditRole = useCallback(async (role) => {
    await fetchRoleById(role.id);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);

    setIsEditMode(false);

    setIsEditing(false);

    setDefaultValues({
      title: "",

      description: "",

      status: 1,
    });
  }, []);

  const handleSaveRole = async (formValues) => {
    try {
      setLoading(true);

      const payload = {
        is_superuser: 1,

        name: formValues.title,

        description: formValues.description,

        is_system_role: false,

        status: formValues.status ?? 1,
      };

      if (formValues.id) {
        payload.role_id = formValues.id;
      }

      const response = await createApi(
        payload,
        "/masteradmin/roles/create-or-update-role",
      );

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        handleSnackbar(
          formValues.id
            ? "Role updated successfully"
            : "Role created successfully",

          "success",
        );

        setOpenDialog(false);

        fetchRoles();
      } else {
        handleSnackbar(
          response?.body?.message || "Something went wrong",

          "warning",
        );
      }
    } catch (error) {
      console.error("Create/Update Role Error:", error);

      handleSnackbar("Unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleEdit = useCallback(
    (role) => {
      handleEditRole(role);
    },
    [handleEditRole],
  );

  const roleCards = roles.map((role) => {
    const roleData = {
      id: role.id,
      title: role.name,
      description: role.description,
      users: role.user_count,
      status: role.status === 1 ? "Active" : "Inactive",
      color: COLORS.primary,
    };

    return <RoleCard key={role.id} role={roleData} onEdit={handleRoleEdit} />;
  });

  const pageTitle = isEditMode ? "Edit Role" : "Add Role";

  const submitButtonLabel = isEditMode ? "Update" : "Save";

  return (
    <>
      <LoadingContainer />
      <Container>
        <Header>
          <Box>
            <Title>Roles Overview</Title>
            <Subtitle>Quick view of all roles and their access levels</Subtitle>
          </Box>
          <AddButton variant="contained" onClick={handleAddRole}>
            Add Role
          </AddButton>
        </Header>
        <Box>{roleCards}</Box>
        <CommonDialogForm
          open={openDialog}
          onCancel={handleCloseDialog}
          onClose={handleCloseDialog}
          title={pageTitle}
          formId="role-form"
          submitButtonText={submitButtonLabel}
          content={
            <RoleManagementForm
              formId="role-form"
              defaultValues={defaultValues}
              isEditMode={isEditMode}
              isEditing={isEditing}
              onSubmit={handleSaveRole}
            />
          }
        />
        <CommonSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Container>
    </>
  );
};

export default RoleManagement;
