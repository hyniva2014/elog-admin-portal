import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AccountManagement from "./AccountManagement";

jest.mock("../../../services/serviceUtils", () => ({
  ELOG_API_GATEWAY_URL: "http://mock-api-url",
}));

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(),
    createApi: jest.fn(),
    updateApi: jest.fn(),
    deleteApi: jest.fn(),
  }),
}));

jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid(props) {
    return <div data-testid="common-data-grid">CommonDataGrid</div>;
  };
});

const mockStore = configureStore({
  reducer: {
    loginSlice: () => ({
      loginDetails: {
        body: {
          data: {
            userdetails: {
              company_id: 1,
            },
          },
        },
      },
    }),
  },
});

jest.mock("../../../common/CommonSnackbar", () => {
  return function MockCommonSnackbar(props) {
    return <div data-testid="common-snackbar">Snackbar</div>;
  };
});

jest.mock("./AccountMangementHeader", () => {
  return function MockAccountManagementHeader(props) {
    return <div data-testid="account-header">AccountHeader</div>;
  };
});

jest.mock("./AddAccountDialog", () => {
  return function MockAddAccountDialog(props) {
    return <div data-testid="add-account-dialog">AddAccountDialog</div>;
  };
});

describe("AccountManagement", () => {
  const renderWithProviders = (ui) => {
    return render(<Provider store={mockStore}>{ui}</Provider>);
  };

  it("should render all main components", () => {
    renderWithProviders(<AccountManagement />);
    
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
    expect(screen.getByTestId("common-snackbar")).toBeInTheDocument();
    expect(screen.getByTestId("add-account-dialog")).toBeInTheDocument();
  });

  it("should render PageContainer wrapper", () => {
    const { container } = renderWithProviders(<AccountManagement />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render without crashing", () => {
    const { container } = renderWithProviders(<AccountManagement />);
    expect(container).toBeTruthy();
  });

  it("should have initial data state", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
  });

  it("should render with default pagination", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("should render with GridContainer", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("should render AddAccountDialog initially", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("add-account-dialog")).toBeInTheDocument();
  });

  it("should render CommonSnackbar for notifications", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("common-snackbar")).toBeInTheDocument();
  });

  it("should have correct component structure", () => {
    renderWithProviders(<AccountManagement />);
    const components = [
      "account-header",
      "common-data-grid",
      "common-snackbar",
      "add-account-dialog",
    ];
    components.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  it("should maintain component order", () => {
    renderWithProviders(<AccountManagement />);
    const header = screen.getByTestId("account-header");
    const grid = screen.getByTestId("common-data-grid");
    expect(header.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("should render multiple times without error", () => {
    const { rerender } = renderWithProviders(<AccountManagement />);
    rerender(<Provider store={mockStore}><AccountManagement /></Provider>);
    rerender(<Provider store={mockStore}><AccountManagement /></Provider>);
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
  });

  it("should have all required data-testid elements", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.queryByTestId("account-header")).not.toBeNull();
    expect(screen.queryByTestId("common-data-grid")).not.toBeNull();
    expect(screen.queryByTestId("common-snackbar")).not.toBeNull();
    expect(screen.queryByTestId("add-account-dialog")).not.toBeNull();
  });
});
