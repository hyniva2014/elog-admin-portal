import { Box } from "@mui/material";
import {
  AlertContainer,
  ChartHeader,
  AlertTitle,
  ViewAllText,
  AlertList,
} from "./AlertCenter.styles";
import SimpleAlertCardItem from "./AlertCeneter/SimpleAlertCardItem";
import { useNavigate } from "react-router-dom";

const AlertCenter = ({
  title = "Alert Center",
  viewAllText = "View All",
  alerts = [],
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
     if (!isLoading) {
       navigate("/alert-center");
     }
  };

  return (
    <AlertContainer elevation={0}>
      <Box>
        <ChartHeader>
          <AlertTitle>{title}</AlertTitle>
          <ViewAllText onClick={handleViewAll} isLoading={isLoading}>
            {viewAllText}
          </ViewAllText>
        </ChartHeader>

        <AlertList>
          {alerts.map((item) => (
            <SimpleAlertCardItem
              key={item.id}
              item={item}
              onClick={() =>
                navigate("/alert-center", {
                  state: { notificationId: item.notification_id ?? item.id },
                })
              }
            />
          ))}
        </AlertList>
      </Box>
    </AlertContainer>
  );
};

export default AlertCenter;
