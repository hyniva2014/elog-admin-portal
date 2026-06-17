import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const EditHeaderButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  textTransform: "none",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
  },

  "&.Mui-disabled:hover": {
    backgroundColor: theme.palette.grey[400],
  },
}));
