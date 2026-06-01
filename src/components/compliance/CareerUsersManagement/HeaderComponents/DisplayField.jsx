import { Box, Typography } from "@mui/material";
import {
  DisplayFieldContainerSx,
  DisplayFieldLabelSx,
  DisplayFieldValueSx,
} from "../DisplayField.styled";

const DisplayField = ({ label, value }) => {
  return (
    <Box sx={DisplayFieldContainerSx}>
      <Typography sx={DisplayFieldLabelSx}>{label}</Typography>

      <Typography sx={DisplayFieldValueSx}>
        {typeof value === "string" || typeof value === "number"
          ? value
          : value?.label || "-"}
      </Typography>
    </Box>
  );
};

export default DisplayField;