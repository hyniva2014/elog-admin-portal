import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PermissionCardItem from "./PermissionCardItem";

jest.mock("./PermissionList", () => () => (
  <div data-testid="permission-list">Permission List</div>
));

describe("PermissionCardItem Component", () => {
  const mockOnToggle = jest.fn();
  const mockOnEnableAll = jest.fn();
  const mockOnDisableAll = jest.fn();

  const defaultProps = {
    module: "Users",
    permissions: [
      {
        id: 1,
        name: "Create User",
      },
      {
        id: 2,
        name: "Delete User",
      },
    ],
    permissionState: {
      Users: [true, false],
    },
    onToggle: mockOnToggle,
    onEnableAll: mockOnEnableAll,
    onDisableAll: mockOnDisableAll,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockOnEnableAll.mockReturnValue(jest.fn());
    mockOnDisableAll.mockReturnValue(jest.fn());
  });

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <PermissionCardItem {...defaultProps} {...props} />
      </MemoryRouter>,
    );

  test("renders module title correctly", () => {
    renderComponent();

    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("renders permission count correctly", () => {
    renderComponent();

    expect(screen.getByText("1/2")).toBeInTheDocument();
  });

  test("renders PermissionList component", () => {
    renderComponent();

    expect(screen.getByTestId("permission-list")).toBeInTheDocument();
  });

  test("calls onEnableAll handler when Enable All button clicked", () => {
    const enableHandler = jest.fn();

    mockOnEnableAll.mockReturnValue(enableHandler);

    renderComponent();

    fireEvent.click(screen.getByText("Enable All"));

    expect(mockOnEnableAll).toHaveBeenCalledWith("Users");

    expect(enableHandler).toHaveBeenCalled();
  });

  test("calls onDisableAll handler when Disable All button clicked", () => {
    const disableHandler = jest.fn();

    mockOnDisableAll.mockReturnValue(disableHandler);

    renderComponent();

    fireEvent.click(screen.getByText("Disable All"));

    expect(mockOnDisableAll).toHaveBeenCalledWith("Users");

    expect(disableHandler).toHaveBeenCalled();
  });

  test("disables Enable All button when all permissions enabled", () => {
    renderComponent({
      permissionState: {
        Users: [true, true],
      },
    });

    expect(screen.getByText("Enable All")).toBeDisabled();

    expect(screen.getByText("Disable All")).not.toBeDisabled();
  });

  test("disables Disable All button when all permissions disabled", () => {
    renderComponent({
      permissionState: {
        Users: [false, false],
      },
    });

    expect(screen.getByText("Disable All")).toBeDisabled();

    expect(screen.getByText("Enable All")).not.toBeDisabled();
  });

  test("enables both buttons when permissions are partially enabled", () => {
    renderComponent({
      permissionState: {
        Users: [true, false],
      },
    });

    expect(screen.getByText("Enable All")).not.toBeDisabled();

    expect(screen.getByText("Disable All")).not.toBeDisabled();
  });

  test("renders correct permission count when all enabled", () => {
    renderComponent({
      permissionState: {
        Users: [true, true],
      },
    });

    expect(screen.getByText("2/2")).toBeInTheDocument();
  });

  test("renders correct permission count when all disabled", () => {
    renderComponent({
      permissionState: {
        Users: [false, false],
      },
    });

    expect(screen.getByText("0/2")).toBeInTheDocument();
  });

  test("handles empty permissions array", () => {
    renderComponent({
      permissions: [],
      permissionState: {
        Users: [],
      },
    });

    expect(screen.getByText("0/0")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
