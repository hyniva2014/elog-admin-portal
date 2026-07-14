import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import { FormContainer } from "./UserManagementForm.styled";
import { EditHeaderButton } from "./UserManagementForm.styled";
import { useServices } from "../../../services/services";
import { CARRIER_ADMIN_ROLE_ID } from "./Constants";
import { hasPermission } from "../../../utils/permissionUtils";

const STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

const addSchema = yup.object().shape({
  company_id: yup.string().required("Account is required"),
  role_id: yup.string().required("User Profile is required"),

  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
});

const editSchema = yup.object().shape({
  company_id: yup.string().required("Account is required"),
  role_id: yup.string().required("User Profile is required"),
  status_id: yup.string().required("Status is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
});

const EMPTY_DEFAULTS = {
  company_id: "",
  role_id: "",
  status_id: "1",
  firstName: "",
  lastName: "",
  email: "",
};

const rowToFormValues = (row) => ({
  company_id: row?.company_id ? String(row.company_id) : "",
  role_id: row?.role_id ? String(row.role_id) : "",
  status_id: row?.status_id ? String(row.status_id) : "1",
  firstName: row?.firstName || "",
  lastName: row?.lastName || "",
  email: row?.primaryContactEmail || row?.email || "",
});

const UserManagementForm = ({
  open,
  onClose,
  onSubmitForm,
  loading = false,
  mode = "add",
  initialData = null,
  companyOptions = [],
  isEditing,
  setIsEditing,
  onDirtyChange,
}) => {
  const { fetchApi } = useServices();
  const [roleOptions, setRoleOptions] = useState([]);
  const initializedRef = useRef(false);

  const isViewMode = mode === "view";

  // Internal editing state — only relevant when mode === "view"
  // const [isEditing, setIsEditing] = useState(false);
  const loginPermissions = useSelector(
    (state) => state.loginSlice.permissions || {},
  );

  const rolePermissions = useSelector(
    (state) => state.rolePermissions?.permissions || {},
  );

  const permissions =
    Object.keys(rolePermissions).length > 0
      ? rolePermissions
      : loginPermissions;

  const canUpdate = hasPermission(
    permissions,
    "Carrier Users",
    "CARRIER_USER_UPDATE",
  );

  // The effective read-only state
  const isReadOnly = isViewMode && !isEditing;

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(isViewMode ? editSchema : addSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetchApi(
        "/masteradmin/roles/get-all-superusers-roles",
      );
      if (response?.body?.roles) {
        const options = response.body.roles.map((r) => ({
          label: r.role_name,
          value: String(r.role_id),
        }));
        setRoleOptions(options);
        return response.body.roles;
      }
      return [];
    } catch (err) {
      console.error("Failed to fetch roles", err);
      setRoleOptions([]);
      return [];
    }
  }, [fetchApi]);

  useEffect(() => {
    if (!open) {
      initializedRef.current = false;
      return;
    }

    const initForm = async () => {
      const roles = await fetchRoles();
      const carrierAdmin = roles?.find(
        (r) => r.role_name.trim() === "Carrier Admin",
      );
      const carrierAdminId = carrierAdmin
        ? String(carrierAdmin.role_id)
        : CARRIER_ADMIN_ROLE_ID;

      if (isViewMode && initialData) {
        const currentRoleId = String(initialData.role_id || "");
        const currentRoleName = initialData.userProfile || "Carrier Admin";
        const roleExists = roles.some(
          (r) => String(r.role_id) === currentRoleId,
        );

        if (currentRoleId && !roleExists) {
          setRoleOptions((prev) => [
            ...prev,
            { label: currentRoleName, value: currentRoleId },
          ]);
        }

        reset(rowToFormValues(initialData));
      } else {
        reset({
          ...EMPTY_DEFAULTS,
          role_id: carrierAdminId,
        });
      }
      setIsEditing(false);
      initializedRef.current = true;
    };

    initForm();
  }, [open, mode, initialData]);

  useLayoutEffect(() => {
    if (open && !isViewMode) {
      reset(EMPTY_DEFAULTS);
    }
  }, [open, mode, reset, isViewMode]);

  const handleFormSubmit = (data) => {
    const submitMode = isViewMode && isEditing ? "edit" : mode;
    if (onSubmitForm) onSubmitForm(data, submitMode);
  };

  const handleClose = () => {
    onClose();
  };

  // const handleCancelEdit = () => {
  //   if (initialData) reset(rowToFormValues(initialData));
  //   setIsEditing(false);
  // };

  const handleAccountChange = useCallback(
    (value) =>
      setValue("company_id", value, {
        shouldValidate: true,
        shouldDirty: true,
      }),
    [setValue],
  );

  const handleUserProfileChange = useCallback(
    (value) =>
      setValue("role_id", value, {
        shouldValidate: true,
        shouldDirty: true,
      }),
    [setValue],
  );

  const handleStatusChange = useCallback(
    (value) =>
      setValue("status_id", value, {
        shouldValidate: true,
        shouldDirty: true,
      }),
    [setValue],
  );

  useEffect(() => {
    if (!isEditing && initialData && open) {
      reset(rowToFormValues(initialData));
    }
  }, [isEditing, initialData, open, reset]);

  const handleEditClick = useCallback(() => setIsEditing(true), []);

  const companyId = watch("company_id");

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchRoles = async () => {
  //     if (!companyId) {
  //       setRoleOptions((prev) => (prev.length === 0 ? prev : []));
  //       return;
  //     }
  //     try {
  //       const response = await fetchApi(`/admin/user/get-roles?company_id=${companyId}`);
  //       if (!isMounted) return;

  //       let roles = [];
  //       if (response?.body?.Roles) {
  //         roles = response.body.Roles;
  //       } else if (response?.body?.data) {
  //         roles = response.body.data;
  //       } else if (response?.data) {
  //         roles = response.data;
  //       } else if (Array.isArray(response?.body)) {
  //         roles = response.body;
  //       } else if (Array.isArray(response)) {
  //         roles = response;
  //       }

  //       const options = roles.map((r) => ({
  //         label: r.role_name || r.name || r.roleName || r.label || "Unknown",
  //         value: String(r.role_id || r.id || r.value || ""),
  //       }));

  //       setRoleOptions(options);
  //     } catch (err) {
  //       console.error("Failed to fetch roles", err);
  //       if (isMounted) {
  //         setRoleOptions((prev) => (prev.length === 0 ? prev : []));
  //       }
  //     }
  //   };
  //   fetchRoles();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [companyId, fetchApi]);

  // Edit button shown in the dialog header (next to close icon)
  const editHeaderButton = isViewMode && !isEditing && (
    <EditHeaderButton
      size="small"
      variant="contained"
      onClick={handleEditClick}
      disabled={!canUpdate}
    >
      Edit
    </EditHeaderButton>
  );

  const formContent = (
    <FormContainer
      component="form"
      id="user-management-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CommonAutocompleteDropdown
            name="company_id"
            label="Select Account"
            value={watch("company_id")}
            options={companyOptions}
            onChange={handleAccountChange}
            error={!!errors.company_id}
            helperText={errors.company_id?.message}
            required={!isReadOnly}
            disabled={isReadOnly}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonAutocompleteDropdown
            name="role_id"
            label="User Profile"
            value={watch("role_id")}
            options={roleOptions}
            onChange={handleUserProfileChange}
            error={!!errors.role_id}
            helperText={errors.role_id?.message}
            required={true}
            disabled={true}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="firstName"
            label="First Name"
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            required={!isReadOnly}
            disabled={isReadOnly}
            shrinkLabel={!!watch("firstName")}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="lastName"
            label="Last Name"
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            required={!isReadOnly}
            disabled={isReadOnly}
            shrinkLabel={!!watch("lastName")}
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="email"
            label="Enter Email"
            register={register}
            error={!!errors.email}
            helperText={errors.email?.message}
            required={!isReadOnly}
            disabled={isReadOnly}
            shrinkLabel={!!watch("email")}
          />
        </Grid>
        {isViewMode && (
          <Grid item xs={12}>
            <CommonAutocompleteDropdown
              name="status_id"
              label="Status"
              value={watch("status_id")}
              options={STATUS_OPTIONS}
              onChange={handleStatusChange}
              error={!!errors.status_id}
              helperText={errors.status_id?.message}
              required={!isReadOnly}
              disabled={isReadOnly}
            />
          </Grid>
        )}
      </Grid>
    </FormContainer>
  );

  // Dialog title
  const dialogTitle = isViewMode
    ? isEditing
      ? "Edit User"
      : "View User"
    : "Add User";

  // Submit button label — null hides the entire footer in read-only view
  const submitButtonText = isReadOnly
    ? null
    : isViewMode
      ? "Update User"
      : "Add User";

  return (
    <CommonDialogForm
      open={open}
      title={dialogTitle}
      content={formContent}
      formId="user-management-form"
      onClose={handleClose}
      onCancel={handleClose}
      loading={loading}
      mode={isEditing ? "edit" : mode}
      submitButtonText={submitButtonText}
      headerActions={editHeaderButton}
      maxWidth="sm"
      isEditing={isEditing}
      disableSubmit={isEditing && !isDirty}
    />
  );
};

export default UserManagementForm;
