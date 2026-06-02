import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import RolePermissions from "./RolePermissions";

import {
  fetchRoleDetailsApi,
  syncRolePermissionsApi,
} from "./RolePermissionsApi";

import { useServices } from "../../../services/services";

const mockNavigate = jest.fn();

const mockSetLoading = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({
    roleId: "1",
  }),
}));

jest.mock("../../../services/services", () => ({
  useServices: jest.fn(),
}));

jest.mock("./RolePermissionsApi", () => ({
  fetchRoleDetailsApi: jest.fn(),
  syncRolePermissionsApi: jest.fn(),
}));

jest.mock("./PermissionCardItem", () => (props) => (
  <div data-testid={`permission-card-${props.module}`}>
    <button onClick={props.onEnableAll(props.module)}>
      Enable All
    </button>

    <button onClick={props.onDisableAll(props.module)}>
      Disable All
    </button>

    <button onClick={props.onToggle(props.module, 0)}>
      Toggle
    </button>
  </div>
));

jest.mock("../../../common/CommonLoading", () => () => ({
  setLoading: mockSetLoading,
  LoadingContainer: () => <div>Loading...</div>,
}));

jest.mock("../../../common/CommonTextField", () => (props) => (
  <input
    data-testid={props.label}
    value={props.value || ""}
    disabled={props.disabled}
    readOnly
  />
));

jest.mock("../../../common/CommonSnackbar", () => ({
  __esModule: true,
  default: ({ open, message }) =>
    open ? <div>{message}</div> : null,
}));

describe("RolePermissions Component", () => {
  const mockFetchApi = jest.fn();

  const mockCreateApi = jest.fn();

  const mockRoleResponse = {
    name: "Admin",
    description: "Administrator Role",
    permissions: [
      {
        id: 1,
        module: "Users",
        is_enabled: 1,
      },
      {
        id: 2,
        module: "Users",
        is_enabled: 0,
      },
      {
        id: 3,
        module: "Claims",
        is_enabled: 1,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.useFakeTimers();

    useServices.mockReturnValue({
      fetchApi: mockFetchApi,
      createApi: mockCreateApi,
    });

    fetchRoleDetailsApi.mockResolvedValue(
      mockRoleResponse,
    );

    syncRolePermissionsApi.mockResolvedValue({
      statusCode: 200,
      body: {
        message:
          "Role permissions updated successfully",
      },
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();

    jest.useRealTimers();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <RolePermissions />
      </MemoryRouter>,
    );

  test("renders page title and subtitle", () => {
    renderComponent();

    expect(
      screen.getByText("Add Permission"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Role details"),
    ).toBeInTheDocument();
  });

  test("fetches and displays role details", async () => {
    renderComponent();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });

    expect(
      screen.getByTestId("Enter Role Name"),
    ).toHaveValue("Admin");

    expect(
      screen.getByTestId("Description"),
    ).toHaveValue("Administrator Role");
  });

  test("renders permission cards correctly", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByTestId(
          "permission-card-Users",
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByTestId(
          "permission-card-Claims",
        ),
      ).toBeInTheDocument();
    });
  });

  test("handles enable all action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByTestId(
          "permission-card-Users",
        ),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Enable All")[0]);

    expect(
      screen.getByText("Add Permission"),
    ).toBeInTheDocument();
  });

  test("handles disable all action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByTestId(
          "permission-card-Users",
        ),
      ).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getAllByText("Disable All")[0],
    );

    expect(
      screen.getByText("Add Permission"),
    ).toBeInTheDocument();
  });

  test("handles toggle action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByTestId(
          "permission-card-Users",
        ),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Toggle")[0]);

    expect(
      screen.getByText("Add Permission"),
    ).toBeInTheDocument();
  });

  test("calls syncRolePermissionsApi on save", async () => {
    renderComponent();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        syncRolePermissionsApi,
      ).toHaveBeenCalledWith(mockCreateApi, {
        role_id: 1,
        is_superuser: 1,
        enabled_permission_ids: [1, 3],
        disabled_permission_ids: [2],
      });
    });
  });

  test("shows success snackbar after save", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Role permissions updated successfully",
        ),
      ).toBeInTheDocument();
    });
  });

  test("navigates after successful save", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        syncRolePermissionsApi,
      ).toHaveBeenCalled();
    });

    jest.advanceTimersByTime(1500);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/role-management",
    );
  });

  test("shows warning snackbar for failed response", async () => {
    syncRolePermissionsApi.mockResolvedValue({
      statusCode: 400,
      body: {
        message: "Something went wrong",
      },
    });

    renderComponent();

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong"),
      ).toBeInTheDocument();
    });
  });

  test("shows error snackbar when save fails", async () => {
    syncRolePermissionsApi.mockRejectedValue(
      new Error("Save Error"),
    );

    renderComponent();

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to update permissions",
        ),
      ).toBeInTheDocument();
    });
  });

  test("navigates to role management on cancel", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/role-management",
    );
  });

  test("handles fetchRoleDetailsApi error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fetchRoleDetailsApi.mockRejectedValue(
      new Error("Fetch Error"),
    );

    renderComponent();

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

  test("matches snapshot", async () => {
    const { asFragment } = renderComponent();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
