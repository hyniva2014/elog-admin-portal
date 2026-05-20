// import { useState } from "react";
// import {
//   AlertCard,
//   AlertCardTitle,
//   AlertContent,
//   AlertDetailItem,
//   AlertDetailRow,
//   AlertDetails,
//   AlertIcon,
//   AlertList,
//   AlertTime,
//   AlertsContainer,
//   DetailSection,
//   DetailHeader,
//   DetailTitle,
//   BadgeContainer,
//   Badge,
//   InfoSection,
//   SectionTitle,
//   InfoGrid,
//   InfoCard,
//   InfoLabel,
//   InfoValue,
//   StatusBadge,
//   ActionSection,
//   ActionButton,
//   LocationItem,
//   CoordinateBadge,
//   AlertTopRow,
//   AlertRight,
//   AlertStatus,
//   AlertOpen,
//   ELDTag,
//   LocationRow,
//   TriggerSection,
//   TriggerInfoCard,
//   AlertCardContainer,
//   DetailTitleWrapper,
//   DetailSubTitle,
// } from "./AlertCenterScreenCard.styles";
// import CarrierIcon from "../../../../assets/images/active/Icon-1.png";
// import LocationIcon from "../../../../assets/images/active/Icon-3.png";
// import DeviceIcon from "../../../../assets/images/active/Icon-4.png";
// import TruckIcon from "../../../../assets/images/active/Truck.png";
// import TimeIcon from "../../../../assets/images/active/ti.png";
// import HOS from "../../../../assets/images/active/Hos.png";
// import { Grid } from "@mui/material";
// import { AlertAccentBar } from "../AlertCenter.styles";

// const AlertCenterScreenCards = ({ alerts = [] }) => {
//   const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null);

//   const handleAlertSelect = (alert) => {
//     setSelectedAlert(alert);
//   };

//   return (
//     <AlertsContainer>
//       <Grid container spacing={0}>
//         <Grid item xs={12} md={6}>
//           <AlertCardContainer>
//             <AlertList>
//               {alerts.map((item, index) => (
//                 <AlertCard
//                   key={index}
//                   accentcolor={item.color}
//                   active={selectedAlert === item}
//                 >
//                   <AlertAccentBar accentcolor={item.color} />
//                   <AlertContent>
//                     {/* top section */}
//                     <AlertTopRow>
//                       <AlertCardTitle>{item.title}</AlertCardTitle>

//                       <AlertRight>
//                         <AlertStatus>{item.severity}</AlertStatus>

//                         {item.role === "ELD" ? (
//                           <AlertOpen
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleAlertSelect(item);
//                             }}
//                           >
//                             Open
//                           </AlertOpen>
//                         ) : item.role === "System" ? (
//                           <AlertOpen
//                             sx={{ color: "#D97706" }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleAlertSelect(item);
//                             }}
//                           >
//                             in-progress
//                           </AlertOpen>
//                         ) : item.role === "Admin" ? null : null}
//                       </AlertRight>
//                     </AlertTopRow>

//                     {/* company/truck/device */}
//                     <AlertDetailRow>
//                       <AlertDetailItem>
//                         <AlertIcon src={CarrierIcon} />
//                         {item.company}
//                       </AlertDetailItem>

//                       <AlertDetailItem>
//                         <AlertIcon src={TruckIcon} />
//                         {item.truck}
//                       </AlertDetailItem>

//                       <AlertDetailItem>
//                         <AlertIcon src={DeviceIcon} />
//                         {item.serial}
//                       </AlertDetailItem>

//                       <ELDTag>{item.role}</ELDTag>
//                     </AlertDetailRow>

//                     {/* location row */}

//                     <LocationRow>
//                       <AlertDetailItem>
//                         <AlertIcon src={LocationIcon} />
//                         {item.location1 || item.city}
//                       </AlertDetailItem>

//                       <AlertDetailItem>
//                         <AlertIcon src={item.time ? TimeIcon : LocationIcon} />
//                         {item.location2 || item.time}
//                       </AlertDetailItem>
//                     </LocationRow>
//                   </AlertContent>
//                 </AlertCard>
//               ))}
//             </AlertList>
//           </AlertCardContainer>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           {/* Right Side - Detail View */}
//           {selectedAlert && (
//             <AlertCardContainer>
//               {/* Header with Title and Badges */}
//               <DetailHeader>
//                 <AlertDetailItem mt={2}>
//                   <AlertIcon src={HOS} sx={{ height: 24, width: 24 }} />
//                   <DetailTitleWrapper>
//                     <DetailTitle>
//                       {selectedAlert.title || selectedAlert.message}
//                     </DetailTitle>

//                     <DetailSubTitle>
//                       {selectedAlert.subTitle || "Critical"}
//                     </DetailSubTitle>
//                   </DetailTitleWrapper>
//                 </AlertDetailItem>
//               </DetailHeader>

//               {/* Device Information Section */}
//               <InfoSection>
//                 <SectionTitle>Driver & Device Information</SectionTitle>
//                 <InfoGrid>
//                   <InfoCard>
//                     <InfoLabel>Driver Name</InfoLabel>
//                     <InfoValue>Sarah Johnson</InfoValue>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Driver Status</InfoLabel>
//                     <StatusBadge>Active</StatusBadge>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Carrier Name</InfoLabel>
//                     <InfoValue>{selectedAlert.company}</InfoValue>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Device ID</InfoLabel>
//                     <InfoValue>DEV-8921</InfoValue>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Truck Number</InfoLabel>
//                     <InfoValue>{selectedAlert.truck}</InfoValue>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Route</InfoLabel>
//                     <InfoValue>US-75 South</InfoValue>
//                   </InfoCard>
//                   <InfoCard>
//                     <InfoLabel>Current Location</InfoLabel>
//                     <LocationItem>
//                       <AlertIcon src={LocationIcon} alt="Location" />
//                       <CoordinateBadge>
//                         {selectedAlert.location1 || selectedAlert.city || null}
//                       </CoordinateBadge>
//                       <AlertIcon
//                         src={selectedAlert.location2 ? LocationIcon : null}
//                         alt="Location"
//                       />
//                       <CoordinateBadge>
//                         {selectedAlert.location2 || null}
//                       </CoordinateBadge>
//                     </LocationItem>
//                   </InfoCard>
//                 </InfoGrid>
//               </InfoSection>

//               {/* Trigger Information Section */}
//               <TriggerSection>
//                 <SectionTitle
//                 sx={{ marginLeft: '0px'}}
//                 >
//                   Trigger Information
//                 </SectionTitle>
//                 <InfoGrid style={{ gridTemplateColumns: "1fr 1fr" }}>
//                   <TriggerInfoCard sx>
//                     <InfoLabel>Alert Source</InfoLabel>
//                     <InfoValue>ELD Device</InfoValue>
//                   </TriggerInfoCard>
//                   <TriggerInfoCard>
//                     <InfoLabel>Trigger Event</InfoLabel>
//                     <InfoValue>Device Connection Lost</InfoValue>
//                   </TriggerInfoCard>
//                 </InfoGrid>
//               </TriggerSection>

//               {/* Action Buttons */}
//               <ActionSection>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6} md={6}>
//                     <ActionButton fullWidth variant="Outlined">
//                       Acknowledge
//                     </ActionButton>
//                   </Grid>
//                   <Grid item xs={6} md={6}>
//                     <ActionButton fullWidth variant="Outlined">
//                       Assign Operator
//                     </ActionButton>
//                   </Grid>
//                   <Grid item xs={6} md={6}>
//                     <ActionButton fullWidth variant="Outlined">
//                       Escalate
//                     </ActionButton>
//                   </Grid>
//                   <Grid item xs={6} md={6}>
//                     <ActionButton fullWidth variant="Outlined">
//                       Resolve
//                     </ActionButton>
//                   </Grid>
//                 </Grid>
//               </ActionSection>
//             </AlertCardContainer>
//           )}
//         </Grid>
//       </Grid>
//     </AlertsContainer>
//   );
// };

// export default AlertCenterScreenCards;

import { useState } from "react";
import { Grid } from "@mui/material";

import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";

import { AlertsContainer } from "./AlertCenterScreenCard.styles";

const AlertCenterScreenCards = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  return (
    <AlertsContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <AlertListPanel
            alerts={alerts}
            selectedAlert={selectedAlert}
            handleAlertSelect={setSelectedAlert}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AlertDetailsPanel selectedAlert={selectedAlert} />
        </Grid>
      </Grid>
    </AlertsContainer>
  );
};

export default AlertCenterScreenCards;