import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AssignDevicesToCarriers from "./AssignDevicesToCarriers";

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(() =>
      Promise.resolve({
        body: { data: [{ company_id: "1", company_name: "Carrier 1" }] },
      }),
    ),
  }),
}));

describe("AssignDevicesToCarriers", () => {
  const defaultProps = {
    open: true,
    handleCancel: jest.fn(),
    handleSubmit: jest.fn(),
    loading: false,
  };

  it("renders dialog and carrier dropdown", async () => {
    render(<AssignDevicesToCarriers {...defaultProps} />);
    expect(screen.getByText("Assign Device to Carrier")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByLabelText("Carrier Name")).toBeInTheDocument(),
    );
  });

  it("calls handleCancel when cancel is clicked", async () => {
    render(<AssignDevicesToCarriers {...defaultProps} />);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(defaultProps.handleCancel).toHaveBeenCalled();
  });

  it("calls handleSubmit with selected carrier", async () => {
    render(<AssignDevicesToCarriers {...defaultProps} />);
    await waitFor(() =>
      expect(screen.getByLabelText("Carrier Name")).toBeInTheDocument(),
    );
    fireEvent.change(screen.getByLabelText("Carrier Name"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/assign/i));
    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });
});
