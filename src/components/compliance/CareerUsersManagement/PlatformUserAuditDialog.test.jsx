import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlatformUserAuditDialog from "./PlatformUserAuditDialog";

const mockFetchApi = jest.fn();

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
  }),
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
  default: ({ rowData }) => (
    <div data-testid="common-data-grid">
      {rowData.map((row) => (
        <div key={row.id}>{row.notes}</div>
      ))}
    </div>
  ),
}));

const mockAuditResponse = {
  statusCode: 200,
  body: {
    audit_logs: [
      {
        id: 12,
        role_id: 49,
        description: "Description changed from Audit Test to Test Audit",
        created_by: "Emil watson",
        created_at: "2026-06-18T05:50:46-05:00",
      },
      {
        id: 11,
        role_id: 49,
        description: "Permission Create carrier user disabled",
        created_by: "Emil watson",
        created_at: "2026-06-18T05:49:47-05:00",
      },
    ],
    pagination: {
      total_records: 2,
      total_pages: 1,
      current_page: 1,
      limit: 10,
    },
  },
};

describe("PlatformUserAuditDialog", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchApi.mockResolvedValue(mockAuditResponse);
  });

  it("renders dialog title when open is true", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={42} />,
    );

    expect(
      screen.getByText("Platform User Audit History"),
    ).toBeInTheDocument();
  });

  it("renders CommonDataGrid", () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={42} />,
    );

    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("fetches and displays audit log data", async () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={42} />,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Description changed from Audit Test to Test Audit"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Permission Create carrier user disabled"),
      ).toBeInTheDocument();
    });
  });

  it("calls fetchApi with correct endpoint", async () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={42} />,
    );

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        "/masteradmin/platformUser/audit-logs?page=1&limit=10&platform_user_id=42",
      );
    });
  });

  it("calls onClose when Back button is clicked", async () => {
    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={42} />,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /back/i }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("does not render dialog when open is false", () => {
    render(
      <PlatformUserAuditDialog open={false} onClose={mockOnClose} userId={42} />,
    );

    expect(
      screen.queryByText("Platform User Audit History"),
    ).not.toBeInTheDocument();
  });

  it("renders empty grid when API returns no logs", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        audit_logs: [],
        pagination: { total_records: 0 },
      },
    });

    render(
      <PlatformUserAuditDialog open={true} onClose={mockOnClose} userId={99} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
    });
  });

  it("does not fetch when userId is not provided", () => {
    render(<PlatformUserAuditDialog open={true} onClose={mockOnClose} />);

    expect(mockFetchApi).not.toHaveBeenCalled();
  });
});
