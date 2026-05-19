import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DateRangeSelector from "./DateRangeSelector";

const theme = createTheme();

const renderComponent = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <DateRangeSelector {...props} />
    </ThemeProvider>,
  );
};

describe("DateRangeSelector", () => {
  test("renders all default buttons", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: "Today",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "7D",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "14D",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "30D",
      }),
    ).toBeInTheDocument();
  });

  test("Today selected initially", () => {
    renderComponent();

    const todayButton = screen.getByRole("button", {
      name: "Today",
    });

    expect(todayButton).toHaveClass("selected");
  });

  test("uses custom initialPeriod", () => {
    renderComponent({
      initialPeriod: "7D",
    });

    const button = screen.getByRole("button", {
      name: "7D",
    });

    expect(button).toHaveClass("selected");
  });

  test("changes selected button after click", () => {
    renderComponent();

    const button = screen.getByRole("button", {
      name: "14D",
    });

    fireEvent.click(button);

    expect(button).toHaveClass("selected");
  });

  test("calls onDateRangeChange", () => {
    const mockFn = jest.fn();

    renderComponent({
      onDateRangeChange: mockFn,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "7D",
      }),
    );

    expect(mockFn).toHaveBeenCalled();
  });

  test("returns Today date range", () => {
    const mockFn = jest.fn();

    renderComponent({
      onDateRangeChange: mockFn,
    });

    fireEvent.click(screen.getByText("Today"));

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        period: "Today",
        startDate: today,
        endDate: today,
      }),
    );
  });

  test("returns 7D range", () => {
    const mockFn = jest.fn();

    renderComponent({
      onDateRangeChange: mockFn,
    });

    fireEvent.click(screen.getByText("7D"));

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        period: "7D",
      }),
    );
  });

  test("returns 14D range", () => {
    const mockFn = jest.fn();

    renderComponent({
      onDateRangeChange: mockFn,
    });

    fireEvent.click(screen.getByText("14D"));

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        period: "14D",
      }),
    );
  });

  test("returns 30D range", () => {
    const mockFn = jest.fn();

    renderComponent({
      onDateRangeChange: mockFn,
    });

    fireEvent.click(screen.getByText("30D"));

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        period: "30D",
      }),
    );
  });

  test("renders custom periods", () => {
    const customPeriods = [
      {
        label: "60D",
        value: "60D",
      },
      {
        label: "90D",
        value: "90D",
      },
    ];

    renderComponent({
      periods: customPeriods,
    });

    expect(screen.getByText("60D")).toBeInTheDocument();

    expect(screen.getByText("90D")).toBeInTheDocument();
  });

  test("does not crash without callback", () => {
    renderComponent();

    expect(() => fireEvent.click(screen.getByText("7D"))).not.toThrow();
  });
});
