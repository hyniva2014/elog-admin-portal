import { Box } from "@mui/material";
import CommonSummaryCard from "./CommonSummaryCard";

const CommonSummaryCardGroup = ({
  cards = [],
  showAccentBar = true,
  layout = "dashboard",
}) => {
  if (!cards.length) return null;

  return (
    <Box
      mb={2}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(auto-fit, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {cards.map((card) => (
        <CommonSummaryCard
          key={card.id}
          title={card.title}
          value={card.value}
          accentcolor={card.accentcolor}
          icon={card.icon}
          showAccentBar={showAccentBar}
          layout={layout}
          showViewAll={card.showViewAll}
          onViewAll={card.onViewAll}
        />
      ))}
    </Box>
  );
};

export default CommonSummaryCardGroup;
