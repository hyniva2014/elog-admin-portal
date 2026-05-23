import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeviceModelManagement from "./DeviceModelManagement";
import * as services from "../../../services/services";

jest.mock("../../../services/services");
jest.mock("../../../common/CommonLoading", () => ({
  __esModule: true,
  default: () => ({
    setLoading: jest.fn(),
    LoadingContainer: () => <div data-testid="loading-container" />,
  }),
}));

describe("DeviceModelManagement", () => {
  const mockFetchApi = jest.fn();
  const mockCreateApi = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    services.useServices.mockReturnValue({
      fetchApi: mockFetchApi,
      createApi: mockCreateApi,
    });
  });

  test("fetches and displays device models on mount", async () => {
    const mockResponse = {
      statusCode: 200,
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
              created_at: "2026-05-23T10:45:36.000Z",
              updated_at: "2026-05-23T10:45:36.000Z",
            },
          ],
          pagination: { total_records: 1 },
        },
      },
    };

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    render(<DeviceModelManagement />);

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        expect.stringContaining("/masteradmin/get-device-model")
      );
    });
  });

  test("creates device model with correct payload", async () => {
    mockFetchApi.mockResolvedValue({
      statusCode: 200,
      body: { data: { data: [], pagination: { total_records: 0 } } },
    });

    mockCreateApi.mockResolvedValue({
      statusCode: 200,
      body: { message: "Success" },
    });

    render(<DeviceModelManagement />);

    const addButton = await screen.findByText(/Add Asset/i);
    fireEvent.click(addButton);

    await userEvent.type(screen.getByLabelText(/Model Name/i), "Test Model");
    await userEvent.type(screen.getByLabelText(/Description/i), "Description");

    const assetType = screen.getByLabelText(/Asset Type/i);
    await userEvent.click(assetType);
    await userEvent.click(screen.getByText("Truck"));

    const eLogs = screen.getByLabelText(/E-Logs/i);
    await userEvent.click(eLogs);
    await userEvent.click(screen.getByText("Yes"));

    fireEvent.click(screen.getByText(/Add Device/i));

    await waitFor(() => {
      expect(mockCreateApi).toHaveBeenCalledWith(
        expect.objectContaining({
          model_name: "Test Model",
          asset_type: 1,
          supports_elogs: 1,
          created_by: 9,
          updated_by: 9,
        }),
        "/masteradmin/device-model"
      );
    });
  });
});
