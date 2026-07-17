import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { PageContainer } from "../component.styled";
import CarrierGrowthTrend from "./CarrierGrowthTrend";
import CommonAlertCenter from "./AlertCenter";
import IncidentDistribution from "./IncidentDistribution";
import DeviceLifecycleStatus from "../../compliance/DeviceManagement/DeviceLifecycleStatus";
import AccessControl from "../../../common/AccessControl";
import {
  StretchGridContainer,
  ChartGrid,
  AlertGrid,
  IncidentGrid,
  DeviceGrid,
} from "./AdminDashBoard.styles";
import {
  HeaderContainer,
  HeaderLeft,
  ComplianceTitle,
  DateRangeText,
  HeaderSubtitle,
} from "./AlertCenter.styles";
import { Device_Metrics_Cards } from "./AdminConstant";
import DateRangeSelector from "./DateRangeSelector";
import { useDashboardMetrics } from "../../../hooks";
import { buildSummaryCards } from "../../../common/CommonUtils";
import CommonLoading from "../../../common/CommonLoading";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../../services/services";
import { useAlertCenter } from "./useAlertCenter";
import { usePermissions } from "../../../hooks/usePermissions";
import { usePermissionRefresh } from "../../../hooks/usePermissionRefresh";

const getTodayRange = () => {
  const today = new Date();

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return {
    period: "Today",
    date: formatDate(today),
    startDateObj: today,
    endDateObj: today,
  };
};

const AdminDashboard = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { checkPermission, permissions } = usePermissions();
  const dispatch = useDispatch();
  const loginDetails = useSelector(
    (state) => state.loginSlice.loginDetails || {},
  );
  const { fetchApi } = useServices();
  const canViewMetrics = checkPermission("Dashboard", "DASHBOARD_METRICS");
  const canViewAll = canViewMetrics;
  const { refreshPermissions } = usePermissionRefresh();
  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);

  const [selectedRange, setSelectedRange] = useState(getTodayRange());

  const { dashboardMetrics } = useDashboardMetrics(selectedRange, setLoading);

  const [alertData, setAlertData] = useState({
    alerts: [],
    isLoading: false,
  });

  const { fetchData: fetchAlerts, fetchAllData: fetchAllAlerts } =
    useAlertCenter(setAlertData, fetchApi);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleViewAllAlerts = useCallback(() => {
    navigate("/alert-center", { state: { viewAll: true } });
  }, [navigate]);

  const handleAccountManagementNavigation = useCallback(() => {
    navigate("/account-management", {
      state: {
        statusId: "1",
      },
    });
  }, [navigate]);

  const handleDeviceManagementNavigation = useCallback(() => {
    navigate("/device-management", {
      state: {
        status: "2",
      },
    });
  }, [navigate]);

  const handleOpenIncidentsNavigation = useCallback(() => {
    navigate("/open-incidents");
  }, [navigate]);

  const CARD_CONFIG = useMemo(() => {
    return {
      total_carriers: {
        showViewAll: true,
        onViewAll: handleAccountManagementNavigation,
      },
      active_devices: {
        showViewAll: true,
        onViewAll: handleDeviceManagementNavigation,
      },
      open_incidents: {
        showViewAll: true,
        onViewAll: handleOpenIncidentsNavigation,
      },
    };
  }, [
    handleAccountManagementNavigation,
    handleDeviceManagementNavigation,
    handleOpenIncidentsNavigation,
  ]);

  const getDashboardCard = useCallback(
    (card) => {
      const config = CARD_CONFIG[card.id];

      return {
        ...card,
        showViewAll: config?.showViewAll ?? false,
        onViewAll: config?.onViewAll,
      };
    },
    [CARD_CONFIG],
  );
  const handleDateChange = (data) => {
    setSelectedRange(data);
  };

  // const summaryCards = useMemo(() => {
  //   return buildSummaryCards(dashboardMetrics || {}, Device_Metrics_Cards);
  // }, [dashboardMetrics]);

  const getSummaryCards = useCallback(() => {
    const cards = buildSummaryCards(
      dashboardMetrics || {},
      Device_Metrics_Cards,
    );

    return cards.map(getDashboardCard);
  }, [dashboardMetrics, getDashboardCard]);

  const summaryCards = useMemo(getSummaryCards, [getSummaryCards]);

  const dateLabel =
    selectedRange.period === "Today"
      ? selectedRange.date
      : `${selectedRange.startDate} - ${selectedRange.endDate}`;
  return (
    <>
      <LoadingContainer />
      <AccessControl hasAccess={canViewAll}>
        <PageContainer>
          {/* Header */}
          <HeaderContainer>
            <HeaderLeft>
              <ComplianceTitle variant="inherit">Dashboard</ComplianceTitle>
              <HeaderSubtitle variant="inherit">
                Overview of key metrics and alerts
              </HeaderSubtitle>
              {/* <DateRangeText>{dateLabel}</DateRangeText> */}
            </HeaderLeft>

            {/* <DateRangeSelector onDateRangeChange={handleDateChange} /> */}
          </HeaderContainer>

          <CommonSummaryCardGroup
            cards={summaryCards}
            showAccentBar={false}
            layout="dashboard"
          />

          <StretchGridContainer container spacing={2}>
            <ChartGrid item xs={12} md={7}>
              <CarrierGrowthTrend />
            </ChartGrid>

            <AlertGrid item xs={12} md={5}>
              <CommonAlertCenter
                title="Alert Center"
                alerts={alertData.alerts}
                isLoading={alertData.isLoading}
                onViewAll={handleViewAllAlerts}
              />
            </AlertGrid>

            <IncidentGrid item xs={12} md={6}>
              <IncidentDistribution />
            </IncidentGrid>

            <DeviceGrid item xs={12} md={6}>
              <DeviceLifecycleStatus />
            </DeviceGrid>
          </StretchGridContainer>
        </PageContainer>
      </AccessControl>
    </>
  );
};

export default AdminDashboard;
