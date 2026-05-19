import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddUserButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
