import { Box, Typography } from "@mui/material";
import {
  DateBlockContainerSx,
  DateBlockValueSx,
  DateBlockLabelSx,
} from "./DateBlock.styled";

const DateBlock = ({ label, value, highlight }) => {
  return (
    <Box sx={DateBlockContainerSx}>
      <Typography variant="inherit" sx={DateBlockValueSx(highlight)}>
        {value}
      </Typography>
      <Typography variant="inherit" sx={DateBlockLabelSx}>
        {label}
      </Typography>
    </Box>
  );
};

export default DateBlock;
