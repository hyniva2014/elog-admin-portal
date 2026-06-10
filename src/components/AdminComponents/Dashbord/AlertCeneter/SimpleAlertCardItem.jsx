import {
  AlertCard,
  AlertAccentBar,
  AlertContent,
  AlertCardTitle,
  AlertDetails,
  AlertDetailRow,
  AlertDetailItem,
  AlertTime,
  AlertIcon,
} from "../AlertCenter.styles";

import CarrierIcon from "../../../../assets/images/active/Icon-1.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";
import DeviceIcon from "../../../../assets/images/active/Icon-4.png";
import TruckIcon from "../../../../assets/images/active/Truck.png";
import IdIcon from "../../../../assets/images/active/Icon-2.png";

const SimpleAlertCardItem = ({ item }) => {
  const {
    title,
    message,
    company,
    truck,
    serial,
    location1,
    location2,
    date,
    time,
  } = item;

  return (
    <AlertCard>
      <AlertAccentBar />
      <AlertContent>
        <AlertDetails>
          <AlertCardTitle>{title || message}</AlertCardTitle>

          <AlertDetailRow>
            <AlertDetailItem>
              <AlertIcon src={CarrierIcon} alt="Carrier" />
              {company}
            </AlertDetailItem>
            <AlertDetailItem>
              <AlertIcon src={TruckIcon} alt="Truck" />
              {truck}
            </AlertDetailItem>
            <AlertDetailItem>
              <AlertIcon src={DeviceIcon} alt="Device" />
              {serial}
            </AlertDetailItem>
          </AlertDetailRow>

          <AlertDetailRow>
            <AlertDetailItem>
              <AlertIcon src={LocationIcon} alt="Location" />
              {location1}
            </AlertDetailItem>
            <AlertDetailItem>
              <AlertIcon src={LocationIcon} alt="Location" />
              {location2}
            </AlertDetailItem>
            <AlertDetailItem>
              <AlertIcon src={IdIcon} alt="ID" />
              -
            </AlertDetailItem>
          </AlertDetailRow>

          <AlertTime>{date || time}</AlertTime>
        </AlertDetails>
      </AlertContent>
    </AlertCard>
  );
};

export default SimpleAlertCardItem;
