import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CarrierGrowthTrend from "./CarrierGrowthTrend";

// Mock recharts
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

// Mock tooltip component
jest.mock("./ChartCustomTooltip", () => ({
  __esModule: true,
  default: () => <div data-testid="custom-tooltip">Tooltip</div>,
}));

// Mock constants
jest.mock("./AdminConstant", () => ({
  chartData: [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 150 },
  ],
  TooltipKeys: ["value"],
}));

describe("CarrierGrowthTrend", () => {
  test("renders title", () => {
    render(<CarrierGrowthTrend />);

    expect(screen.getByText("Carrier Growth Trend")).toBeInTheDocument();
  });

  test("renders subtitle", () => {
    render(<CarrierGrowthTrend />);

    expect(screen.getByText("Jan.26 - Jun 26")).toBeInTheDocument();
  });

  test("renders chart container", () => {
    render(<CarrierGrowthTrend />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  test("renders chart elements", () => {
    render(<CarrierGrowthTrend />);

    expect(screen.getByTestId("line")).toBeInTheDocument();

    expect(screen.getByTestId("x-axis")).toBeInTheDocument();

    expect(screen.getByTestId("y-axis")).toBeInTheDocument();

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  test("default selected year is 2026", () => {
    render(<CarrierGrowthTrend />);

    expect(screen.getByDisplayValue("2026")).toBeInTheDocument();
  });

  test("changes year selection", () => {
    render(<CarrierGrowthTrend />);

    const select = screen.getByRole("combobox");

    // Open dropdown
    fireEvent.mouseDown(select);

    // Select option
    const option = screen.getByText("2025");
    fireEvent.click(option);

    // Verify selected value
    expect(screen.getByDisplayValue("2025")).toBeInTheDocument();
  });
});
