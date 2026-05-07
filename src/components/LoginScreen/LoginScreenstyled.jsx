import { Box, Button, Card, Typography, styled } from "@mui/material";
import authBg from "@src/assets/images/bg-auth.jpg";

export const LoginWrapper = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "24px 16px",
  boxSizing: "border-box",
  overflowY: "auto",
  backgroundImage: `
    linear-gradient(rgba(17, 54, 130, 0.92), rgba(17, 54, 130, 0.92)),
    url(${authBg})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const LoginCard = styled(Card)(() => ({
  width: "100%",
  maxWidth: 420,
  maxHeight: "85vh",
  overflowY: "auto",
  borderRadius: 12,
  boxShadow: "0 18px 48px rgba(15, 23, 42, 0.28)",
  padding: 8,
}));

export const LogoRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
}));

export const LoginTitleText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 24,
  color: "#101828",
  marginBottom: 12,
}));

export const LoginSubText = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 16,
  color: "#4A5565",
}));

export const FieldContainer = styled(Box)(() => ({
  marginTop: 16,
}));

export const FieldLabel = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 6,
  color: "#364153",
}));

export const RowBetween = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 16,
  gap: 12,
}));

export const HeaderRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 16,
  color: "#4A5565",
}));

export const SignInButton = styled(Button)(() => ({
  marginTop: 24,
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: 10,
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: "#284495",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#1f3573",
  },
  "&.Mui-disabled": {
    backgroundColor: "#E5E7EB",
    color: "#6A7282",
  },
}));

export const FooterText = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 12,
  color: "#FFFFFF",
}));

export const FooterBottomText = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 12,
  color: "#FFFFFF",
  display: "block",
}));

export const ResetText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 24,
  color: "#101828",
  marginBottom: 12,
}));

export const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    "&:hover fieldset": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c7cbd1",
    },
  },
};
