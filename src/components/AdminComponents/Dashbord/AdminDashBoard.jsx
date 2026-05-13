import DevicesIcon from "@mui/icons-material/Devices";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Grid } from "@mui/material";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { PageContainer } from "../component.styled";
import CarrierGrowthTrend from "./CarrierGrowthTrend";
import CommonAlertCenter from "./AlertCenter";

const AdminDashboard = () => {
  return (
    <>
      <PageContainer>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={false}
          layout="dashboard"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <CarrierGrowthTrend
              title="Carrier Growth Trend"
              data={chartData}
              dataKey="value"
              xAxisKey="month"
              lineColor="#2563EB"
              tooltipKeys={[
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
              ]}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <CommonAlertCenter
              title="Alert Center"
              alerts={alerts}
              onViewAll={() => console.log("View All")}
            />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default AdminDashboard;

// Staic Data

const summaryCards = [
  {
    id: "total_devices",
    title: "Total Devices",
    value: "1,095",
    accentcolor: "#284495",
    icon: (
      <DevicesIcon
        sx={{
          //     fontSize: 18,
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
          //     fontSize: 18,
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
          //     fontSize: 18,
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
          //     fontSize: 18,
          color: "#E69500",
        }}
      />
    ),
  },
];

const chartData = [
  {
    month: "Jan",
    value: 45,
    newAddition: 20,
    loss: 10,
  },
  {
    month: "Feb",
    value: 52,
    newAddition: 25,
    loss: 12,
  },
  {
    month: "Mar",
    value: 60,
    newAddition: 30,
    loss: 15,
  },
  {
    month: "Apr",
    value: 78,
    newAddition: 35,
    loss: 14,
  },
];

const alerts = [
  {
    severity: "Critical",
    message: "5 devices offline for Swift Transportation",
    time: "2 min ago",
    color: "#EF4444",
  },
  {
    severity: "Warning",
    message: "Failed onboarding for account ACC-240176",
    time: "15 min ago",
    color: "#F59E0B",
  },
  {
    severity: "Escalated",
    message: "Incident #INC-2301 requires attention",
    time: "30 min ago",
    color: "#F59E0B",
  },
  {
    severity: "Info",
    message: "12 new devices assigned today",
    time: "1 hour ago",
    color: "#3B82F6",
  },
];
