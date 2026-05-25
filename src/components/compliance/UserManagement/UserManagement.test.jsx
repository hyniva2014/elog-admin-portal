import React from "react";

import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import UserManagement from "./UserManagement";

// Mock APIs
const mockFetchApi = jest.fn();
const mockCreateApi = jest.fn();

// Mock services
jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
    createApi: mockCreateApi,
  }),
}));

// Mock Loading
jest.mock("../../../common/CommonLoading", () => () => ({
  LoadingContainer: () => (
    <div>Loading...</div>
  ),
}));

// Mock DataGrid
jest.mock(
  "@src/common/CommonDataGrid",
  () => (props) => (
    <div data-testid="datagrid">
      {props.rowData?.map((row) => (
        <div key={row.user_id}>
          {row.user_name}
        </div>
      ))}
    </div>
  )
);

// Mock Header
jest.mock(
  "./UserManagementHeader",
  () => (props) => (
    <div>
      <button onClick={props.handleClick}>
        Add User
      </button>
    </div>
  )
);

// Mock Form
jest.mock(
  "./UserManagementForm",
  () => (props) =>
    props.open ? (
      <div data-testid="user-form">
        <button
          onClick={() =>
            props.onSubmitForm({
              firstName: "John",
              lastName: "Doe",
              email: "john@test.com",
              company_id: "1",
              role_id: "1",
              status_id: "1",
            })
          }
        >
          Submit
        </button>

        <button onClick={props.onClose}>
          Close
        </button>
      </div>
    ) : null
);

// Mock Snackbar
jest.mock(
  "../../../common/CommonSnackbar",
  () => (props) =>
    props.open ? (
      <div data-testid="snackbar">
        {props.message}
      </div>
    ) : null
);

// Mock PageContainer
jest.mock(
  "../../../common/PageContainer",
  () => ({
    PageContainer: ({
      children,
    }) => <div>{children}</div>,
  })
);

// Mock utils
jest.mock(
  "./CommonRowColumnUtils",
  () => ({
    UserManagementColumnData: [],
    mapUserToRow: (user) => ({
      ...user,
    }),
  })
);

jest.mock(
  "../../../common/CommonUtils",
  () => ({
    buildSummaryCards: jest.fn(
      () => []
    ),
  })
);

jest.mock(
  "./Constants",
  () => ({
    USER_SUMMARY_CARDS: [],
  })
);

describe("UserManagement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component and fetches users", async () => {
    mockFetchApi.mockResolvedValueOnce({
      body: {
        data: [
          {
            user_id: 1,
            user_name: "Test User",
          },
        ],
        pagination: {
          total_records: 1,
        },
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    await waitFor(() => {
      expect(
        mockFetchApi
      ).toHaveBeenCalled();
    });

    expect(
      screen.getByText("Test User")
    ).toBeInTheDocument();
  });

  test("shows error snackbar when fetch fails", async () => {
    mockFetchApi.mockRejectedValueOnce(
      new Error("API Error")
    );

    await act(async () => {
      render(<UserManagement />);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch users."
        )
      ).toBeInTheDocument();
    });
  });

  test("opens form when Add User clicked", async () => {
    mockFetchApi.mockResolvedValueOnce({
      body: {
        data: [],
        pagination: {},
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    expect(
      screen.getByTestId("user-form")
    ).toBeInTheDocument();
  });

  test("closes form correctly", async () => {
    mockFetchApi.mockResolvedValueOnce({
      body: {
        data: [],
        pagination: {},
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    expect(
      screen.getByTestId("user-form")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close",
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId(
          "user-form"
        )
      ).not.toBeInTheDocument();
    });
  });

  test("creates user successfully", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        data: [],
        pagination: {},
      },
    });

    mockCreateApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        message:
          "User created successfully",
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );

    await waitFor(() => {
      expect(
        mockCreateApi
      ).toHaveBeenCalled();
    });

    expect(
      screen.getByText(
        "User created successfully"
      )
    ).toBeInTheDocument();
  });

  test("shows error when create user fails", async () => {
    mockFetchApi.mockResolvedValue({
      body: {
        data: [],
        pagination: {},
      },
    });

    mockCreateApi.mockRejectedValueOnce({
      response: {
        data: {
          body: {
            message:
              "User creation failed",
          },
        },
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "User creation failed"
        )
      ).toBeInTheDocument();
    });
  });

  test("handles empty users list", async () => {
    mockFetchApi.mockResolvedValueOnce({
      body: {
        data: [],
        pagination: {
          total_records: 0,
        },
      },
    });

    await act(async () => {
      render(<UserManagement />);
    });

    await waitFor(() => {
      expect(
        mockFetchApi
      ).toHaveBeenCalled();
    });

    expect(
      screen.getByTestId("datagrid")
    ).toBeInTheDocument();
  });

  test("shows fallback error message", async () => {
    mockFetchApi.mockRejectedValueOnce(
      new Error()
    );

    await act(async () => {
      render(<UserManagement />);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch users."
        )
      ).toBeInTheDocument();
    });
  });
});