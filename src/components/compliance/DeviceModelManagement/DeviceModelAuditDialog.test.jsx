import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceModelAuditDialog from "./DeviceModelAuditDialog";

jest.mock("../../../common/CommonDialogForm", () => ({
  __esModule: true,
  default: ({ open, title, content }) =>
    open ? (
      <div>
        <h1>{title}</h1>
        {content}
      </div>
    ) : null,
}));

jest.mock("../../../common/CommonDataGrid", () => ({
  __esModule: true,
  default: ({ rowData }) => (
    <div data-testid="audit-grid">
      {rowData.map((row) => (
        <div key={row.id}>{row.notes}</div>
      ))}
    </div>
  ),
}));

describe("DeviceModelAuditDialog", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dialog title when open", () => {
    render(<DeviceModelAuditDialog open={true} onClose={mockOnClose} />);

    expect(
      screen.getByText("Device Model Audit History")
    ).toBeInTheDocument();
  });

  test("renders audit grid", () => {
    render(<DeviceModelAuditDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByTestId("audit-grid")).toBeInTheDocument();
  });

  test("renders audit history data", () => {
    render(<DeviceModelAuditDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByText("Account Created")).toBeInTheDocument();
    expect(
      screen.getByText("carrier requested 100 devices")
    ).toBeInTheDocument();
  });

  test("calls onClose when Back button is clicked", () => {
    render(<DeviceModelAuditDialog open={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /back/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not render dialog when open is false", () => {
    render(<DeviceModelAuditDialog open={false} onClose={mockOnClose} />);

    expect(
      screen.queryByText("Device Model Audit History")
    ).not.toBeInTheDocument();
  });
});