import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AddPermission from "./AddPermission";

import {
  fetchRoleDetailsApi,
  syncRolePermissionsApi,
} from "./RolePermissionsApi";

import { useServices } from "../../../services/services";

const mockNavigate = jest.fn();

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
    <button onClick={props.onEnableAll(props.module)}>Enable All</button>

    <button onClick={props.onDisableAll(props.module)}>Disable All</button>

    <button onClick={props.onToggle(props.module, 0)}>Toggle</button>
  </div>
));

jest.mock("../../../common/CommonLoading", () => () => ({
  setLoading: jest.fn(),
  LoadingContainer: () => <div>Loading...</div>,
}));

describe("AddPermission Component", () => {
  const mockFetchApi = jest.fn();
  const mockCreateApi = jest.fn();

  const mockRoleResponse = {
    name: "Admin",
    description: "Admin Role",
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

    useServices.mockReturnValue({
      fetchApi: mockFetchApi,
      createApi: mockCreateApi,
    });

    fetchRoleDetailsApi.mockResolvedValue(mockRoleResponse);

    syncRolePermissionsApi.mockResolvedValue({});
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AddPermission />
      </MemoryRouter>,
    );

  test("renders Add Permission page correctly", async () => {
    renderComponent();

    expect(screen.getByText("Add Permission")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });
  });

  test("fetches and displays role details", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();

      expect(screen.getByDisplayValue("Admin Role")).toBeInTheDocument();
    });
  });

  test("renders permission cards", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("permission-card-Users")).toBeInTheDocument();

      expect(screen.getByTestId("permission-card-Claims")).toBeInTheDocument();
    });
  });

  test("handles enable all action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("permission-card-Users")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Enable All")[0]);

    expect(screen.getByText("Add Permission")).toBeInTheDocument();
  });

  test("handles disable all action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("permission-card-Users")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Disable All")[0]);

    expect(screen.getByText("Add Permission")).toBeInTheDocument();
  });

  test("handles toggle action", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("permission-card-Users")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Toggle")[0]);

    expect(screen.getByText("Add Permission")).toBeInTheDocument();
  });

  test("calls syncRolePermissionsApi on save", async () => {
    renderComponent();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(syncRolePermissionsApi).toHaveBeenCalledWith(mockCreateApi, {
        role_id: 1,
        enabled_permissions: [1, 3],
        disabled_permissions: [2],
      });
    });
  });

  test("navigates to role management on cancel", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("/role-management");
  });

  test("handles fetchRoleDetailsApi error", async () => {
    fetchRoleDetailsApi.mockRejectedValue(new Error("Fetch Error"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test("handles syncRolePermissionsApi error", async () => {
    syncRolePermissionsApi.mockRejectedValue(new Error("Save Error"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(fetchRoleDetailsApi).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
