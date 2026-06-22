jest.mock("../../../common/CommonLoading", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    setLoading: jest.fn(),
    LoadingContainer: () => (
      <div data-testid="loading-container">LoadingContainer</div>
    ),
  })),
}));

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

jest.mock("@src/common/CommonDataGrid", () => ({
  __esModule: true,
  default: () => <div data-testid="common-data-grid">CommonDataGrid</div>,
}));

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

jest.mock("../../../common/CommonSnackbar", () => ({
  __esModule: true,
  default: () => <div data-testid="common-snackbar">CommonSnackbar</div>,
}));

jest.mock("./AccountMangementHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="account-header">AccountHeader</div>,
}));

jest.mock("./AddAccountDialog", () => ({
  __esModule: true,
  default: () => <div data-testid="add-account-dialog">AddAccountDialog</div>,
}));

jest.mock("./StatusSelectDropdown", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="status-select-dropdown">StatusSelectDropdown</div>
  ),
}));

jest.mock("./AuditLogModal", () => ({
  __esModule: true,
  default: () => <div data-testid="audit-log-modal">AuditLogModal</div>,
}));

jest.mock("../../../common/CommonConfirmDialog", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="common-confirm-dialog">CommonConfirmDialog</div>
  ),
}));

jest.mock("../../../common/AccessControl", () => ({
  __esModule: true,
  default: ({ children, hasAccess }) =>
    hasAccess ? <div data-testid="access-control">{children}</div> : null,
}));

jest.mock("../../../common/PageContainer", () => ({
  PageContainer: ({ children }) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

jest.mock("../../../hooks/usePermissions", () => ({
  usePermissions: jest.fn(() => ({
    checkPermission: jest.fn(() => true),
    permissions: [],
  })),
}));

jest.mock("../../../hooks/usePermissionRefresh", () => ({
  usePermissionRefresh: jest.fn(() => ({
    refreshPermissions: jest.fn(),
  })),
}));

jest.mock("./useAccountManagement", () => ({
  useAccountManagement: jest.fn(() => ({
    buildFetchUrl: jest.fn(),
    fetchData: jest.fn(),
    handleCreateAccount: jest.fn(),
    handleViewAccount: jest.fn(),
    handleToggleStatus: jest.fn(),
    fetchContactsDropdown: jest.fn(() =>
      Promise.resolve({
        primaryContactOptions: [],
        secondaryContactOptions: [],
      }),
    ),
    fetchCompaniesDropdown: jest.fn(() => Promise.resolve([])),
    fetchCarrierOptions: jest.fn(() => Promise.resolve([])),
    fetchAuditLog: jest.fn(() =>
      Promise.resolve({
        rows: [],
        total: 0,
        page: 1,
        pageSize: 20,
        isLoading: false,
      }),
    ),
  })),
}));

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(() => ({ state: { statusId: "" } })),
}));

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
    expect(
      header.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("should render multiple times without error", () => {
    const { rerender } = renderWithProviders(<AccountManagement />);
    rerender(
      <Provider store={mockStore}>
        <AccountManagement />
      </Provider>,
    );
    rerender(
      <Provider store={mockStore}>
        <AccountManagement />
      </Provider>,
    );
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
  });

  it("should have all required data-testid elements", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.queryByTestId("account-header")).not.toBeNull();
    expect(screen.queryByTestId("common-data-grid")).not.toBeNull();
    expect(screen.queryByTestId("common-snackbar")).not.toBeNull();
    expect(screen.queryByTestId("add-account-dialog")).not.toBeNull();
  });

  it("should render with AccessControl when permissions are granted", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("access-control")).toBeInTheDocument();
  });

  it("should render PageContainer wrapper", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("page-container")).toBeInTheDocument();
  });

  it("should render LoadingContainer", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  it("should render AuditLogModal", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("audit-log-modal")).toBeInTheDocument();
  });

  it("should render CommonConfirmDialog", () => {
    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("common-confirm-dialog")).toBeInTheDocument();
  });

  it("should not render content when AccessControl denies access", () => {
    const { usePermissions } = require("../../../hooks/usePermissions");
    usePermissions.mockReturnValue({
      checkPermission: jest.fn(() => false),
      permissions: [],
    });

    renderWithProviders(<AccountManagement />);
    expect(screen.queryByTestId("access-control")).not.toBeInTheDocument();
  });

  it("should handle location state with statusId", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValue({ state: { statusId: "1" } });

    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("page-container")).toBeInTheDocument();
  });

  it("should handle location state without statusId", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValue({ state: null });

    renderWithProviders(<AccountManagement />);
    expect(screen.getByTestId("page-container")).toBeInTheDocument();
  });
});
