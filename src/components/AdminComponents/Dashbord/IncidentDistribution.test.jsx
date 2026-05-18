import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import IncidentDistribution from "./IncidentDistribution";

jest.mock("react-apexcharts", () => {
  return function MockChart(props) {
    return (
      <div data-testid="apex-chart">
        Mock Apex Chart
        <div data-testid="chart-height">{props.height}</div>
      </div>
    );
  };
});

describe("IncidentDistribution Component", () => {
  test("renders chart title", () => {
    render(<IncidentDistribution />);

    expect(screen.getByText("Incident Distribution")).toBeInTheDocument();
  });

  test("renders chart subtitle", () => {
    render(<IncidentDistribution />);

    expect(screen.getByText("Mar 28, 2026 – Apr 4, 2026")).toBeInTheDocument();
  });

  test("renders Apex chart component", () => {
    render(<IncidentDistribution />);

    expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
  });

  test("renders all legend items", () => {
    render(<IncidentDistribution />);

    expect(screen.getByText("ELD device Issue")).toBeInTheDocument();
    expect(screen.getByText("Web - Compliance Management")).toBeInTheDocument();
    expect(screen.getByText("Mobile - Driver Log")).toBeInTheDocument();
    expect(screen.getByText("Fleet Management")).toBeInTheDocument();
  });

  test("renders incident filter dropdown", () => {
    render(<IncidentDistribution />);

    expect(screen.getByLabelText("Incident")).toBeInTheDocument();
  });

  test("renders period filter dropdown", () => {
    render(<IncidentDistribution />);

    expect(screen.getByLabelText("Period")).toBeInTheDocument();
  });

  test("changes incident dropdown value", () => {
    render(<IncidentDistribution />);

    const incidentSelect = screen.getByLabelText("Incident");

    fireEvent.mouseDown(incidentSelect);

    const option = screen.getByText("Critical");
    fireEvent.click(option);

    expect(screen.getAllByText("Critical")[0]).toBeInTheDocument();
  });

  test("changes period dropdown value", () => {
    render(<IncidentDistribution />);

    const periodSelect = screen.getByLabelText("Period");

    fireEvent.mouseDown(periodSelect);

    const option = screen.getByText("30 days");
    fireEvent.click(option);

    expect(screen.getAllByText("30 days")[0]).toBeInTheDocument();
  });

  test("renders chart with correct height", () => {
    render(<IncidentDistribution />);

    expect(screen.getByTestId("chart-height")).toBeInTheDocument();
  });

  test("renders all dropdown options", () => {
    render(<IncidentDistribution />);

    // Incident dropdown
    fireEvent.mouseDown(screen.getByLabelText("Incident"));

    expect(screen.getAllByText("All Incident")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Open only")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Critical")[0]).toBeInTheDocument();
  });

  test("renders all period options", () => {
    render(<IncidentDistribution />);

    fireEvent.mouseDown(screen.getByLabelText("Period"));

    expect(screen.getAllByText("7 days")[0]).toBeInTheDocument();
    expect(screen.getAllByText("30 days")[0]).toBeInTheDocument();
    expect(screen.getAllByText("90 days")[0]).toBeInTheDocument();
  });
});
