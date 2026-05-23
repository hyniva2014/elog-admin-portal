import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

// Mock services before importing component
jest.mock("../../../services/services", () => ({
  useServices: jest.fn(),
}));

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
  default: ({ onAddClick }) => (
    <div data-testid="header">
      <button onClick={onAddClick}>Add Asset</button>
    </div>
  ),
}));

jest.mock("./DeviceModelManagementForm", () => ({
  __esModule: true,
  default: () => <form data-testid="mock-form">Mock Form</form>,
}));

import DeviceModelManagement from "./DeviceModelManagement";
import { useServices } from "../../../services/services";

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("DeviceModelManagement", () => {
  const mockFetchApi = jest.fn();
  const mockCreateApi = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useServices.mockReturnValue({
      fetchApi: mockFetchApi,
      createApi: mockCreateApi,
    });
  });

  test("component renders without crashing", async () => {
    mockFetchApi.mockResolvedValue({
      statusCode: 200,
      body: {
        data: {
          data: [],
          pagination: { total_records: 0 },
        },
      },
    });

    renderWithTheme(<DeviceModelManagement />);
    
    await waitFor(() => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
  });

  test("Add Asset button is clickable", async () => {
    mockFetchApi.mockResolvedValue({
      statusCode: 200,
      body: { data: { data: [], pagination: { total_records: 0 } } },
    });

    renderWithTheme(<DeviceModelManagement />);

    await waitFor(() => {
      const addButton = screen.getByText(/Add Asset/i);
      expect(addButton).toBeInTheDocument();
    });
  });
});
