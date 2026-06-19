import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceModelAuditDialog from "./DeviceModelAuditDialog";

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
    <div data-testid="audit-grid">
      {rowData.map((row) => (
        <div key={row.id}>{row.notes}</div>
      ))}
    </div>
  ),
}));

jest.mock("./DeviceModelAuditDialog.styled", () => ({
  DataGridWrapper: ({ children }) => <div>{children}</div>,
  ActionBox: ({ children }) => <div>{children}</div>,
  BackButton: ({ children, onClick, variant }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  CreatedOnWrapper: ({ children }) => <div>{children}</div>,
  CreatedDateText: ({ children }) => <span>{children}</span>,
  CreatedTimeText: ({ children }) => <span>{children}</span>,
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

describe("DeviceModelAuditDialog", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchApi.mockResolvedValue(mockAuditResponse);
  });

  test("renders dialog title when open", () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={49} />,
    );

    expect(screen.getByText("Device Model Audit History")).toBeInTheDocument();
  });

  test("renders audit grid", () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={49} />,
    );

    expect(screen.getByTestId("audit-grid")).toBeInTheDocument();
  });

  test("fetches and displays audit log data", async () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={49} />,
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

  test("calls fetchApi with correct endpoint", async () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={49} />,
    );

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        "/masteradmin/deviceModel/audit-logs?page=1&limit=10&device_model_id=49",
      );
    });
  });

  test("renders Back button and calls onClose when clicked", async () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={49} />,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /back/i }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  test("does not render dialog when open is false", () => {
    render(
      <DeviceModelAuditDialog open={false} onClose={mockOnClose} deviceModelId={49} />,
    );

    expect(
      screen.queryByText("Device Model Audit History"),
    ).not.toBeInTheDocument();
  });

  test("renders empty grid when API returns no logs", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        audit_logs: [],
        pagination: { total_records: 0 },
      },
    });

    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} deviceModelId={99} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("audit-grid")).toBeInTheDocument();
    });
  });

  test("does not fetch when deviceModelId is not provided", () => {
    render(
      <DeviceModelAuditDialog open={true} onClose={mockOnClose} />,
    );

    expect(mockFetchApi).not.toHaveBeenCalled();
  });
});
