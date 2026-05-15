// DeviceLifecycleStatus.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceLifecycleStatus from "./DeviceLifecycleStatus";

jest.mock("react-apexcharts", () => {
  return function MockChart(props) {
    return (
      <div data-testid="apex-chart">
        Mock Donut Chart
        <div data-testid="chart-width">{props.width}</div>
        <div data-testid="chart-height">{props.height}</div>
      </div>
    );
  };
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("DeviceLifecycleStatus Component", () => {
  test("renders component title", () => {
    render(<DeviceLifecycleStatus />);

    expect(
      screen.getByText("Device Lifecycle Status")
    ).toBeInTheDocument();
  });

  test("renders apex chart", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
  });

  test("renders all default segment labels", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("In Maintenance")).toBeInTheDocument();
    expect(screen.getByText("Retired")).toBeInTheDocument();
  });

  test("renders all default segment counts", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("1,095")).toBeInTheDocument();
    expect(screen.getByText("227")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("23")).toBeInTheDocument();
  });

  test("renders total device count", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("1,380")).toBeInTheDocument();
  });

  test("renders total label", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  test("renders custom segment data", () => {
    const customSegments = [
      {
        key: "available",
        label: "Available",
        count: 500,
        chartColor: "#00ff00",
        bg: "#f0fff0",
        borderColor: "#00cc00",
        labelColor: "#00aa00",
      },
      {
        key: "offline",
        label: "Offline",
        count: 100,
        chartColor: "#ff0000",
        bg: "#fff0f0",
        borderColor: "#cc0000",
        labelColor: "#aa0000",
      },
    ];

    render(<DeviceLifecycleStatus segments={customSegments} />);

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getAllByText("100")[0]).toBeInTheDocument();

    expect(screen.getByText("600")).toBeInTheDocument();
  });

  test("renders chart width and height", () => {
    render(<DeviceLifecycleStatus />);

    expect(screen.getByTestId("chart-width")).toBeInTheDocument();
    expect(screen.getByTestId("chart-height")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<DeviceLifecycleStatus />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders correct number of stat cards", () => {
    render(<DeviceLifecycleStatus />);

    const labels = [
      "Active",
      "In Stock",
      "In Maintenance",
      "Retired",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders component without crashing when segments is empty", () => {
    render(<DeviceLifecycleStatus segments={[]} />);

    expect(
      screen.getByText("Device Lifecycle Status")
    ).toBeInTheDocument();

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});