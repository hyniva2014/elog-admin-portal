import DevicesIcon from "@mui/icons-material/Devices";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { Box, Grid } from "@mui/material";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { PageContainer } from "../component.styled";
import CarrierGrowthTrend from "./CarrierGrowthTrend";
import CommonAlertCenter from "./AlertCenter";
import { HeaderContainer, HeaderSubtitle, HeaderTitle } from "./AlertCenter.styles";
import IncidentDistribution from "./IncidentDistribution";
import DeviceLifecycleStatus from "../../compliance/DeviceManagement/DeviceLifecycleStatus";
import ActiveDevicesIcon from "../../../assets/images/Active Devices.png";
import FMCSA from "../../../assets/images/Avg FMCSA Score.png";

const AdminDashboard = () => {
  return (
    <>
      <PageContainer>
        <HeaderContainer>
          <HeaderTitle variant="h4">Dashboard</HeaderTitle>

          <HeaderSubtitle variant="h6">
            Overview of platform operations and key metrics
          </HeaderSubtitle>
        </HeaderContainer>
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

        <Grid container spacing={2} alignItems="stretch" sx={{ mt: 2 }}>
          <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
            <IncidentDistribution />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
            <DeviceLifecycleStatus />
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
    id: "total_carriers",
    title: "Total Carriers",
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
    id: "active_devices",
    title: "Active Devices",
    value: "1,077",
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
      <WifiOffIcon
        sx={{
          //     fontSize: 18,
          color: "#FF0000",
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
