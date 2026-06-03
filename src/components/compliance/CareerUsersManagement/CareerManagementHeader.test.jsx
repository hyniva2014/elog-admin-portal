import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import CareerManagementHeader from "./CareerManagementHeader";

const createMockStore = (state) => ({
  getState: () => state,
  subscribe: jest.fn(() => jest.fn()),
  dispatch: jest.fn(),
});

const mockFetchApi = jest.fn();
const mockAddData = jest.fn();
const mockSetData = jest.fn();

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
  }),
}));

jest.mock(
  "../../../common/CommonPageHeader",
  () => (props) => (
    <div data-testid="page-header">
      <span>{props.title}</span>
      {props.rightContent}
    </div>
  ),
);

jest.mock(
  "../../../common/CommonFilters",
  () => (props) => (
    <div data-testid="common-filters">
      Filters
      <span data-testid="filters-count">
        {props.filters?.length}
      </span>
    </div>
  ),
);

jest.mock(
  "../../../common/CommonSummaryCardGroup",
  () => (props) => (
    <div data-testid="summary-cards">
      {props.cards?.length || 0}
    </div>
  ),
);

const createStore = () =>
  createMockStore({
    loginSlice: {
      loginDetails: {
        body: {
          data: {
            userdetails: {
              company_id: 1,
            },
          },
        },
      },
    },
  });

const defaultProps = {
  data: {},
  setData: mockSetData,
  searchKey: 1,
  summaryCards: [
    {
      id: "total",
      title: "Total Users",
      value: 10,
    },
  ],
  addData: mockAddData,
};

const renderComponent = (props = {}) => {
  const store = createStore();

  return render(
    <Provider store={store}>
      <CareerManagementHeader
        {...defaultProps}
        {...props}
      />
    </Provider>,
  );
};

describe("CareerManagementHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockFetchApi.mockResolvedValue({
      body: {
        users: [
          {
            user_id: 1,
            user_name: "John Doe",
          },
          {
            user_id: 2,
            user_name: "Jane Smith",
          },
        ],
      },
    });
  });

  test("renders page title", () => {
    renderComponent();

    expect(
      screen.getByText(
        "Career Users Management",
      ),
    ).toBeInTheDocument();
  });

  test("renders add career user button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /add career user/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls addData on button click", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /add career user/i,
      }),
    );

    expect(mockAddData).toHaveBeenCalledTimes(
      1,
    );
  });

  test("renders summary cards", () => {
    renderComponent();

    expect(
      screen.getByTestId("summary-cards"),
    ).toBeInTheDocument();
  });

  test("renders filters component", () => {
    renderComponent();

    expect(
      screen.getByTestId("common-filters"),
    ).toBeInTheDocument();
  });

  test("passes two filters to CommonFilters", () => {
    renderComponent();

    expect(
      screen.getByTestId("filters-count"),
    ).toHaveTextContent("2");
  });

  test("calls users api on mount", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalledWith(
        "/user/get-users-and-vehicles?company_id=1",
      );
    });
  });

  test("handles api response successfully", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("handles empty users response", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        users: [],
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });
  });

  test("handles api failure gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockFetchApi.mockRejectedValue(
      new Error("API Error"),
    );

    renderComponent();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test("renders page header component", () => {
    renderComponent();

    expect(
      screen.getByTestId("page-header"),
    ).toBeInTheDocument();
  });

  test("renders summary cards count correctly", () => {
    renderComponent({
      summaryCards: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    });

    expect(
      screen.getByTestId("summary-cards"),
    ).toHaveTextContent("3");
  });
});