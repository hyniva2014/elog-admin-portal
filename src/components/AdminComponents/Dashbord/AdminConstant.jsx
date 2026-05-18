import { Box } from "@mui/material";
import ActiveDevicesIcon from "../../../assets/images/Active Devices.png";
import FMCSA from "../../../assets/images/Avg FMCSA Score.png";
import TotalCarrier from "../../../assets/images/Total Carriers.png";
import OpenIncidents from "../../../assets/images/Open Incidents.png";
import { TooltipContainer, TooltipLabel, TooltipRow, TooltipValue } from "./CarrierGrowthTrend.styled";

export const summaryCards = [
  {
    id: "total_carriers",
    title: "Total Carriers",
    value: "1095",
    accentcolor: "#284495",
    icon: (
      <Box
        component="img"
        src={TotalCarrier}
        alt="TotalCarrier"
        sx={{
          width: 24,
          height: 24,
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    id: "active_devices",
    title: "Active Devices",
    value: "1077",
    accentcolor: "#008236",
    icon: (
      <Box
        component="img"
        src={ActiveDevicesIcon}
        alt="ActiveDevicesIcon"
        sx={{
          width: 24,
          height: 24,
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    id: "open_incidents",
    title: "Open Incidents",
    value: "18",
    accentcolor: "#FF0000",
    icon: (
      <Box
        component="img"
        src={OpenIncidents}
        alt="OpenIncidents"
        sx={{
          width: 24,
          height: 24,
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    id: "avg_fmcsa_score",
    title: "Average FMCSA Score",
    value: "85.5",
    accentcolor: "#E69500",
    icon: (
      <Box
        component="img"
        src={FMCSA}
        alt="FMCSA"
        sx={{
          width: 24,
          height: 24,
          objectFit: "contain",
        }}
      />
    ),
  },
];

export const chartData = [
  {
    month: "Jan",
    value: 45,
    Total: 15,
    newAddition: 20,
    loss: 10,
  },
  {
    month: "Feb",
    value: 52,
    Total: 23,
    newAddition: 25,
    loss: 12,
  },
  {
    month: "Mar",
    value: 60,
    Total: 40,
    newAddition: 30,
    loss: 15,
  },
  {
    month: "Apr",
    value: 78,
    Total: 50,
    newAddition: 35,
    loss: 14,
  },
];

export const alerts = [
  {
    title: "ELD device Issue",
    company: "Swift Transportation",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "30.250661",
    location2: "-97.735925",
    date: "13/05/2026",
    color: "#EF4444",
  },
  {
    title: "Incident #INC-2301 requires attention",
    company: "Schneider National",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "32.345664",
    location2: "-73.834832",
    date: "03/05/2026",
    color: "#F59E0B",
  },
  {
    title: "12 new devices assigned",
    company: "Schneider National",
    truck: "TRK-256",
    serial: "SN-ABC12345",
    location1: "31.787654",
    location2: "-72.128374",
    date: "12/05/2026",
    color: "#3B82F6",
  },
];


export const TooltipKeys = [
  {
    key: "Total",
    label: "Total",
    color: "blue",
  },
  {
    key: "newAddition",
    label: "New Addition",
    color: "green",
  },
  {
    key: "loss",
    label: "Loss",
    color: "red",
  },
];




export const CustomTooltip = ({ active, payload, label, tooltipKeys }) => {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload;

    return (
      <TooltipContainer elevation={3}>
        <TooltipLabel>{label}</TooltipLabel>

        {TooltipKeys.map((item) => (
          <TooltipRow key={item.key}>
            <TooltipText>{item.label}</TooltipText>

            <TooltipValue textcolor={item.color}>
              {tooltipData[item.key]}
            </TooltipValue>
          </TooltipRow>
        ))}
      </TooltipContainer>
    );
  }

  return null;
};