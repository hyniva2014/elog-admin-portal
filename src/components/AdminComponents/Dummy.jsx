import CommonSummaryCardGroup from "../../common/CommonSummaryCardGroup";
import { PageContainer } from "./component.styled";


import DevicesIcon from "@mui/icons-material/Devices";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const summaryCards = [
  {
    id: "total_devices",
    title: "Total Devices",
    value: "1,095",
    accentcolor: "#284495",
    icon: (
      <DevicesIcon
        sx={{
          fontSize: 28,
          color: "#284495",
        }}
      />
    ),
  },
  {
    id: "online_devices",
    title: "Online Devices",
    value: "1,077",
    accentcolor: "#008236",
    icon: (
      <WifiIcon
        sx={{
          fontSize: 28,
          color: "#008236",
        }}
      />
    ),
  },
  {
    id: "offline_devices",
    title: "Offline Devices",
    value: "18",
    accentcolor: "#FF0000",
    icon: (
      <WifiOffIcon
        sx={{
          fontSize: 28,
          color: "#FF0000",
        }}
      />
    ),
  },
  {
    id: "unassigned_devices",
    title: "Unassigned Devices",
    value: "34",
    accentcolor: "#E69500",
    icon: (
      <Inventory2OutlinedIcon
        sx={{
          fontSize: 28,
          color: "#E69500",
        }}
      />
    ),
  },
];

const Dummy = () => {
      return (
        <>
        <PageContainer>
          <CommonSummaryCardGroup cards={summaryCards} showAccentBar={false} />
          </PageContainer>
        </>
      );
}

export default Dummy;