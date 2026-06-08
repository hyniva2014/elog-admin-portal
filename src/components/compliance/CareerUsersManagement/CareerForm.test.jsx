import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CareerForm from "./CareerForm";

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

jest.mock(
  "../../../common/CommonSnackbar",
  () => (props) => (props.open ? <div>{props.message}</div> : null),
);

jest.mock("../../../common/CommonBreadcrumb", () => () => (
  <div data-testid="breadcrumb" />
));

jest.mock("./CareerUserForm", () => (props) => (
  <div data-testid="career-user-form">
    CareerUserForm
    {props.headerOnly ? " Header" : " Content"}
  </div>
));

jest.mock("./HeaderComponents/UserAddHeader", () => () => (
  <div data-testid="user-add-header">UserAddHeader</div>
));

jest.mock("./HeaderComponents/UserTopHeader", () => () => (
  <div data-testid="user-top-header">UserTopHeader</div>
));

const createStore = () =>
  createMockStore({
    loginSlice: {
      loginDetails: {
        body: {
          data: {
            userdetails: {
              company_id: 1,
              carrier_id: 1,
              user_id: 1,
              name: "Admin User",
            },
          },
        },
      },
    },
  });

const renderComponent = (route = "/carrier-users/add") => {
  const store = createStore();

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/carrier-users/add" element={<CareerForm />} />
          <Route path="/carrier-users/edit/:userId" element={<CareerForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("CareerForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders add mode correctly", () => {
    renderComponent();

    expect(screen.getByTestId("user-add-header")).toBeInTheDocument();

    expect(screen.getByTestId("career-user-form")).toBeInTheDocument();
  });

  test("renders loading container", () => {
    renderComponent();

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  test("renders form component", () => {
    renderComponent();

    expect(screen.getAllByTestId("career-user-form").length).toBeGreaterThan(0);
  });

  test("fetches user data in edit mode", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 525,
            first_name: "John",
            last_name: "Doe",
            role_id: 2,
          },
        ],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("renders top header in edit mode", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 525,
            first_name: "John",
            last_name: "Doe",
          },
        ],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(screen.getByTestId("user-top-header")).toBeInTheDocument();
    });
  });

  test("calls superuser api in edit mode", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 525,
          },
        ],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        expect.stringContaining("/masteradmin/superuser/get-superusers"),
      );
    });
  });

  test("handles empty user response", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("handles fetch api error", async () => {
    mockFetchApi.mockRejectedValue(new Error("API Error"));

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("renders edit form content section", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 525,
          },
        ],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(screen.getAllByTestId("career-user-form").length).toBeGreaterThan(
        0,
      );
    });
  });

  test("renders step labels in edit mode", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 525,
          },
        ],
      },
    });

    renderComponent("/carrier-users/edit/525");

    await waitFor(() => {
      expect(screen.getByText("1. Basic Info")).toBeInTheDocument();

      expect(screen.getByText("2. Contact Info")).toBeInTheDocument();

      expect(screen.getByText("3. Employment")).toBeInTheDocument();

      expect(screen.getByText("4. Prior History")).toBeInTheDocument();

      expect(screen.getByText("5. Documents")).toBeInTheDocument();
    });
  });
});
