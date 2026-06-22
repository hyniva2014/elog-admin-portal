import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuditLogModal from "./AuditLogModal";

const mockOnClose = jest.fn();
const mockSetAuditData = jest.fn();

jest.mock("../../../common/CommonDialogForm", () => {
  return function MockCommonDialogForm({ open, title, content }) {
    if (!open) return null;

    return (
      <div data-testid="dialog">
        <div>{title}</div>
        {content}
      </div>
    );
  };
});

jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid({ rowData, data }) {
    return (
      <div data-testid="data-grid">
        <div data-testid="row-count">{rowData?.length || 0}</div>

        <div data-testid="total">{data?.total}</div>

        <div data-testid="page">{data?.page}</div>

        <div data-testid="page-size">{data?.pageSize}</div>

        {rowData?.map((row) => (
          <div key={row.id} data-testid={`row-${row.id}`}>
            <span>{row.createdBy}</span>
            <span>{row.createdDate}</span>
            <span>{row.createdTime}</span>
            <span>{row.notes}</span>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock("./RoleManagement.styled", () => ({
  BackButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),

  BackButtonContainer: ({ children }) => <div>{children}</div>,

  CreatedOnCellContainer: ({ children }) => <div>{children}</div>,
}));

describe("AuditLogModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAuditData = {
    rows: [
      {
        createdBy: "John Doe",
        createdDate: "06/18/2026",
        createdTime: "10:00 AM",
        notes: "Role created",
      },
      {
        createdBy: "Admin User",
        createdDate: "06/19/2026",
        createdTime: "11:30 AM",
        notes: "Permissions updated",
      },
    ],
    total: 2,
    page: 1,
    pageSize: 10,
    isLoading: false,
  };

  test("renders modal when open", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });

  test("renders audit history title", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByText("Role Audit History")).toBeInTheDocument();
  });

  test("renders data grid", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByTestId("data-grid")).toBeInTheDocument();
  });

  test("renders correct row count", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByTestId("row-count")).toHaveTextContent("2");
  });

  test("renders first audit record", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Role created")).toBeInTheDocument();
  });

  test("renders second audit record", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByText("Admin User")).toBeInTheDocument();

    expect(screen.getByText("Permissions updated")).toBeInTheDocument();
  });

  test("passes pagination values correctly", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.getByTestId("total")).toHaveTextContent("2");

    expect(screen.getByTestId("page")).toHaveTextContent("1");

    expect(screen.getByTestId("page-size")).toHaveTextContent("10");
  });

  test("renders Back button", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: /back/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls onClose when Back button clicked", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /back/i,
      }),
    );

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not call onClose before button click", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("handles empty audit data", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={{
          rows: [],
          total: 0,
          page: 1,
          pageSize: 10,
        }}
      />,
    );

    expect(screen.getByTestId("row-count")).toHaveTextContent("0");
  });

  test("renders when auditData is undefined", () => {
    render(<AuditLogModal open={true} onClose={mockOnClose} />);

    expect(screen.getByText("Role Audit History")).toBeInTheDocument();
  });

  test("does not render dialog when closed", () => {
    render(
      <AuditLogModal
        open={false}
        onClose={mockOnClose}
        auditData={mockAuditData}
      />,
    );

    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  test("uses default pagination values", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={{
          rows: [],
        }}
      />,
    );

    expect(screen.getByTestId("page")).toHaveTextContent("1");

    expect(screen.getByTestId("page-size")).toHaveTextContent("10");
  });

  test("uses provided setAuditData prop", () => {
    render(
      <AuditLogModal
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(mockSetAuditData).not.toHaveBeenCalled();
  });
});
