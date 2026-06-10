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

const SimpleAlertCardItem = ({ item }) => (
  <AlertCard>
    <AlertAccentBar />
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
          <AlertDetailItem>
            <AlertIcon src={IdIcon} alt="ID" />
            -
          </AlertDetailItem>
        </AlertDetailRow>

        <AlertTime>{item.date || item.time}</AlertTime>
      </AlertDetails>
    </AlertContent>
  </AlertCard>
);

export default SimpleAlertCardItem;
