import { Typography, useTheme, Box } from "@mui/material";
import { AccentBar, ContentWrapper, SummaryCardRoot } from "./CommonSummaryCard.styled";


const CommonSummaryCard = ({
  title,
  value,
  accentcolor,
  icon,
  showAccentBar = true,
  layout = "default",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <SummaryCardRoot>
      {showAccentBar && <AccentBar accentcolor={accentcolor} />}

      {layout === "dashboard" ? (
        <ContentWrapper>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              {icon && icon}

              <Typography
                variant="inherit"
                fontSize={14}
                fontWeight={400}
                color={isDark ? "#FFFFFF" : "#202020"}
              >
                {title}
              </Typography>
            </Box>

            {/* Value in next line */}
            <Typography
              variant="inherit"
              fontSize={44}
              fontWeight={700}
              lineHeight={1}
              color={isDark ? "#FFFFFF" : "#111827"}
            >
              {value}
            </Typography>
          </Box>
        </ContentWrapper>
      ) : (
        <>
          <ContentWrapper>
            <Box display="flex" alignItems="flex-start" gap={1}>
              {icon && icon}

              <Box display="flex" flexDirection="column">
                {/* Title */}
                <Typography
                  variant="inherit"
                  fontSize={14}
                  fontWeight={400}
                  color={isDark ? "#FFFFFF" : "#202020"}
                >
                  {title}
                </Typography>

                {/* Value below title */}
                <Typography
                  variant="inherit"
                  fontSize={22}
                  fontWeight={500}
                  color={isDark ? "#FFFFFF" : "#2C2C2C"}
                >
                  {value}
                </Typography>
              </Box>
            </Box>
          </ContentWrapper>
        </>
      )}
    </SummaryCardRoot>
  );
};

export default CommonSummaryCard;
