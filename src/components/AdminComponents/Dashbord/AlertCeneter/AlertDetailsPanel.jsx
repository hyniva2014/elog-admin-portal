import {
  AlertDetailItem,
  AlertIcon,
  AlertCardContainer,
  DetailHeader,
  DetailTitleWrapper,
  DetailTitle,
  DetailSubTitle,
  InfoSection,
  SectionTitle,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
  LocationItem,
  CoordinateBadge,
  TriggerSection,
  TriggerInfoCard,
  ActionSection,
  ActionButton,
} from "./AlertCenterScreenCard.styles";

import HOS from "../../../../assets/images/active/Hos.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";

import { Grid } from "@mui/material";

const AlertDetailsPanel = ({ selectedAlert }) => {
  return (
    <AlertCardContainer>
      <DetailHeader>
        <AlertDetailItem mt={2}>
          <AlertIcon src={HOS} sx={{ height: 24, width: 24 }} />

          <DetailTitleWrapper>
            <DetailTitle>
              {selectedAlert.title || selectedAlert.message}
            </DetailTitle>

            <DetailSubTitle>
              {selectedAlert.subTitle || "Critical"}
            </DetailSubTitle>
          </DetailTitleWrapper>
        </AlertDetailItem>
      </DetailHeader>

      <InfoSection>
        <SectionTitle>Driver & Device Information</SectionTitle>

        <InfoGrid>
          <InfoCard>
            <InfoLabel>Driver Name</InfoLabel>
            <InfoValue>Sarah Johnson</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Driver Status</InfoLabel>
            <StatusBadge>Active</StatusBadge>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Carrier Name</InfoLabel>
            <InfoValue>{selectedAlert.company}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Device ID</InfoLabel>
            <InfoValue>DEV-8921</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Truck Number</InfoLabel>
            <InfoValue>{selectedAlert.truck}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Route</InfoLabel>
            <InfoValue>US-75 South</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoLabel>Current Location</InfoLabel>

            <LocationItem>
              <AlertIcon src={LocationIcon} />

              <CoordinateBadge>
                {selectedAlert.location1 || selectedAlert.city}
              </CoordinateBadge>

              {selectedAlert.location2 && (
                <>
                  <AlertIcon src={LocationIcon} />

                  <CoordinateBadge>{selectedAlert.location2}</CoordinateBadge>
                </>
              )}
            </LocationItem>
          </InfoCard>
        </InfoGrid>
      </InfoSection>

      <TriggerSection>
        <SectionTitle sx={{ marginLeft: "0px" }}>
          Trigger Information
        </SectionTitle>

        <InfoGrid
          style={{
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <TriggerInfoCard>
            <InfoLabel>Alert Source</InfoLabel>
            <InfoValue>ELD Device</InfoValue>
          </TriggerInfoCard>

          <TriggerInfoCard>
            <InfoLabel>Trigger Event</InfoLabel>
            <InfoValue>Device Connection Lost</InfoValue>
          </TriggerInfoCard>
        </InfoGrid>
      </TriggerSection>

      <ActionSection>
        <Grid container spacing={2}>
          {["Acknowledge", "Assign Operator", "Escalate", "Resolve"].map(
            (btn) => (
              <Grid item xs={6} key={btn}>
                <ActionButton fullWidth variant="outlined">
                  {btn}
                </ActionButton>
              </Grid>
            ),
          )}
        </Grid>
      </ActionSection>
    </AlertCardContainer>
  );
};

export default AlertDetailsPanel;
