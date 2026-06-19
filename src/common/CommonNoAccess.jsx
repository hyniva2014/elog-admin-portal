import { Box, Typography } from "@mui/material";
import {
  NoAccessWrapperSx,
  NoAccessSubtitleSx,
  NoAccessTitleSx,
} from "./CommonNoAccess.styled";

const CommonNoAccess = ({ height = "80vh", message = "No Access" }) => (
  <Box sx={NoAccessWrapperSx(height)}>
    <Typography variant="inherit" sx={NoAccessTitleSx}>🚫 {message}</Typography>
    <Typography variant="inherit" sx={NoAccessSubtitleSx}>
      You don’t have permission to view this page
    </Typography>
  </Box>
);

export default CommonNoAccess;