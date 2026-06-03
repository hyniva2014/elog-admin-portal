import { Box, Divider, Typography } from "@mui/material";
import {
  FormSectionContainerSx,
  FormSectionHeaderSx,
  FormSectionContentSx,
  FormSectionTitleSx,
  FormSectionSubtitleSx,
} from "./FormSection.styled";

const FormSectionSubtitle = ({ subtitle }) => {
  if (!subtitle) return null;

  return (
    <Typography variant="caption" sx={FormSectionSubtitleSx}>
      {subtitle}
    </Typography>
  );
};

const FormSection = ({
  title,
  subtitle,
  children,
  padding = 2.5,
  contentPadding,
  id,
}) => {
  return (
    <Box id={id} sx={FormSectionContainerSx}>
      <Box sx={FormSectionHeaderSx}>
        <Typography sx={FormSectionTitleSx}>{title}</Typography>
        <FormSectionSubtitle subtitle={subtitle} />
      </Box>
      <Divider />
      <Box sx={FormSectionContentSx(contentPadding ?? padding)}>{children}</Box>
    </Box>
  );
};

export default FormSection;
