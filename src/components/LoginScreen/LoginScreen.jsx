import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  Box,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PageMetaData } from "@src/components";
import CommonSnackbar from "@src/common/CommonSnackbar";
import { useAuthContext } from "@src/states";
import logo from "@src/assets/images/logo.png";
import TruckLogo from "@src/assets/images/TruckLogo.png";
import { useServices } from "@src/services/services";
import { setLoginDetails, setLoginPermissions } from "./Loginstore/Login.slice";
import {
  FieldContainer,
  FieldLabel,
  FooterBottomText,
  FooterText,
  HeaderRow,
  inputStyle,
  LoginCard,
  LoginSubText,
  LoginTitleText,
  LoginWrapper,
  LogoRow,
  ResetText,
  RowBetween,
  SignInButton,
} from "./LoginScreenstyled";
import CommonLoading from "../../common/CommonLoading";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  // truckId: yup.string().required("Company Code is required"),
});

const forgotEmailSchema = yup.object().shape({
  forgotEmail: yup
    .string()
    .email("Enter valid email")
    .required("Email is required"),
});

const resetSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits")
    .required("OTP is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { saveSession } = useAuthContext();
  const { loading, setLoading, LoadingContainer } = CommonLoading();
  const { createApi } = useServices();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [truckId, setTruckId] = useState("");
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isDisableSaveButton = !touched.username || !touched.password;

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    if (
      location.state?.logoutSuccess ||
      sessionStorage.getItem("logoutSuccess") === "true"
    ) {
      showSnackbar("Logout Successful !", "success");
      sessionStorage.removeItem("logoutSuccess");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
    // if (field === "truckId") setTruckId(value);

    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate({ username, password }, { abortEarly: false });
      setErrors({});
      setLoading(true);

      const response = await createApi(
        { user_name: username, password },
        "/admin/user/login",
      );

      if (response?.statusCode === 200) {
        const expiryTime = Date.now() + 30 * 60 * 1000;
        const token = response?.body?.data?.token;
        const permissions = response?.body?.data?.permissions || {};

        if (token) {
          localStorage.setItem("token", token);
        }

        localStorage.setItem("permissions", JSON.stringify(permissions));
        dispatch(setLoginPermissions(permissions));
        dispatch(
          setLoginDetails({
            ...response,
            expiryTime,
          }),
        );

        if (token) {
          saveSession({
            token,
            permissions,
            userdetails: response?.body?.data?.userdetails,
          });
        }
        navigate(location.state?.from?.pathname || "/dashboard");
      } else if (response) {
        showSnackbar(
          response?.body?.message || "Invalid username or password",
          "error",
        );
      } else {
        showSnackbar(
          "Network error. Please check your internet connection.",
          "error",
        );
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((item) => {
          formErrors[item.path] = item.message;
        });
        setErrors(formErrors);
        return;
      }

      if (!navigator.onLine) {
        showSnackbar(
          "No internet connection. Please check your network.",
          "error",
        );
      } else {
        showSnackbar("Something went wrong. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      await forgotEmailSchema.validate({ forgotEmail }, { abortEarly: false });
      setErrors({});
      setLoading(true);

      const response = await createApi(
        { user_name: forgotEmail },
        "/user/send-otp",
      );

      if (response?.statusCode === 200) {
        showSnackbar("OTP Sent Successfully", "success");
        setForgotStep(2);
      } else {
        showSnackbar(response?.body?.message || "Unable to send OTP", "error");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((item) => {
          formErrors[item.path] = item.message;
        });
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      await resetSchema.validate(
        { otp, newPassword, confirmPassword },
        { abortEarly: false },
      );
      setErrors({});
      setLoading(true);

      const response = await createApi(
        {
          user_name: forgotEmail,
          otp,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        "/user/reset-password",
      );

      const apiMessage = response?.body?.message || "Password reset successful";

      if (response?.statusCode === 200) {
        showSnackbar(apiMessage, "success");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setForgotEmail("");
        setForgotStep(1);
        setIsForgotPassword(false);
      } else {
        showSnackbar(apiMessage, "error");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((item) => {
          formErrors[item.path] = item.message;
        });
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !isForgotPassword &&
      !loading &&
      !isDisableSaveButton
    ) {
      handleLogin();
    }
  };

  const resetForgotPasswordState = () => {
    setIsForgotPassword(false);
    setForgotStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <>
      <PageMetaData title="Login" />
      <LoginWrapper>
        <LoadingContainer />
        <LogoRow>
          <img
            src={TruckLogo}
            alt="E-Log"
            style={{ width: 400, filter: "brightness(0) invert(1)" }}
          />
        </LogoRow>

        <LoginCard onKeyDown={handleKeyDown}>
          <CardContent>
            {!isForgotPassword ? (
              <>
                <LoginTitleText>Sign into TrackPulse</LoginTitleText>
                <HeaderRow>
                  <LockOutlinedIcon fontSize="small" />
                  <LoginSubText>Authorized access only</LoginSubText>
                </HeaderRow>

                <FieldContainer>
                  <FieldLabel>Email Address</FieldLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter your email address"
                    value={username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={inputStyle}
                  />
                </FieldContainer>

                <FieldContainer>
                  <FieldLabel>Password</FieldLabel>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldContainer>

                {/* <FieldContainer>
                  <FieldLabel>TrackPulse ID / Company Code</FieldLabel>
                  <TextField
                    fullWidth
                    placeholder="TrackPulse ID / Company Code"
                    value={truckId}
                    onChange={(e) => handleChange("truckId", e.target.value)}
                    error={!!errors.truckId}
                    helperText={errors.truckId}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LeaderboardOutlinedIcon sx={{ color: "#9ca3af" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldContainer> */}

                <RowBetween>
                  <FieldLabel sx={{ mb: 0 }}>Remember This Device</FieldLabel>
                  <Link
                    underline="hover"
                    fontSize={14}
                    fontWeight={600}
                    color="#284495"
                    component="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setErrors({});
                    }}
                  >
                    Forgot password?
                  </Link>
                </RowBetween>

                <SignInButton
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  disabled={loading || isDisableSaveButton}
                >
                  {loading ? "Signing in..." : "Secure Sign In"}
                </SignInButton>
              </>
            ) : forgotStep === 1 ? (
              <>
                <ResetText>Reset Password</ResetText>
                <LoginSubText sx={{ mb: 2 }}>
                  Please enter your registered email address and we will send
                  you an OTP to verify your identity.
                </LoginSubText>

                <FieldContainer>
                  <FieldLabel>Email Address</FieldLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter your email address"
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, forgotEmail: "" }));
                    }}
                    helperText={errors.forgotEmail}
                    error={!!errors.forgotEmail}
                    sx={inputStyle}
                  />
                </FieldContainer>

                <RowBetween>
                  <Box />
                  <Link
                    underline="hover"
                    fontSize={14}
                    fontWeight={600}
                    color="#284495"
                    component="button"
                    onClick={resetForgotPasswordState}
                  >
                    Back to Login
                  </Link>
                </RowBetween>

                <SignInButton
                  fullWidth
                  onClick={handleSendOtp}
                  disabled={loading || !forgotEmail}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </SignInButton>
              </>
            ) : (
              <>
                <ResetText>Verify OTP</ResetText>
                <LoginSubText sx={{ mb: 2 }}>
                  Please enter the OTP that was sent to your email to reset your
                  password.
                </LoginSubText>

                <FieldContainer>
                  <FieldLabel>OTP</FieldLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter 4 digit number"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 4) setOtp(value);
                      setErrors((prev) => ({ ...prev, otp: "" }));
                    }}
                    error={!!errors.otp}
                    helperText={errors.otp}
                    sx={inputStyle}
                  />
                </FieldContainer>

                <FieldContainer>
                  <FieldLabel>New Password</FieldLabel>
                  <TextField
                    fullWidth
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, newPassword: "" }));
                    }}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldContainer>

                <FieldContainer>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <TextField
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldContainer>

                <RowBetween>
                  <Link
                    underline="hover"
                    fontSize={14}
                    fontWeight={600}
                    color="#284495"
                    component="button"
                    onClick={() => {
                      setForgotStep(1);
                      setOtp("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setErrors({});
                    }}
                  >
                    Back
                  </Link>
                  <Link
                    underline="hover"
                    fontSize={14}
                    fontWeight={600}
                    color="#284495"
                    component="button"
                    onClick={resetForgotPasswordState}
                  >
                    Back to Login
                  </Link>
                </RowBetween>

                <SignInButton
                  fullWidth
                  onClick={handleResetPassword}
                  disabled={loading || !otp || !newPassword || !confirmPassword}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </SignInButton>
              </>
            )}
          </CardContent>
        </LoginCard>

        <Box textAlign="center" mt={4}>
          <FooterText>
            System activity is monitored and logged. Unauthorized access is
            prohibited.
          </FooterText>
          <FooterBottomText>
            Privacy Policy | Terms & Conditions
          </FooterBottomText>
        </Box>
      </LoginWrapper>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default LoginScreen;
