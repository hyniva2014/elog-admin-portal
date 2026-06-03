import { Box, Typography } from "@mui/material";
import {
  NoAccessWrapperSx,
  NoAccessSubtitleSx,
  NoAccessTitleSx,
} from "./CommonNoAccess.styled";

const CommonNoAccess = ({ height = "80vh", message = "No Access" }) => (
  <Box sx={NoAccessWrapperSx(height)}>
    <Typography sx={NoAccessTitleSx}>🚫 {message}</Typography>
    <Typography sx={NoAccessSubtitleSx}>
      You don’t have permission to view this page
    </Typography>
  </Box>
);

export default CommonNoAccess;