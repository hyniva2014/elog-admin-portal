import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CareerManagement from "./CareerManagement";

const createMockStore = (state) => ({
  getState: () => state,
  subscribe: jest.fn(() => jest.fn()),
  dispatch: jest.fn(),
});

const mockFetchApi = jest.fn();
const mockCreateApi = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: null,
  }),
  useSearchParams: () => [new URLSearchParams()],
}));

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
    createApi: mockCreateApi,
  }),
}));

jest.mock("../../../common/CommonLoading", () => () => ({
  setLoading: jest.fn(),
  LoadingContainer: () => <div data-testid="loading-container" />,
}));

jest.mock("../../../common/PageContainer", () => ({
  PageContainer: ({ children }) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

jest.mock("../../../common/CommonUtils", () => ({
  buildSummaryCards: jest.fn(() => []),
}));

jest.mock("../../../common/CommonDataGrid", () => (props) => (
  <div data-testid="data-grid">Grid Rows : {props.rowData?.length}</div>
));

jest.mock("./CareerManagementHeader", () => (props) => (
  <button data-testid="add-user-btn" onClick={props.addData}>
    Add User
  </button>
));

jest.mock(
  "../../../common/CommonSnackbar",
  () => (props) => (props.open ? <div>{props.message}</div> : null),
);

jest.mock(
  "../../../common/CommonConfirmDialog",
  () => (props) =>
    props.open ? <div data-testid="confirm-dialog">{props.title}</div> : null,
);

jest.mock("../../../common/CommonNoAccess", () => () => (
  <div data-testid="no-access">No Access</div>
));

jest.mock("./CommonRowColumnUtils", () => ({
  UserManagementTableData: jest.fn(() => ({
    UserManagementColumnData: [],
    UserManagementRowData: [
      {
        user_id: 1,
        username: "John Doe",
      },
    ],
  })),
}));

const createStore = () =>
  createMockStore({
    loginSlice: {
      loginDetails: {
        body: {
          data: {
            userdetails: {
              company_id: 1,
              role_id: 1,
              user_id: 100,
            },
          },
        },
      },
    },
  });

const renderComponent = () => {
  const store = createStore();

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CareerManagement />
      </MemoryRouter>
    </Provider>,
  );
};

describe("CareerManagement", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 1,
            user_name: "John Doe",
          },
        ],
        total_records: 1,
      },
    });
  });

  test("renders component successfully", async () => {
    renderComponent();

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();

    expect(screen.getByTestId("page-container")).toBeInTheDocument();
  });

  test("calls get users api on load", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("renders data grid", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("data-grid")).toBeInTheDocument();
    });
  });

  test("renders add button", () => {
    renderComponent();

    expect(screen.getByTestId("add-user-btn")).toBeInTheDocument();
  });

  test("navigates to add user page", () => {
    jest.useFakeTimers();

    renderComponent();

    fireEvent.click(screen.getByTestId("add-user-btn"));

    jest.advanceTimersByTime(300);

    expect(mockNavigate).toHaveBeenCalledWith("/carrier-users/add");

    jest.useRealTimers();
  });

  test("handles api success response", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("handles api failure", async () => {
    mockFetchApi.mockRejectedValue(new Error("API Error"));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
    });
  });

  test("fetches superusers endpoint", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        expect.stringContaining("/masteradmin/superuser/get-superusers"),
      );
    });
  });

  test("renders snackbar message", async () => {
    mockFetchApi.mockRejectedValue(new Error("API Error"));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
    });
  });

  test("renders grid after successful response", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Grid Rows/i)).toBeInTheDocument();
    });
  });
});
