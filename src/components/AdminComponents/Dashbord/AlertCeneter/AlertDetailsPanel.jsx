import { useCallback } from "react";
import { Grid } from "@mui/material";
import {
  AlertDetailItem,
  AlertIcon,
  DetailAlertIcon,
  AlertCardContainer,
  DetailHeader,
  DetailTitleWrapper,
  DetailTitle,
  DetailSubTitle,
  InfoSection,
  SectionTitle,
  TriggerSectionTitle,
  InfoGrid,
  TriggerInfoGrid,
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
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";
import LocationIcon from "../../../../assets/images/active/Icon-3.png";

const ACTION_BUTTONS = ["Acknowledge", "Assign Operator", "Escalate", "Resolve"];

const AlertActionButton = ({ label }) => {
  const handleClick = useCallback(() => {
    // TODO: wire up action handler per button label
  }, []);

  return (
    <Grid item xs={6}>
      <ActionButton fullWidth variant="outlined" onClick={handleClick}>
        {label}
      </ActionButton>
    </Grid>
  );
};

const AlertDetailsPanel = ({ selectedAlert }) => {
  if (!selectedAlert) return null;

  return (
    <AlertCardContainer detailsPanel>
      <DetailHeader>
        <AlertDetailItem mt={2}>
          <DetailAlertIcon src={HOS} alt="Alert type icon" />

          <DetailTitleWrapper>
            <DetailTitle>
              {selectedAlert.title || selectedAlert.message}
            </DetailTitle>

            <DetailSubTitle>
              {selectedAlert.severity || "Critical"}
            </DetailSubTitle>
          </DetailTitleWrapper>
        </AlertDetailItem>
      </DetailHeader>

      <InfoSection>
        <SectionTitle>Driver &amp; Device Information</SectionTitle>

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
              <AlertIcon src={LocationIcon} alt="Location" />

              <CoordinateBadge>
                {selectedAlert.location1 || selectedAlert.city}
              </CoordinateBadge>

              {selectedAlert.location2 && (
                <>
                  <AlertIcon src={LocationIcon} alt="Location" />
                  <CoordinateBadge>{selectedAlert.location2}</CoordinateBadge>
                </>
              )}
            </LocationItem>
          </InfoCard>
        </InfoGrid>
      </InfoSection>

      <TriggerSection>
        <TriggerSectionTitle>Trigger Information</TriggerSectionTitle>

        <TriggerInfoGrid>
          <TriggerInfoCard>
            <InfoLabel>Alert Source</InfoLabel>
            <InfoValue>ELD Device</InfoValue>
          </TriggerInfoCard>

          <TriggerInfoCard>
            <InfoLabel>Trigger Event</InfoLabel>
            <InfoValue>Device Connection Lost</InfoValue>
          </TriggerInfoCard>
        </TriggerInfoGrid>
      </TriggerSection>

      <ActionSection>
        <Grid container spacing={2}>
          {ACTION_BUTTONS.map((label) => (
            <AlertActionButton key={label} label={label} />
          ))}
        </Grid>
      </ActionSection>
    </AlertCardContainer>
  );
};

export default AlertDetailsPanel;
