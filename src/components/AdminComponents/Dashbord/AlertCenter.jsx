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
  AlertCardTitle,
  AlertDetails,
  AlertDetailRow,
  AlertDetailItem,
  AlertTime,
  AlertIcon,
} from "./AlertCenter.styles";
import CarrierIcon from "../../../assets/images/active/Icon-1.png";
import LocationIcon from "../../../assets/images/active/Icon-3.png";
import DeviceIcon from "../../../assets/images/active/Icon-4.png";
import TruckIcon from "../../../assets/images/active/Truck.png";
import { useNavigate } from "react-router-dom";



const AlertCardItem = ({ item }) => (
  <AlertCard>
    <AlertAccentBar accentcolor={item.color} />
    <AlertContent>
      <AlertDetails>
        <AlertCardTitle>{item.title || item.message}</AlertCardTitle>

        <AlertDetailRow>
          <AlertDetailItem>
            <AlertIcon src={CarrierIcon} alt="Carrier" />
            {item.company}
          </AlertDetailItem>
          <AlertDetailItem>
            <AlertIcon src={TruckIcon} alt="Truck" />
            {item.truck}
          </AlertDetailItem>
          <AlertDetailItem>
            <AlertIcon src={DeviceIcon} alt="Device" />
            {item.serial}
          </AlertDetailItem>
        </AlertDetailRow>

        <AlertDetailRow>
          <AlertDetailItem>
            <AlertIcon src={LocationIcon} alt="Location" />
            {item.location1}
          </AlertDetailItem>
          <AlertDetailItem>
            <AlertIcon src={LocationIcon} alt="Location" />
            {item.location2}
          </AlertDetailItem>
        </AlertDetailRow>

        <AlertTime>{item.date || item.time}</AlertTime>
      </AlertDetails>
    </AlertContent>
  </AlertCard>
);

const AlertCenter = ({
  title = "Alert Center",
  viewAllText = "View All",
  alerts = [],
}) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/alert-center");
  };

  return (
    <AlertContainer elevation={0}>
      <Box>
        <AlertHeader>
          <AlertTitle>{title}</AlertTitle>
          <ViewAllText onClick={handleViewAll}>{viewAllText}</ViewAllText>
        </AlertHeader>

        <AlertList>
          {alerts.map((item) => (
            <AlertCardItem key={item.id} item={item} />
          ))}
        </AlertList>
      </Box>
    </AlertContainer>
  );
};

export default AlertCenter;
