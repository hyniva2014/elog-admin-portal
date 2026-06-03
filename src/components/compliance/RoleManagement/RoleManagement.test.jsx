import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RoleManagement from "./RoleManagement";

import {
  fetchRolesApi,
  fetchRoleByIdApi,
  saveRoleApi,
} from "./RolePermissionsApi";

import { useServices } from "../../../services/services";

const mockSetLoading = jest.fn();

jest.mock("../../../services/services", () => ({
  useServices: jest.fn(),
}));

jest.mock("./RolePermissionsApi", () => ({
  fetchRolesApi: jest.fn(),
  fetchRoleByIdApi: jest.fn(),
  saveRoleApi: jest.fn(),
}));

jest.mock("@mui/material/styles", () => ({
  ...jest.requireActual("@mui/material/styles"),
  useTheme: () => ({
    palette: {
      brand: {
        main: "#284495",
      },
    },
  }),
}));

jest.mock("./RoleCard", () => ({ role, onEdit }) => (
  <div data-testid="role-card">
    <span>{role.title}</span>

    <button onClick={() => onEdit(role)}>
      Edit Role
    </button>
  </div>
));

jest.mock("./RoleManagementForm", () => ({
  __esModule: true,
  default: ({ onSubmit }) => (
    <div data-testid="role-form">
      <button
        onClick={() =>
          onSubmit({
            title: "Admin",
            description: "Admin Description",
            status: 1,
          })
        }
      >
        Submit Form
      </button>
    </div>
  ),
}));

jest.mock("../../../common/CommonDialogForm", () => ({
  __esModule: true,
  default: ({
    open,
    title,
    submitButtonText,
    content,
  }) =>
    open ? (
      <div data-testid="dialog-form">
        <h1>{title}</h1>

        <span>{submitButtonText}</span>

        {content}
      </div>
    ) : null,
}));

jest.mock("../../../common/CommonLoading", () => () => ({
  setLoading: mockSetLoading,
  LoadingContainer: () => <div>Loading...</div>,
}));

jest.mock("../../../common/CommonSnackbar", () => ({
  __esModule: true,
  default: ({ open, message }) =>
    open ? <div>{message}</div> : null,
}));

describe("RoleManagement Component", () => {
  const mockFetchApi = jest.fn();

  const mockCreateApi = jest.fn();

  const mockRoles = [
    {
      id: 1,
      name: "Admin",
      description: "Administrator Role",
      user_count: 5,
      status: 1,
    },
    {
      id: 2,
      name: "Manager",
      description: "Manager Role",
      user_count: 2,
      status: 0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    useServices.mockReturnValue({
      fetchApi: mockFetchApi,
      createApi: mockCreateApi,
    });

    fetchRolesApi.mockResolvedValue(mockRoles);

    fetchRoleByIdApi.mockResolvedValue({
      id: 1,
      name: "Admin",
      description: "Administrator Role",
      status: 1,
    });

    saveRoleApi.mockResolvedValue({
      statusCode: 201,
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <RoleManagement />
      </MemoryRouter>,
    );

  test("renders page title correctly", async () => {
    renderComponent();

    expect(
      screen.getByText("Roles Overview"),
    ).toBeInTheDocument();
  });

  test("fetches and renders roles", async () => {
    renderComponent();

    await waitFor(() => {
      expect(fetchRolesApi).toHaveBeenCalled();
    });

    expect(screen.getByText("Admin")).toBeInTheDocument();

    expect(screen.getByText("Manager")).toBeInTheDocument();
  });

  test("opens add role dialog when Add Role clicked", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    expect(
      screen.getByText("Add Role"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Save"),
    ).toBeInTheDocument();
  });

  test("opens edit dialog when Edit Role clicked", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText("Edit Role")[0])
        .toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Edit Role")[0]);

    await waitFor(() => {
      expect(fetchRoleByIdApi).toHaveBeenCalledWith(
        mockFetchApi,
        1,
      );
    });

    expect(
      screen.getByText("Edit Role"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Update"),
    ).toBeInTheDocument();
  });

  test("calls saveRoleApi on form submit", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(saveRoleApi).toHaveBeenCalledWith(
        mockCreateApi,
        {
          is_superuser: 1,
          name: "Admin",
          description: "Admin Description",
          is_system_role: false,
          status: 1,
        },
      );
    });
  });

  test("shows success snackbar after successful save", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(
        screen.getByText("Role created successfully"),
      ).toBeInTheDocument();
    });
  });

  test("shows warning snackbar for failed response", async () => {
    saveRoleApi.mockResolvedValue({
      statusCode: 400,
      body: {
        message: "Something went wrong",
      },
    });

    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong"),
      ).toBeInTheDocument();
    });
  });

  test("shows error snackbar when fetchRolesApi fails", async () => {
    fetchRolesApi.mockRejectedValue(
      new Error("Fetch Error"),
    );

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch roles"),
      ).toBeInTheDocument();
    });
  });

  test("handles saveRoleApi error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    saveRoleApi.mockRejectedValue(
      new Error("Save Error"),
    );

    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test("calls loading handlers during api calls", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalled();
    });
  });

  test("renders role cards correctly", async () => {
    renderComponent();

    await waitFor(() => {
      const roleCards =
        screen.getAllByTestId("role-card");

      expect(roleCards).toHaveLength(2);
    });
  });

  test("matches snapshot", async () => {
    const { asFragment } = renderComponent();

    await waitFor(() => {
      expect(fetchRolesApi).toHaveBeenCalled();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
