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

import {
  ACTION_BUTTONS,
  getDriverDeviceInfo,
  getTriggerInfo,
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

const DriverInfoCardItem = ({ label, value, isStatus }) => {
  const content = isStatus ? (
    <StatusBadge>{value}</StatusBadge>
  ) : (
    <InfoValue>{value}</InfoValue>
  );

  return (
    <InfoCard>
      <InfoLabel>{label}</InfoLabel>
      {content}
    </InfoCard>
  );
};

const LocationContentItem = ({ primaryLocation, location2 }) => {
  const secondaryLocation = location2 ? (
    <>
      <AlertIcon src={LocationIcon} alt="Location" />
      <CoordinateBadge>{location2}</CoordinateBadge>
    </>
  ) : null;

  return (
    <>
      <AlertIcon src={LocationIcon} alt="Location" />
      <CoordinateBadge>{primaryLocation}</CoordinateBadge>
      {secondaryLocation}
    </>
  );
};

const TriggerInfoCardItem = ({ label, value }) => (
  <TriggerInfoCard>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </TriggerInfoCard>
);

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

  const triggerInfo = getTriggerInfo();

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
          {driverInfo.map(({ label, value, isStatus }) => (
            <DriverInfoCardItem
              key={label}
              label={label}
              value={value}
              isStatus={isStatus}
            />
          ))}

          <InfoCard>
            <InfoLabel>Current Location</InfoLabel>

            <LocationItem>
              <LocationContentItem
                primaryLocation={primaryLocation}
                location2={location2}
              />
            </LocationItem>
          </InfoCard>
        </InfoGrid>
      </InfoSection>

      <TriggerSection>
        <TriggerSectionTitle>Trigger Information</TriggerSectionTitle>

        <TriggerInfoGrid>
          {triggerInfo.map(({ label, value }) => (
            <TriggerInfoCardItem
              key={label}
              label={label}
              value={value}
            />
          ))}
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
