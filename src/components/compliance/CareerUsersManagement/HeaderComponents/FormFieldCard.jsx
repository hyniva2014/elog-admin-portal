import { Box } from "@mui/material";
import { FormFieldCardSx } from "./FormFieldCard.styled";

const FormFieldCard = ({ children }) => {
  return <Box sx={FormFieldCardSx}>{children}</Box>;
};

export default FormFieldCard;
