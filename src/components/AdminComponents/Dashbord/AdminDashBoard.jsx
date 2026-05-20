import React, { useState } from "react";

import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { PageContainer } from "../component.styled";
import CarrierGrowthTrend from "./CarrierGrowthTrend";
import CommonAlertCenter from "./AlertCenter";
import IncidentDistribution from "./IncidentDistribution";
import DeviceLifecycleStatus from "../../compliance/DeviceManagement/DeviceLifecycleStatus";
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
import { alerts, summaryCards } from "./AdminConstant";
import DateRangeSelector from "./DateRangeSelector";

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
  const [selectedRange, setSelectedRange] = useState(getTodayRange());

  const handleDateChange = (data) => {
    setSelectedRange(data);
  };

  const handleViewAll = () => {
    // TODO: implement navigation to full alert list
  };

  const dateLabel =
    selectedRange.period === "Today"
      ? selectedRange.date
      : `${selectedRange.startDate} - ${selectedRange.endDate}`;

  return (
    <PageContainer>
      {/* Header */}
      <HeaderContainer>
        <HeaderLeft>
          <ComplianceTitle variant="inherit">Dashboard</ComplianceTitle>
          <HeaderSubtitle variant="inherit">
            Overview of key metrics and alerts
          </HeaderSubtitle>
          <DateRangeText>{dateLabel}</DateRangeText>
        </HeaderLeft>

        <DateRangeSelector onDateRangeChange={handleDateChange} />
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
            alerts={alerts}
            // onViewAll={handleViewAll}
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
  );
};

export default AdminDashboard;
