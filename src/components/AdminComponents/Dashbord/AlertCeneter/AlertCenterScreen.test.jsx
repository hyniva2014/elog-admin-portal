// AlertCenterScreen.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import AlertCenterScreen from "./AlertCenterScreen";

// Mock alerts if imported externally
jest.mock("../AdminConstant", () => ({
  alerts: [
    { id: 1, title: "Test Alert" },
    { id: 2, title: "Alert 2" },
  ],
}));

// Mock Header component
jest.mock("./AlertCenterScreenHeader", () => {
  return jest.fn((props) => (
    <div data-testid="header">
      Header Component
      <span data-testid="header-props">{JSON.stringify(props)}</span>
    </div>
  ));
});

// Mock Cards component
jest.mock("./AlertCenterScreenCards", () => {
  return jest.fn((props) => (
    <div data-testid="cards">
      Cards Component
      <span data-testid="cards-props">{JSON.stringify(props)}</span>
    </div>
  ));
});

describe("AlertCenterScreen", () => {
  test("renders component successfully", () => {
    render(<AlertCenterScreen />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("cards")).toBeInTheDocument();
  });

  test("passes correct initial props to Header", () => {
    render(<AlertCenterScreen />);

    const props = JSON.parse(screen.getByTestId("header-props").textContent);

    expect(props.data).toEqual({
      search: "",
      fromDate: null,
      toDate: null,
      category: "",
      severity: "",
      page: 1,
      pageSize: 10,
    });

    expect(props.searchKey).toBe(0);

    expect(props.categoryOptions).toEqual([
      { value: "", label: "All Category" },
      { value: "maintenance", label: "Maintenance" },
      { value: "safety", label: "Safety" },
      { value: "performance", label: "Performance" },
    ]);

    expect(props.severityOptions).toEqual([
      { value: "", label: "All Severity" },
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]);
  });

  test("passes setData function to Header", () => {
    render(<AlertCenterScreen />);

    const props = JSON.parse(screen.getByTestId("header-props").textContent);

    expect(props.setData).toBeDefined();
  });

  test("passes alerts prop to Cards", () => {
    render(<AlertCenterScreen />);

    const props = JSON.parse(screen.getByTestId("cards-props").textContent);

    expect(props.alerts).toEqual([
      { id: 1, title: "Test Alert" },
      { id: 2, title: "Alert 2" },
    ]);
  });
});
