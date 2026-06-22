import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlatformUserAuditDialog from "./PlatformUserAuditDialog";

jest.mock("@mui/material/styles", () => ({
  ...jest.requireActual("@mui/material/styles"),
  useTheme: () => ({ palette: { mode: "light" } }),
}));

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
    <div data-testid="common-data-grid">
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

jest.mock("./PlatformUserAuditDialog.styled", () => ({
  auditCreatedDateSx: () => ({}),
  auditCreatedTimeSx: () => ({}),
  tableContainerSx: {},
  backButtonWrapperSx: {},
  backButtonSx: {},
}));

// Audit data as processed by the parent from the real API response
const mockAuditData = {
  rows: [
    {
      id: 5,
      createdBy: "Emil watson",
      createdDate: "06-19-2026",
      createdTime: "07:31 AM",
      notes: "Platform user onboarded",
    },
  ],
  total: 1,       // from pagination.total_records
  page: 1,        // from pagination.current_page
  pageSize: 10,   // from pagination.limit
  isLoading: false,
};

describe("PlatformUserAuditDialog", () => {
  const mockOnClose = jest.fn();
  const mockSetAuditData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog title when open is true", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Platform User Audit History")).toBeInTheDocument();
  });

  it("renders CommonDataGrid", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("renders rows passed from parent", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByText("Platform user onboarded")).toBeInTheDocument();
    expect(screen.getByText("Emil watson")).toBeInTheDocument();
  });

  it("grid total reflects pagination.total_records from API", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("total-records")).toHaveTextContent("1");
  });

  it("grid page reflects pagination.current_page from API", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("current-page")).toHaveTextContent("1");
  });

  it("grid pageSize reflects pagination.limit from API", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(screen.getByTestId("page-size")).toHaveTextContent("10");
  });

  it("calls onClose when Back button is clicked", () => {
    render(
      <PlatformUserAuditDialog
        open={true}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not render dialog when open is false", () => {
    render(
      <PlatformUserAuditDialog
        open={false}
        onClose={mockOnClose}
        auditData={mockAuditData}
        setAuditData={mockSetAuditData}
      />,
    );

    expect(
      screen.queryByText("Platform User Audit History"),
    ).not.toBeInTheDocument();
  });

  it("renders empty grid when rows are empty", () => {
    render(
      <PlatformUserAuditDialog
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
