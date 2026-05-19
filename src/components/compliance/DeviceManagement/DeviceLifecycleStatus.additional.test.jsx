// DeviceLifecycleStatus.additional.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceLifecycleStatus from "./DeviceLifecycleStatus";

// Mock ApexChart
jest.mock("react-apexcharts", () => {
  return function MockReactApexChart(props) {
    return (
      <div data-testid="mock-chart">
        <span data-testid="chart-type">{props.type}</span>
        <span data-testid="chart-width">{props.width}</span>
        <span data-testid="chart-height">{props.height}</span>
        <span data-testid="chart-series">
          {JSON.stringify(props.series)}
        </span>
      </div>
    );
  };
});

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("DeviceLifecycleStatus Additional Test Cases", () => {
  test("renders donut chart type correctly", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByTestId("chart-type")).toHaveTextContent(
      "donut"
    );
  });

  test("passes correct series data to chart", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByTestId("chart-series")).toHaveTextContent(
      "[1095,227,35,23]"
    );
  });

  test("renders formatted total count", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("1,380")).toBeInTheDocument();
  });

  test("renders all stat card values with locale formatting", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("1,095")).toBeInTheDocument();
    expect(screen.getByText("227")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("23")).toBeInTheDocument();
  });

  test("renders custom segments correctly", () => {
    const customSegments = [
      {
        key: "damaged",
        label: "Damaged",
        count: 55,
        chartColor: "#ff0000",
        bg: "#ffeeee",
        borderColor: "#ff9999",
        labelColor: "#cc0000",
      },
    ];

    render(<DeviceLifecycleStatus segments={customSegments} />);

    expect(screen.getByText("Damaged")).toBeInTheDocument();
    expect(screen.getAllByText("55")[0]).toBeInTheDocument();
  });

  test("renders zero total when segments are empty", () => {
    render(<DeviceLifecycleStatus segments={[]} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders without crashing when single segment provided", () => {
    const singleSegment = [
      {
        key: "active",
        label: "Active",
        count: 100,
        chartColor: "#00ff00",
        bg: "#eeffee",
        borderColor: "#99ff99",
        labelColor: "#008800",
      },
    ];

    render(<DeviceLifecycleStatus segments={singleSegment} />);

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getAllByText("100")[0]).toBeInTheDocument();
  });

  test("renders chart width and height props", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByTestId("chart-width")).toBeInTheDocument();
    expect(screen.getByTestId("chart-height")).toBeInTheDocument();
  });

  test("renders Total label in center", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  test("component matches snapshot", () => {
    const { asFragment } = render(<DeviceLifecycleStatus />);

    expect(asFragment()).toMatchSnapshot();
  });
});