import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserManagementGroupDialog from "./UserManagementGroupDialog";

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
  default: ({ columnsData, rowData }) => (
    <div data-testid="common-data-grid">
      <div>Columns: {columnsData.length}</div>
      <div>Rows: {rowData.length}</div>
    </div>
  ),
}));

jest.mock("../DeviceAssetManagement/Constants", () => ({
  STATIC_GROUP_DATA: [
    {
      id: 1,
      createdBy: "John",
      createdDate: "18 Jun 2026",
      createdTime: "10:00 AM",
      notes: "Created User",
    },
  ],
}));

describe("UserManagementGroupDialog", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dialog title when open is true", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByText("Carrier Users Audit History")
    ).toBeInTheDocument();
  });

  test("does not render dialog when open is false", () => {
    render(
      <UserManagementGroupDialog
        open={false}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.queryByText("Carrier Users Audit History")
    ).not.toBeInTheDocument();
  });

  test("renders CommonDataGrid", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByTestId("common-data-grid")
    ).toBeInTheDocument();
  });

  test("renders correct column count", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Columns: 3")).toBeInTheDocument();
  });

  test("renders correct row count", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Rows: 1")).toBeInTheDocument();
  });

  test("calls onClose when Back button is clicked", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /back/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("renders Back button", () => {
    render(
      <UserManagementGroupDialog
        open={true}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByRole("button", { name: /back/i })
    ).toBeInTheDocument();
  });
});