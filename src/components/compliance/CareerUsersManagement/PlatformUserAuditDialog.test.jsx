import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlatformUserAuditDialog from "./PlatformUserAuditDialog";

jest.mock("../CareerUsersManagement/Constants", () => [
  {
    id: 1,
    createdBy: "John Miller",
    createdDate: "Dec 11, 2025",
    createdTime: "06:15 AM",
    notes: "Account Created",
  },
]);

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
    <div data-testid="common-data-grid">
      {rowData.map((row) => (
        <div key={row.id}>{row.notes}</div>
      ))}
    </div>
  ),
}));

describe("PlatformUserAuditDialog", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog title when open is true", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} />
    );

    expect(
      screen.getByText("Platform User Audit History")
    ).toBeInTheDocument();
  });

  it("renders CommonDataGrid", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} />
    );

    expect(
      screen.getByTestId("common-data-grid")
    ).toBeInTheDocument();
  });

  it("renders audit data in grid", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} />
    );

    expect(screen.getByText("Account Created")).toBeInTheDocument();
  });

  it("calls onClose when Back button is clicked", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByRole("button", { name: /back/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not render dialog when open is false", () => {
    render(
      <PlatformUserAuditDialog open={false} onClose={mockOnClose} />
    );

    expect(
      screen.queryByText("Platform User Audit History")
    ).not.toBeInTheDocument();
  });
});