import {
  AlertCard,
  AlertCardTitle,
  AlertContent,
  AlertDetailItem,
  AlertDetailRow,
  AlertIcon,
  AlertList,
  ELDTag,
  LocationRow,
  AlertTopRow,
  AlertRight,
  AlertStatus,
  AlertOpen,
  AlertCardContainer,
} from "./AlertCenterScreenCard.styles";

import CarrierIcon from "../../../../assets/images/active/Icon-1.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";
import DeviceIcon from "../../../../assets/images/active/Icon-4.png";
import TruckIcon from "../../../../assets/images/active/Truck.png";
import TimeIcon from "../../../../assets/images/active/ti.png";
import { AlertAccentBar } from "../AlertCenter.styles";

const AlertListPanel = ({ alerts, selectedAlert, handleAlertSelect }) => {
  return (
    <AlertCardContainer>
      <AlertList>
        {alerts.map((item, index) => (
          <AlertCard
            key={index}
            accentcolor={item.color}
            active={selectedAlert === item}
            onClick={() => handleAlertSelect(item)}
          >
            <AlertAccentBar accentcolor={item.color} />

            <AlertContent>
              <AlertTopRow>
                <AlertCardTitle>{item.title}</AlertCardTitle>

                <AlertRight>
                  <AlertStatus>{item.severity}</AlertStatus>

                  {item.role !== "Admin" && (
                    <AlertOpen
                      sx={{
                        color: item.role === "System" ? "#D97706" : undefined,
                      }}
                    >
                      {item.role === "System" ? "in-progress" : "Open"}
                    </AlertOpen>
                  )}
                </AlertRight>
              </AlertTopRow>

              <AlertDetailRow>
                <AlertDetailItem>
                  <AlertIcon src={CarrierIcon} />
                  {item.company}
                </AlertDetailItem>

                <AlertDetailItem>
                  <AlertIcon src={TruckIcon} />
                  {item.truck}
                </AlertDetailItem>

                <AlertDetailItem>
                  <AlertIcon src={DeviceIcon} />
                  {item.serial}
                </AlertDetailItem>

                <ELDTag>{item.role}</ELDTag>
              </AlertDetailRow>

              <LocationRow>
                <AlertDetailItem>
                  <AlertIcon src={LocationIcon} />
                  {item.location1 || item.city}
                </AlertDetailItem>

                <AlertDetailItem>
                  <AlertIcon src={item.time ? TimeIcon : LocationIcon} />
                  {item.location2 || item.time}
                </AlertDetailItem>
              </LocationRow>
            </AlertContent>
          </AlertCard>
        ))}
      </AlertList>
    </AlertCardContainer>
  );
};

export default AlertListPanel;
