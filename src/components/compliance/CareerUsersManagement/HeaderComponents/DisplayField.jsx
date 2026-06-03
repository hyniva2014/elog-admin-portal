import { Box, Typography } from "@mui/material";
import {
  DisplayFieldContainerSx,
  DisplayFieldLabelSx,
  DisplayFieldValueSx,
} from "./DisplayField.styled";

const getDisplayValue = (value) => {
  if (typeof value === "string" || typeof value === "number") return value;
  return value?.label || "-";
};

const DisplayField = ({ label, value }) => {
  return (
    <Box sx={DisplayFieldContainerSx}>
      <Typography sx={DisplayFieldLabelSx}>{label}</Typography>

      <Typography sx={DisplayFieldValueSx}>{getDisplayValue(value)}</Typography>
    </Box>
  );
};

export default DisplayField;
