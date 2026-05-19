import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AdminDashboard from "./AdminDashboard";

// Mock child components
jest.mock("../../../common/CommonSummaryCardGroup", () => ({
  __esModule: true,
  default: ({ cards }) => (
    <div data-testid="summary-group">Summary Cards: {cards.length}</div>
  ),
}));

jest.mock("./CarrierGrowthTrend", () => ({
  __esModule: true,
  default: () => <div data-testid="growth-chart">Carrier Growth Trend</div>,
}));

jest.mock("./AlertCenter", () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="alert-center">{title}</div>,
}));

jest.mock("./IncidentDistribution", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="incident-distribution">Incident Distribution</div>
  ),
}));

jest.mock("../../compliance/DeviceManagement/DeviceLifecycleStatus", () => ({
  __esModule: true,
  default: () => <div data-testid="device-status">Device Lifecycle Status</div>,
}));

jest.mock("./DateRangeSelector", () => ({
  __esModule: true,
  default: ({ onDateRangeChange }) => (
    <button
      data-testid="date-selector"
      onClick={() =>
        onDateRangeChange({
          period: "Custom",
          startDate: "Jan 1, 2025",
          endDate: "Jan 15, 2025",
        })
      }
    >
      Change Date
    </button>
  ),
}));

jest.mock("./AdminConstant", () => ({
  alerts: [{ id: 1 }],
  chartData: [{ month: "Jan", value: 100 }],
  summaryCards: [{ title: "Card1" }, { title: "Card2" }],
  TooltipKeys: ["value"],
}));

describe("AdminDashboard", () => {
  test("renders dashboard title", () => {
    render(<AdminDashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("renders subtitle", () => {
    render(<AdminDashboard />);

    expect(
      screen.getByText("Overview of key metrics and alerts"),
    ).toBeInTheDocument();
  });

  test("renders SummaryCardGroup", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("summary-group")).toBeInTheDocument();

    expect(screen.getByText("Summary Cards: 2")).toBeInTheDocument();
  });

  test("renders CarrierGrowthTrend", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("growth-chart")).toBeInTheDocument();

    expect(screen.getByText("Carrier Growth Trend")).toBeInTheDocument();
  });

  test("renders Alert Center", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("alert-center")).toHaveTextContent(
      "Alert Center",
    );
  });

  test("renders Incident Distribution", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("incident-distribution")).toBeInTheDocument();
  });

  test("renders Device Lifecycle Status", () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId("device-status")).toBeInTheDocument();
  });

  test("shows today's date initially", () => {
    render(<AdminDashboard />);

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    expect(screen.getByText(today)).toBeInTheDocument();
  });

  test("updates date range when selector changes", () => {
    render(<AdminDashboard />);

    fireEvent.click(screen.getByTestId("date-selector"));

    expect(screen.getByText("Jan 1, 2025 - Jan 15, 2025")).toBeInTheDocument();
  });
});
