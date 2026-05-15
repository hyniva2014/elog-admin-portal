import React from "react";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonTextField from "../../../common/CommonTextField";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";

const schema = yup.object().shape({
  selectAccount: yup.string().required("Account is required"),
  userProfile: yup.string().required("User Profile is required"),
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

const UserManagementForm = ({
  open,
  onClose,
  onSubmitForm,
  loading = false,
  mode = "add",
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      account: "",
      userProfile: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);

    if (onSubmitForm) {
      onSubmitForm(data);
    }

    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleAccountChange = (value) => {
    setValue("selectAccount", value, { shouldValidate: true });
  };

  const handleUserProfileChange = (value) => {
    setValue("userProfile", value, { shouldValidate: true });
  };

  const formContent = (
    <Box
      component="form"
      id="user-management-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CommonAutocompleteDropdown
            name="selectAccount"
            label="Select Account"
            value=""
            options={[
              {
                label: "Swift Transportation",
                value: "Swift Transportation",
              },
              {
                label: "J.B. Hunt",
                value: "J.B. Hunt",
              },
              {
                label: "Knight Transportation",
                value: "Knight Transportation",
              },
            ]}
            onChange={handleAccountChange}
            error={!!errors.selectAccount}
            helperText={errors.selectAccount?.message}
            required
          />
        </Grid>

        {/* User Profile */}
        <Grid item xs={12}>
          <CommonAutocompleteDropdown
            name="userProfile"
            label="User Profile"
            value=""
            options={[
              {
                label: "Admin",
                value: "Admin",
              },
              {
                label: "Super Admin",
                value: "Super Admin",
              },
              {
                label: "User",
                value: "User",
              },
            ]}
            onChange={handleUserProfileChange}
            error={!!errors.userProfile}
            helperText={errors.userProfile?.message}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="firstName"
            label="First Name"
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="lastName"
            label="Last Name"
            control={control}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="email"
            label="Enter Email"
            register={register}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CommonTextField
            name="password"
            label="Enter Password"
            fullWidth
            autoComplete="new-password"
            register={register}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
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
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <CommonDialogForm
      open={open}
      title={mode === "edit" ? "Edit User" : "Add User"}
      content={formContent}
      formId="user-management-form"
      onCancel={handleCancel}
      loading={loading}
      mode={mode}
      submitButtonText={mode === "edit" ? "Update User" : "Add User"}
      maxWidth="sm"
    />
  );
};

export default UserManagementForm;
