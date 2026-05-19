import React from "react";
import { CardIcon } from "./AdminDashBoard.styles";
import ActiveDevicesIcon from "../../../assets/images/Active Devices.png";
import FMCSA from "../../../assets/images/Avg FMCSA Score.png";
import TotalCarrier from "../../../assets/images/Total Carriers.png";
import OpenIncidents from "../../../assets/images/Open Incidents.png";

export const TotalCarrierIcon = (
  <CardIcon src={TotalCarrier} alt="TotalCarrier" />
);

export const ActiveDevicesCardIcon = (
  <CardIcon src={ActiveDevicesIcon} alt="ActiveDevicesIcon" />
);

export const OpenIncidentsIcon = (
  <CardIcon src={OpenIncidents} alt="OpenIncidents" />
);

export const FMCSAIcon = (
  <CardIcon src={FMCSA} alt="FMCSA" />
);
