import { Typography, useTheme, Box } from "@mui/material";
import { AccentBar, ContentWrapper, SummaryCardRoot } from "./CommonSummaryCard.styled";

// import {
//   SummaryCardRoot,
//   AccentBar,
//   ContentWrapper,
// } from "./CommonSummaryCard.styles";

const CommonSummaryCard = ({
  title,
  value,
  accentcolor,
  icon,
  showAccentBar = true,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <SummaryCardRoot>
      {showAccentBar && <AccentBar accentcolor={accentcolor} />}

      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        {icon && icon}
      </Box>

      <ContentWrapper>
        <Typography
          variant="inherit"
          fontSize={14}
          fontWeight={400}
          color={isDark ? "#FFFFFF" : "#202020"}
        >
          {title}
        </Typography>

        {/* Value */}
        <Typography
          variant="inherit"
          fontSize={22}
          fontWeight={500}
          color={isDark ? "#FFFFFF" : "#2C2C2C"}
        >
          {value}
        </Typography>
      </ContentWrapper>
    </SummaryCardRoot>
  );
};

export default CommonSummaryCard;
