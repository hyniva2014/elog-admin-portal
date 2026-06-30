import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { useServices } from "../../../services/services";
import RoleCard from "./RoleCard";
import RoleManagementForm from "./RoleManagementForm";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonLoading from "../../../common/CommonLoading";
import AccessControl from "../../../common/AccessControl";
import CommonSnackbar from "../../../common/CommonSnackbar";
import { usePermissions } from "@src/hooks/usePermissions";
import { usePermissionRefresh } from "@src/hooks/usePermissionRefresh";
import {
  fetchRolesApi,
  fetchRoleByIdApi,
  saveRoleApi,
} from "./RolePermissionsApi";
import AuditLogModal from "./AuditLogModal";
import {
  Container,
  Header,
  Title,
  Subtitle,
  AddButton,
  CancelEditButton,
  FormEditButton,
} from "./RoleManagement.styled";
import { PageContainer } from "../../../common/PageContainer";
import { formatDateTime } from "../../../common/CommonUtils";

const RoleManagement = () => {
  const { fetchApi, createApi } = useServices();
  const theme = useTheme();
  const { setLoading, LoadingContainer } = CommonLoading();
  const { checkPermission } = usePermissions();
  const { refreshPermissions } = usePermissionRefresh();
  const dispatch = useDispatch();

  const loginDetails = useSelector(
    (state) => state.loginSlice.loginDetails || {},
  );

  const canView = checkPermission("Roles Overview", "ROLE_OVERVIEW_VIEW");

  const canViewAll = checkPermission(
    "Roles Overview",

    "ROLE_OVERVIEW_VIEW_ALL",
  );

  const canCreate = checkPermission("Roles Overview", "ROLE_OVERVIEW_CREATE");
  const canUpdate = checkPermission("Roles Overview", "ROLE_OVERVIEW_UPDATE");
  const canDelete = checkPermission("Roles Overview", "ROLE_OVERVIEW_DELETE");

  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);
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
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [auditLogData, setAuditLogData] = useState({
    rows: [],
    total: 0,
    page: 1,
    pageSize: 10,
    isLoading: false,
  });
  const [selectedRoleId, setSelectedRoleId] = useState(null);
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

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const apiRoles = await fetchRolesApi(fetchApi);
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
      const roleDetails = await fetchRoleByIdApi(fetchApi, roleId);
      setDefaultValues({
        id: roleDetails?.id,
        title: roleDetails?.name || "",
        description: roleDetails?.description || "",
        status: roleDetails?.status,
      });

      setIsEditMode(true);
      setIsEditing(false);
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

      const response = await saveRoleApi(createApi, payload);

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

  const handleEnableEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const transformAuditLogData = useCallback(
    (records) => {
      return records.map((record) => {
        const { date, time } = formatDateTime(record.created_at);

        return {
          createdBy: record.created_by || "-",
          createdDate: date,
          createdTime: time,
          notes: record.description || "-",
        };
      });
    },

    [formatDateTime],
  );

  const handleOpenAuditLog = useCallback(
    async (role) => {
      setLoading(true);
      setSelectedRoleId(role.id);

      try {
        const { page, pageSize } = auditLogData;
        const endUrl = `/masteradmin/roles/audit-logs?role_id=${role.id}&page=${page}&limit=${pageSize}`;
        const response = await fetchApi(endUrl);
        if (response?.statusCode === 200 && response?.body?.audit_logs) {
          const auditLogs = response?.body?.audit_logs;
          const records = Array.isArray(auditLogs) ? auditLogs : [auditLogs];
          const pagination = response?.body?.pagination;
          const transformedData = transformAuditLogData(records);
          setAuditLogData({
            rows: transformedData,
            total: pagination?.total_records || 0,
            page: pagination?.current_page || 1,
            pageSize: pagination?.limit || 10,
            isLoading: false,
          });
        } else {
          setAuditLogData({
            rows: [],
            total: 0,
            page: 1,
            pageSize: 10,
            isLoading: false,
          });
        }
      } catch (err) {
        console.error("Error fetching audit log:", err);

        setAuditLogData({
          rows: [],
          total: 0,
          page: 1,
          pageSize: 10,
          isLoading: false,
        });
      } finally {
        setLoading(false);
        setIsAuditLogOpen(true);
      }
    },

    [fetchApi, setLoading, auditLogData.page, auditLogData.pageSize],
  );

  const handleCloseAuditLog = useCallback(() => {
    setIsAuditLogOpen(false);
    setAuditLogData({
      rows: [],
      total: 0,
      page: 1,
      pageSize: 10,
      isLoading: false,
    });
    setSelectedRoleId(null);
  }, []);

  useEffect(() => {
    if (isAuditLogOpen && selectedRoleId) {
      handleOpenAuditLog({ id: selectedRoleId });
    }
  }, [
    auditLogData.page,
    auditLogData.pageSize,
    isAuditLogOpen,
    selectedRoleId,
    handleOpenAuditLog,
  ]);

  const roleCards = roles.map((role) => {
    const roleData = {
      id: role.id,
      title: role.name,
      description: role.description,
      users: role.user_count,
      status: role.status === 1 ? "Active" : "Inactive",
      color: theme.palette.brand.main,
      roleIds: role.role_ids || String(role.id),
    };

    return (
      <RoleCard
        key={role.id}
        role={roleData}
        onEdit={handleRoleEdit}
        onOpenAuditLog={handleOpenAuditLog}
        canView={canView}
        canUpdate={canUpdate}
      />
    );
  });

  const pageTitle = isEditMode ? "Edit Role" : "Add Role";

  const submitButtonLabel = isEditMode ? "Update" : "Save";

  const headerActions = isEditMode ? (
    !isEditing ? (
      <FormEditButton
        variant="outlined"
        onClick={handleEnableEdit}
        size="small"
      >
        Edit
      </FormEditButton>
    ) : (
      <CancelEditButton
        variant="outlined"
        onClick={handleCancelEdit}
        size="small"
      >
        Cancel Edit
      </CancelEditButton>
    )
  ) : null;

  const disableSubmit = isEditMode && !isEditing;

  return (
    <>
      <LoadingContainer />

      <AccessControl hasAccess={canViewAll}>
        <PageContainer>
          <Header>
            <Box>
              <Title variant="inherit">Roles Overview</Title>

              <Subtitle>
                Quick view of all roles and their access levels
              </Subtitle>
            </Box>

            <AddButton
              variant="contained"
              onClick={handleAddRole}
              disabled={!canCreate}
            >
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
            isEditing={isEditing}
            disableSubmit={disableSubmit}
            headerActions={headerActions}
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

          <AuditLogModal
            open={isAuditLogOpen}
            onClose={handleCloseAuditLog}
            auditData={auditLogData}
            setAuditData={setAuditLogData}
          />
        </PageContainer>
      </AccessControl>
    </>
  );
};

export default RoleManagement;
