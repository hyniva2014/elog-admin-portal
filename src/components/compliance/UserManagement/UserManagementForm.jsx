import { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import { FormContainer } from "./UserManagementForm.styled";
import { USER_PROFILE_OPTIONS } from "./Constants";
import { EditHeaderButton } from "./UserManagementForm.styled";

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
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const editSchema = yup.object().shape({
  company_id: yup.string().required("Account is required"),
  role_id: yup.string().required("User Profile is required"),
  status_id: yup.string().required("Status is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup.string().optional(),
  confirmPassword: yup.string().optional(),
});

const EMPTY_DEFAULTS = {
  company_id: "",
  role_id: "",
  status_id: "1",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const rowToFormValues = (row) => ({
  company_id: row?.company_id ? String(row.company_id) : "",
  role_id: row?.role_id ? String(row.role_id) : "",
  status_id: row?.status_id ? String(row.status_id) : "1",
  firstName: row?.firstName || "",
  lastName: row?.lastName || "",
  email: row?.primaryContactEmail || row?.email || "",
  password: "",
  confirmPassword: "",
});

const UserManagementForm = ({
  open,
  onClose,
  onSubmitForm,
  loading = false,
  mode = "add",
  initialData = null,
  companyOptions = [],
}) => {
  const isViewMode = mode === "view";

  // Internal editing state — only relevant when mode === "view"
  const [isEditing, setIsEditing] = useState(false);

  // The effective read-only state
  const isReadOnly = isViewMode && !isEditing;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(isViewMode ? editSchema : addSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  // Populate / clear form whenever the dialog opens
  useEffect(() => {
    if (!open) return;
    if (isViewMode && initialData) {
      reset(rowToFormValues(initialData));
    } else {
      reset(EMPTY_DEFAULTS);
    }
    // Always start in read mode when the dialog opens
    setIsEditing(false);
  }, [open, isViewMode, initialData, reset]);

  const handleFormSubmit = (data) => {
    const submitMode = isViewMode && isEditing ? "edit" : mode;
    if (onSubmitForm) onSubmitForm(data, submitMode);
  };

  /** Close the dialog entirely */
  const handleClose = () => {
    reset(EMPTY_DEFAULTS);
    setIsEditing(false);
    onClose();
  };

  /** Cancel edit — restore original values, go back to read mode */
  const handleCancelEdit = () => {
    if (initialData) reset(rowToFormValues(initialData));
    setIsEditing(false);
  };

  const handleAccountChange = (value) =>
    setValue("company_id", value, { shouldValidate: true });

  const handleUserProfileChange = (value) =>
    setValue("role_id", value, { shouldValidate: true });

  const handleStatusChange = (value) =>
    setValue("status_id", value, { shouldValidate: true });

  const handleEditClick = useCallback(() => setIsEditing(true), []);

  // Edit button shown in the dialog header (next to close icon)
  const editHeaderButton = isViewMode && !isEditing && (
    <EditHeaderButton
      size="small"
      variant="contained"
      onClick={handleEditClick}
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
            options={USER_PROFILE_OPTIONS}
            onChange={handleUserProfileChange}
            error={!!errors.role_id}
            helperText={errors.role_id?.message}
            required={!isReadOnly}
            disabled={isReadOnly}
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

        {/* Password fields — only shown when adding a new user */}
        {!isViewMode && (
          <>
            <Grid item xs={12}>
              <CommonTextField
                name="password"
                label="Enter Password"
                type="password"
                fullWidth
                autoComplete="new-password"
                register={register}
                error={!!errors.password}
                helperText={errors.password?.message}
                required
                shrinkLabel={!!watch("password")}
              />
            </Grid>

            <Grid item xs={12}>
              <CommonTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                register={register}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                required
                shrinkLabel={!!watch("confirmPassword")}
              />
            </Grid>
          </>
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
      onCancel={isEditing ? handleCancelEdit : handleClose}
      loading={loading}
      mode={isEditing ? "edit" : mode}
      submitButtonText={submitButtonText}
      headerActions={editHeaderButton}
      maxWidth="sm"
      isEditing={isEditing}
    />
  );
};

export default UserManagementForm;
