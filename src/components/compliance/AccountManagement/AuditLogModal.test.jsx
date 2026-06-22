import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuditLogModal from "./AuditLogModal";

jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid(props) {
    return (
      <div data-testid="common-data-grid">
        <div>Rows: {props.rowData?.length || 0}</div>
      </div>
    );
  };
});

jest.mock("../../../common/CommonDialogForm", () => {
  return function MockCommonDialogForm({ open, title, content, onClose }) {
    if (!open) return null;

    return (
      <div data-testid="dialog-form">
        <h2>{title}</h2>
        <button onClick={onClose}>Close Dialog</button>
        {content}
      </div>
    );
  };
});

jest.mock("./Constants", () => ({
  ACCOUNT_HISTORY_TITLE: "Account Audit History",
  BACK_BUTTON_TEXT: "Back",
}));

jest.mock("./CommomRowColumnUtils.styled", () => ({
  BackButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  BackButtonContainer: ({ children }) => <div>{children}</div>,
  CreatedOnCellContainer: ({ children }) => <div>{children}</div>,
}));

describe("AuditLogModal", () => {
  const mockOnClose = jest.fn();
  const mockSetAuditData = jest.fn();

  const mockAuditData = {
    rows: [
      {
        createdBy: "John Doe",
        createdDate: "2026-06-22",
        createdTime: "10:00 AM",
        notes: "Account Created",
      },
      {
        createdBy: "Jane Smith",
        createdDate: "2026-06-23",
        createdTime: "11:00 AM",
        notes: "Account Updated",
      },
    ],
    total: 2,
    page: 1,
    pageSize: 20,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog when open is true", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("dialog-form")).toBeInTheDocument();
    expect(screen.getByText("Account Audit History")).toBeInTheDocument();
  });

  it("does not render dialog when open is false", () => {
    render(
      <AuditLogModal
        open={false}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.queryByTestId("dialog-form")).not.toBeInTheDocument();
  });

  it("renders CommonDataGrid", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("passes correct row count to grid", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Rows: 2")).toBeInTheDocument();
  });

  it("calls onClose when Back button is clicked", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    fireEvent.click(screen.getByText("Back"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when dialog close button is clicked", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    fireEvent.click(screen.getByText("Close Dialog"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("handles empty audit data", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={{
          rows: [],
          total: 0,
          page: 1,
          pageSize: 20,
          isLoading: false,
        }}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Rows: 0")).toBeInTheDocument();
  });

  it("handles undefined auditData", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();

    expect(screen.getByText("Rows: 0")).toBeInTheDocument();
  });

  it("renders back button", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Account Audit History")).toBeInTheDocument();
  });
});
