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
  default: ({ rowData, data }) => (
    <div data-testid="audit-grid">
      <span data-testid="total-records">{data?.total}</span>
      <span data-testid="current-page">{data?.page}</span>
      <span data-testid="page-size">{data?.pageSize}</span>
      {rowData.map((row) => (
        <div key={row.id} data-testid="audit-row">
          <span data-testid="created-by">{row.createdBy}</span>
          <span data-testid="notes">{row.notes}</span>
        </div>
      ))}
    </div>
  ),
}));

jest.mock("./DeviceModelAuditDialog.styled", () => ({
  DataGridWrapper: ({ children }) => <div>{children}</div>,
  ActionBox: ({ children }) => <div>{children}</div>,
  BackButton: ({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  CreatedOnWrapper: ({ children }) => <div>{children}</div>,
  CreatedDateText: ({ children }) => <span>{children}</span>,
  CreatedTimeText: ({ children }) => <span>{children}</span>,
}));

// Audit data as it comes from the parent after the API response is processed
const mockAuditData = {
  rows: [
    {
      id: 3,
      createdBy: "Emil watson",
      createdDate: "06-19-2026",
      createdTime: "07:31 AM",
      notes: "New device model created",
    },
  ],
  total: 1,       // from pagination.total_records
  page: 1,        // from pagination.current_page
  pageSize: 20,   // from pagination.limit
  isLoading: false,
};

describe("DeviceModelAuditDialog", () => {
  const mockOnClose = jest.fn();
  const mockSetAuditData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dialog title when open", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Device Model Audit History")).toBeInTheDocument();
  });

  test("renders audit grid", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("audit-grid")).toBeInTheDocument();
  });

  test("renders rows passed from parent", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("New device model created")).toBeInTheDocument();
    expect(screen.getByText("Emil watson")).toBeInTheDocument();
  });

  test("grid total reflects pagination.total_records from API", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("total-records")).toHaveTextContent("1");
  });

  test("grid page reflects pagination.current_page from API", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("current-page")).toHaveTextContent("1");
  });

  test("grid pageSize reflects pagination.limit from API", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("page-size")).toHaveTextContent("20");
  });

  test("renders Back button and calls onClose when clicked", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not render dialog when open is false", () => {
    render(
      <DeviceModelAuditDialog
        open={false}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(
      screen.queryByText("Device Model Audit History"),
    ).not.toBeInTheDocument();
  });

  test("renders empty grid when rows are empty", () => {
    render(
      <DeviceModelAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={{ ...mockAuditData, rows: [], total: 0 }}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.queryAllByTestId("audit-row")).toHaveLength(0);
    expect(screen.getByTestId("total-records")).toHaveTextContent("0");
  });
});
