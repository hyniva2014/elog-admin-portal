import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeviceModelManagement from "./DeviceModelManagement";
import * as services from "../../../services/services";

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock("../../../services/services");
jest.mock("../../../common/CommonLoading", () => ({
  __esModule: true,
  default: () => ({
    setLoading: jest.fn(),
    LoadingContainer: ({ children }) => <div>{children}</div>,
  }),
}));
jest.mock("../../../common/CommonDataGrid", () => ({
  __esModule: true,
  default: () => <div data-testid="data-grid">Mock Data Grid</div>,
}));
jest.mock("../../../common/CommonDialogForm", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="dialog">{children}</div>,
}));
jest.mock("../../../common/CommonSnackbar", () => ({
  __esModule: true,
  default: () => <div data-testid="snackbar" />,
}));
jest.mock("./DeviceModelManagementHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="header" />,
}));
jest.mock("./DeviceModelManagementForm", () => ({
  __esModule: true,
  default: () => <form data-testid="mock-form">Mock Form</form>,
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

  test("fetches device models on mount", async () => {
    const mockResponse = {
      statusCode: 200,
      body: {
        data: {
          data: [],
          pagination: { total_records: 0 },
        },
      },
    };

    mockFetchApi.mockResolvedValue(mockResponse);
    renderWithTheme(<DeviceModelManagement />);

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        expect.stringContaining("/masteradmin/get-device-model")
      );
    });
  });

  test("renders Add Asset button", async () => {
    mockFetchApi.mockResolvedValue({
      statusCode: 200,
      body: { data: { data: [], pagination: { total_records: 0 } } },
    });

    renderWithTheme(<DeviceModelManagement />);

    const addButton = await screen.findByText(/Add Asset/i);
    expect(addButton).toBeInTheDocument();
  });
});
