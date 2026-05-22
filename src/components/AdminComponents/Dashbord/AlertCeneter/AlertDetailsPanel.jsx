import { useCallback } from "react";
import { Grid } from "@mui/material";

import {
  AlertDetailItem,
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
  LocationItem,
  TriggerSection,
  TriggerInfoCard,
  ActionSection,
  ActionButton,
} from "./AlertCenterScreenCard.styles.jsx";

import HOS from "../../../../assets/images/active/Hos.png";

import {
  ACTION_BUTTONS,
  getDriverDeviceInfo,
  getDriverInfoCards,
  getLocationContent,
  getTriggerInfo,
  getTriggerInfoCards,
} from "./AlertDetailsPanel.utils";

const AlertActionButton = ({ label }) => {
  const handleClick = useCallback(() => {
    // TODO
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

  const {
    title,
    message,
    severity,
    company,
    truck,
    location1,
    location2,
    city,
  } = selectedAlert;

  const displayTitle = title || message;

  const displaySeverity = severity || "Critical";

  const primaryLocation = location1 || city;

  const driverInfo = getDriverDeviceInfo(company, truck);

  const driverInfoCards = getDriverInfoCards(driverInfo);

  const locationContent = getLocationContent(primaryLocation, location2);

  const actionButtons = ACTION_BUTTONS.map((label) => (
    <AlertActionButton key={label} label={label} />
  ));
  const triggerInfo = getTriggerInfo();

  const triggerInfoCards = getTriggerInfoCards(triggerInfo);

  return (
    <AlertCardContainer detailsPanel>
      <DetailHeader>
        <AlertDetailItem mt={2}>
          <DetailAlertIcon src={HOS} alt="Alert type icon" />

          <DetailTitleWrapper>
            <DetailTitle>{displayTitle}</DetailTitle>

            <DetailSubTitle>{displaySeverity}</DetailSubTitle>
          </DetailTitleWrapper>
        </AlertDetailItem>
      </DetailHeader>

      <InfoSection>
        <SectionTitle>Driver &amp; Device Information</SectionTitle>

        <InfoGrid>
          {driverInfoCards}

          <InfoCard>
            <InfoLabel>Current Location</InfoLabel>

            <LocationItem>{locationContent}</LocationItem>
          </InfoCard>
        </InfoGrid>
      </InfoSection>

      <TriggerSection>
        <TriggerSectionTitle>Trigger Information</TriggerSectionTitle>

        <TriggerInfoGrid>{triggerInfoCards}</TriggerInfoGrid>
      </TriggerSection>

      <ActionSection>
        <Grid container spacing={2}>
          {actionButtons}
        </Grid>
      </ActionSection>
    </AlertCardContainer>
  );
};

export default AlertDetailsPanel;
