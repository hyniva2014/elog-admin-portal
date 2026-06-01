import { Box, Divider, Typography } from "@mui/material";
import {
  FormSectionContainerSx,
  FormSectionHeaderSx,
  FormSectionContentSx,
} from "./FormSection.styled";

const FormSection = ({ title, subtitle, children, padding = 2.5,
  contentPadding, id,      }) => {
  return (
    <Box id={id} sx={FormSectionContainerSx}>
      <Box sx={FormSectionHeaderSx}>
        <Typography fontWeight={600} color="#2D303F">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Divider />
      <Box sx={FormSectionContentSx(contentPadding ?? padding)}>{children}</Box>
    </Box>
  );
};

export default FormSection;