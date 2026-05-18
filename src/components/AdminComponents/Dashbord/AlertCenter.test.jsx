import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AlertCenter from "./AlertCenter";

// Mock image imports
jest.mock("../../../assets/images/active/Icon-1.png", () => "carrier-icon");

jest.mock("../../../assets/images/active/Icon-3.png", () => "location-icon");

jest.mock("../../../assets/images/active/Icon-4.png", () => "device-icon");

jest.mock("../../../assets/images/active/Truck.png", () => "truck-icon");

describe("AlertCenter", () => {
  const mockAlerts = [
    {
      title: "Device Offline",
      company: "ABC Logistics",
      truck: "Truck-101",
      serial: "SN12345",
      location1: "Dallas",
      location2: "Texas",
      date: "Jul 10, 2026",
      color: "#ff0000",
    },
    {
      title: "Low Battery",
      company: "XYZ Transport",
      truck: "Truck-202",
      serial: "SN67890",
      location1: "Austin",
      location2: "Texas",
      time: "2 hours ago",
      color: "#00ff00",
    },
  ];

  test("renders title", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("Alert Center")).toBeInTheDocument();
  });

  test("renders View All", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("View All")).toBeInTheDocument();
  });

  test("renders alert items", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("Device Offline")).toBeInTheDocument();

    expect(screen.getByText("Low Battery")).toBeInTheDocument();
  });

  test("renders company details", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("ABC Logistics")).toBeInTheDocument();

    expect(screen.getByText("XYZ Transport")).toBeInTheDocument();
  });

  test("renders truck details", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("Truck-101")).toBeInTheDocument();

    expect(screen.getByText("Truck-202")).toBeInTheDocument();
  });

  test("renders serial number", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("SN12345")).toBeInTheDocument();

    expect(screen.getByText("SN67890")).toBeInTheDocument();
  });

  test("renders locations", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getAllByText("Texas").length).toBeGreaterThan(0);
  });

  test("renders date/time", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    expect(screen.getByText("Jul 10, 2026")).toBeInTheDocument();

    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  test("calls onViewAll when clicked", () => {
    const mockFn = jest.fn();

    render(<AlertCenter alerts={mockAlerts} onViewAll={mockFn} />);

    fireEvent.click(screen.getByText("View All"));

    expect(mockFn).toHaveBeenCalled();
  });

  test("renders all icons", () => {
    render(<AlertCenter alerts={mockAlerts} />);

    const images = screen.getAllByRole("img");

    expect(images.length).toBeGreaterThan(0);
  });
});
