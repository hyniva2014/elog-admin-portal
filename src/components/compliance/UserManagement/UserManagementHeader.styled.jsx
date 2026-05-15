import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const AddUserButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
