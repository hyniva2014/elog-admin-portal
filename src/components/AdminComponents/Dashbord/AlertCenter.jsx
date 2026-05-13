import { Box } from "@mui/material";
import {
  AlertContainer,
  AlertHeader,
  AlertTitle,
  ViewAllText,
  AlertList,
  AlertCard,
  AlertAccentBar,
  AlertContent,
  AlertLeftContent,
  AlertSeverity,
  AlertMessage,
  AlertTime,
} from "./AlertCenter.styles";

const CommonAlertCenter = ({
  title = "Alert Center",
  viewAllText = "View All",
  alerts = [],
  onViewAll,
}) => {
  return (
    <AlertContainer elevation={0}>
      <Box>
        <AlertHeader>
          <AlertTitle>{title}</AlertTitle>

          <ViewAllText onClick={onViewAll}>{viewAllText}</ViewAllText>
        </AlertHeader>

        <AlertList>
          {alerts.map((item, index) => (
            <AlertCard key={index}>
              <AlertAccentBar accentcolor={item.color} />

              <AlertContent>
                <AlertLeftContent>
                  <AlertSeverity>{item.severity}</AlertSeverity>

                  <AlertMessage>{item.message}</AlertMessage>
                </AlertLeftContent>

                <AlertTime>{item.time}</AlertTime>
              </AlertContent>
            </AlertCard>
          ))}
        </AlertList>
      </Box>
    </AlertContainer>
  );
};

export default CommonAlertCenter;
