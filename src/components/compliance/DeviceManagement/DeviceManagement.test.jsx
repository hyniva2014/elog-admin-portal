import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeviceManagement from "./DeviceManagement";

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(() =>
      Promise.resolve({
        body: { data: [], counts: {}, pagination: { total_records: 0 } },
      }),
    ),
  }),
}));

jest.mock("./AssignDevicesToCarriers", () => (props) => (
  <div data-testid="assign-devices-dialog" open={props.open} />
));

jest.mock("./DeviceManagementHeader", () => (props) => (
  <button
    data-testid="assign-btn"
    onClick={props.handleClick}
    disabled={!props.isAssignDeviceEnabled}
  >
    Assign
  </button>
));

describe("DeviceManagement", () => {
  it("renders loading and datagrid", async () => {
    render(<DeviceManagement />);
    expect(screen.getByTestId("assign-btn")).toBeInTheDocument();
  });

  it("opens assign dialog on assign button click", async () => {
    render(<DeviceManagement />);
    const assignBtn = screen.getByTestId("assign-btn");
    fireEvent.click(assignBtn);
    await waitFor(() =>
      expect(screen.getByTestId("assign-devices-dialog")).toHaveAttribute(
        "open",
        "true",
      ),
    );
  });
});
