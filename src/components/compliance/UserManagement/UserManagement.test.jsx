import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import UserManagement from "./UserManagement";

import {
  getUsers,
  getUserDetails,
  onboardUser,
  getCompaniesDropdown,
} from "./userManagementService";

import { useServices } from "../../../services/services";

jest.mock("./userManagementService", () => ({
  getUsers: jest.fn(),
  getUserDetails: jest.fn(),
  onboardUser: jest.fn(),
  getCompaniesDropdown: jest.fn(),
}));

jest.mock("../../../services/services", () => ({
  useServices: jest.fn(),
}));

jest.mock("@src/common/CommonDataGrid", () => {
  return function MockGrid(props) {
    return (
      <div data-testid="grid">
        {props?.rowData?.map((row) => (
          <div key={row.id}>
            <span>{row.firstName}</span>

            <button
              onClick={() => {
                const actionColumn = props.columnsData.find(
                  (c) => c.field === "action",
                );

                actionColumn?.onView?.(row);
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock("./UserManagementHeader", () => {
  return function MockHeader(props) {
    return <button onClick={props.handleClick}>Add User</button>;
  };
});

jest.mock("./UserManagementForm", () => {
  return function MockForm(props) {
    if (!props.open) return null;

    return (
      <div>
        <div>User Form</div>

        <button
          onClick={() =>
            props.onSubmitForm({
              company_id: "7",
              role_id: "1",
              firstName: "John",
              lastName: "Doe",
              email: "john@test.com",
              password: "test@123",
              status_id: "1",
            })
          }
        >
          Submit Form
        </button>

        <button onClick={props.onClose}>Close Form</button>
      </div>
    );
  };
});

jest.mock("../../../common/CommonSnackbar", () => {
  return function MockSnackbar(props) {
    return props.open ? <div>{props.message}</div> : null;
  };
});

jest.mock("../../../common/CommonLoading", () => {
  return () => ({
    setLoading: jest.fn(),
    LoadingContainer: () => <div>Loading</div>,
  });
});

jest.mock("../../../common/PageContainer", () => ({
  PageContainer: ({ children }) => <div>{children}</div>,
}));

const mockUsersResponse = {
  body: {
    total_users: 1,
    active_users: 1,
    inactive_users: 0,

    pagination: {
      total_records: 1,
    },

    data: [
      {
        user_id: 1,
        company_id: 7,
        company_name: "TrackPulse Logistics",

        role_id: 1,
        user_profile: "Admin",

        first_name: "John",
        last_name: "Doe",

        email: "john@test.com",

        status_id: 1,
        status: "Active",

        created_at: "2026-05-25T10:00:00.000Z",

        updated_at: "2026-05-25T10:00:00.000Z",
      },
    ],
  },
};

const mockUserDetailsResponse = {
  body: {
    data: {
      user_id: 1,
      company_id: 7,
      company_name: "TrackPulse Logistics",

      role_id: 1,
      user_profile: "Admin",

      first_name: "John",
      last_name: "Doe",

      email: "john@test.com",

      status_id: 1,
    },
  },
};

const mockCompaniesResponse = {
  body: {
    data: [
      {
        company_id: 7,
        company_name: "TrackPulse Logistics",
      },
    ],
  },
};

describe("UserManagement", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useServices.mockReturnValue({
      fetchApi: jest.fn(),
      createApi: jest.fn(),
    });

    getUsers.mockResolvedValue(mockUsersResponse);

    getUserDetails.mockResolvedValue(mockUserDetailsResponse);

    onboardUser.mockResolvedValue({
      body: {
        message: "User created successfully",
      },
    });

    getCompaniesDropdown.mockResolvedValue(mockCompaniesResponse);
  });

  test("renders component successfully", async () => {
    render(<UserManagement />);

    expect(screen.getByText("Loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalled();
    });
  });

  test("fetches users on initial render", async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalledTimes(1);
    });
  });

  test("fetches companies on mount", async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(getCompaniesDropdown).toHaveBeenCalledTimes(1);
    });
  });

  test("renders fetched users in grid", async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  test("opens add user form", async () => {
    render(<UserManagement />);

    fireEvent.click(screen.getByText("Add User"));

    expect(screen.getByText("User Form")).toBeInTheDocument();
  });

  test("creates user successfully", async () => {
    render(<UserManagement />);

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(onboardUser).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("User created successfully")).toBeInTheDocument();
  });

  test("handles create user failure", async () => {
    onboardUser.mockRejectedValue(new Error("Create failed"));

    render(<UserManagement />);

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(screen.getByText("Create failed")).toBeInTheDocument();
    });
  });

  test("opens user details on view click", async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View"));

    await waitFor(() => {
      expect(getUserDetails).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("User Form")).toBeInTheDocument();
  });

  test("handles get user details failure", async () => {
    getUserDetails.mockRejectedValue(new Error("Failed to fetch user details"));

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View"));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch user details"),
      ).toBeInTheDocument();
    });
  });

  test("updates user successfully", async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View"));

    await waitFor(() => {
      expect(screen.getByText("User Form")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(onboardUser).toHaveBeenCalled();
    });
  });

  test("handles update user failure", async () => {
    onboardUser.mockRejectedValue(new Error("Failed to update user"));

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View"));

    await waitFor(() => {
      expect(screen.getByText("User Form")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(screen.getByText("Failed to update user")).toBeInTheDocument();
    });
  });

  test("handles fetch users failure", async () => {
    getUsers.mockRejectedValue(new Error("Failed to fetch users"));

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch users.")).toBeInTheDocument();
    });
  });

  test("handles fetch companies failure", async () => {
    getCompaniesDropdown.mockRejectedValue(
      new Error("Failed to fetch companies"),
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch companies")).toBeInTheDocument();
    });
  });

  test("closes form correctly", async () => {
    render(<UserManagement />);

    fireEvent.click(screen.getByText("Add User"));

    expect(screen.getByText("User Form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Form"));

    await waitFor(() => {
      expect(screen.queryByText("User Form")).not.toBeInTheDocument();
    });
  });

  test("shows snackbar after successful creation", async () => {
    render(<UserManagement />);

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(screen.getByText("User created successfully")).toBeInTheDocument();
    });
  });
});
