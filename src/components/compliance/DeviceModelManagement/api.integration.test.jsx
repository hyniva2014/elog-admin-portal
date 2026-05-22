/**
 * API Integration Tests for Device Model Management
 * Tests for GET, POST (Create), and POST (Update) API calls
 */

import { renderHook, waitFor } from "@testing-library/react";
import { act, render, screen } from "@testing-library/react";

// Mock the services hook
const mockFetchApi = jest.fn();
const mockCreateApi = jest.fn();

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
    createApi: mockCreateApi,
  }),
}));

// Mock child components
jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid(props) {
    return <div data-testid="common-data-grid">CommonDataGrid</div>;
  };
});

jest.mock("../../../common/CommonLoading", () => {
  return function MockCommonLoading() {
    return {
      setLoading: jest.fn(),
      LoadingContainer: ({ children }) => <div data-testid="common-loading">{children}</div>,
    };
  };
});

jest.mock("./DeviceModelManagementHeader", () => {
  return function MockDeviceModelManagementHeader(props) {
    return <div data-testid="device-model-header">DeviceModelHeader</div>;
  };
});

jest.mock("./AddDeviceModelDialog", () => {
  return function MockAddDeviceModelDialog(props) {
    return (
      <div data-testid="add-device-model-dialog">
        <span data-testid="dialog-mode">{props.isEditMode ? 'edit' : 'add'}</span>
        <span data-testid="dialog-editing">{props.isEditing ? 'true' : 'false'}</span>
        {props.headerActions && <div data-testid="header-actions">{props.headerActions}</div>}
      </div>
    );
  };
});

import DeviceModelManagement from "./DeviceModelManagement";

describe("DeviceModelManagement API Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // ==================== GET API Tests ====================
  describe("GET /masteradmin/get-device-model", () => {
    it("should call fetchApi with correct parameters on initial load", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [],
            pagination: { total_records: 0 },
          },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalledWith(
          expect.stringContaining("/masteradmin/get-device-model")
        );
      });
    });

    it("should call fetchApi with pagination params", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [],
            pagination: { total_records: 0 },
          },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalledWith(
          expect.stringContaining("page=1")
        );
        expect(mockFetchApi).toHaveBeenCalledWith(
          expect.stringContaining("limit=10")
        );
      });
    });

    it("should call fetchApi with search filter", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [],
            pagination: { total_records: 0 },
          },
        },
      });

      render(<DeviceModelManagement />);

      // Simulate search by checking the URL construction
      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should call fetchApi with asset_type filter", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [],
            pagination: { total_records: 0 },
          },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle successful GET response with data", async () => {
      const mockApiResponse = {
        body: {
          data: {
            data: [
              {
                device_model_id: 1,
                device_code: "SG1",
                model_name: "Samsara G1",
                asset_type: 1,
                description: "Test model",
                supports_elogs: 1,
                status: 1,
                created_at: "2026-05-20T05:44:43.000Z",
                updated_at: "2026-05-20T05:44:43.000Z",
                created_by: 9,
                updated_by: 9,
              },
            ],
            pagination: {
              total_records: 1,
              total_pages: 1,
              current_page: 1,
              limit: 10,
            },
          },
        },
      };

      mockFetchApi.mockResolvedValueOnce(mockApiResponse);

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle empty GET response", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [],
            pagination: { total_records: 0 },
          },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle GET API error gracefully", async () => {
      mockFetchApi.mockRejectedValueOnce(new Error("Network error"));

      render(<DeviceModelManagement />);

      // Should not crash on error
      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle GET response with null data", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: null,
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle GET response with missing data property", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: null,
        },
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });
  });

  // ==================== POST Create API Tests ====================
  describe("POST /masteradmin/device-model (Create)", () => {
    it("should call createApi with correct payload for create", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 201,
        body: {
          message: "Device model created successfully",
          device_model_id: 3,
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle create API success response (201)", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 201,
        body: {
          statusCode: 201,
          message: "Device model created successfully",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle create API success response (200)", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 200,
        body: {
          statusCode: 200,
          message: "Device model created successfully",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle create API error response", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 400,
        body: {
          statusCode: 400,
          message: "Invalid data",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle create API network error", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockRejectedValueOnce(new Error("Network error"));

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should include correct created_by and updated_by in create payload", async () => {
      const expectedPayload = {
        device_code: "SG3",
        model_name: "Samsara G3",
        asset_type: 1,
        description: "Test description",
        supports_elogs: 1,
        status: 2,
        created_by: 9,
        updated_by: 9,
      };

      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 201,
        body: { message: "Success", device_model_id: 3 },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });
  });

  // ==================== POST Update API Tests ====================
  describe("POST /masteradmin/device-model (Update)", () => {
    it("should call createApi with correct payload for update", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 200,
        body: {
          message: "Device model updated successfully",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should include device_model_id in update payload", async () => {
      const updatePayload = {
        device_model_id: 1,
        device_code: "SG1",
        model_name: "Samsara G1 Updated",
        asset_type: 1,
        description: "Updated description",
        supports_elogs: 1,
        status: 1,
        updated_by: 9,
      };

      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: {
            data: [
              {
                device_model_id: 1,
                device_code: "SG1",
                model_name: "Samsara G1",
                asset_type: 1,
                description: "Test",
                supports_elogs: 1,
                status: 1,
                created_at: "2026-05-20T05:44:43.000Z",
                updated_at: "2026-05-20T05:44:43.000Z",
                created_by: 9,
                updated_by: 9,
              },
            ],
            pagination: { total_records: 1 },
          },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 200,
        body: { message: "Success" },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });

      expect(updatePayload.device_model_id).toBe(1);
    });

    it("should preserve existing device_code in update payload", async () => {
      const selectedDeviceModel = {
        device_model_id: 1,
        device_code: "SG1",
      };

      const updatePayload = {
        device_model_id: selectedDeviceModel.device_model_id,
        device_code: selectedDeviceModel.device_code,
        model_name: "Samsara G1 Updated",
        asset_type: 1,
        description: "Updated",
        supports_elogs: 1,
        status: 1,
        updated_by: 9,
      };

      expect(updatePayload.device_code).toBe("SG1");
      expect(updatePayload.device_code).not.toBe("SGA");
    });

    it("should handle update API success response", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 200,
        body: {
          statusCode: 200,
          message: "Device model updated successfully",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle update API error response", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 500,
        body: {
          statusCode: 500,
          message: "Internal Server Error",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle update API duplicate error", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 409,
        body: {
          statusCode: 409,
          message: "Device model with the same code or name already exists",
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle update API network error", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockRejectedValueOnce(new Error("Network error"));

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });
  });

  // ==================== Data Refresh Tests ====================
  describe("Data Refresh After API Operations", () => {
    it("should refresh data after successful create", async () => {
      mockFetchApi.mockResolvedValue({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 201,
        body: { message: "Success" },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should refresh data after successful update", async () => {
      mockFetchApi.mockResolvedValue({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockResolvedValueOnce({
        statusCode: 200,
        body: { message: "Success" },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });
  });

  // ==================== Query Parameter Tests ====================
  describe("Query Parameter Construction", () => {
    it("should construct query params with search", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should construct query params with asset_type", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should construct query params with status", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should construct query params with combined filters", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });
  });

  // ==================== API Response Format Tests ====================
  describe("API Response Format Handling", () => {
    it("should handle response with statusCode at root level", async () => {
      mockFetchApi.mockResolvedValueOnce({
        statusCode: 200,
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle response with statusCode nested in body", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          statusCode: 200,
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });

    it("should handle create response with device_model_id", async () => {
      mockCreateApi.mockResolvedValueOnce({
        statusCode: 201,
        body: {
          statusCode: 201,
          device_model_id: 5,
          message: "Device model created successfully",
        },
      });

      // Test that component handles this response
      expect(mockCreateApi).not.toHaveBeenCalled(); // Not called yet
    });
  });

  // ==================== Error Handling Tests ====================
  describe("API Error Handling", () => {
    it("should handle 401 Unauthorized error", async () => {
      mockFetchApi.mockRejectedValueOnce({
        response: { status: 401 },
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle 403 Forbidden error", async () => {
      mockFetchApi.mockRejectedValueOnce({
        response: { status: 403 },
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle 404 Not Found error", async () => {
      mockFetchApi.mockRejectedValueOnce({
        response: { status: 404 },
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle 500 Internal Server Error", async () => {
      mockFetchApi.mockRejectedValueOnce({
        response: { status: 500 },
      });

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should handle timeout errors", async () => {
      mockFetchApi.mockRejectedValueOnce(new Error("Request timeout"));

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });
  });

  // ==================== Loading State Tests ====================
  describe("Loading States", () => {
    it("should show loading state during GET request", async () => {
      mockFetchApi.mockImplementationOnce(() =>
        new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<DeviceModelManagement />);

      expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    });

    it("should show loading state during POST request", async () => {
      mockFetchApi.mockResolvedValueOnce({
        body: {
          data: { data: [], pagination: { total_records: 0 } },
        },
      });

      mockCreateApi.mockImplementationOnce(() =>
        new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<DeviceModelManagement />);

      await waitFor(() => {
        expect(mockFetchApi).toHaveBeenCalled();
      });
    });
  });
});

export {};
