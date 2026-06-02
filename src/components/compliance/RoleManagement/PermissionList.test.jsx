import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PermissionList from "./PermissionList";

describe("PermissionList Component", () => {
  const mockToggleHandler = jest.fn();

  const mockOnToggle = jest.fn((module, index) => () =>
    mockToggleHandler(module, index),
  );

  const defaultProps = {
    module: "Users",
    permissions: [
      {
        id: 1,
        action: "Create User",
        description: "Allows creating users",
        code: "CREATE_USER",
      },
      {
        id: 2,
        action: "Delete User",
        description: "",
        code: "DELETE_USER",
      },
    ],
    permissionState: {
      Users: [true, false],
    },
    onToggle: mockOnToggle,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(<PermissionList {...defaultProps} {...props} />);

  test("renders all permission items", () => {
    renderComponent();

    expect(screen.getByText("Create User")).toBeInTheDocument();

    expect(screen.getByText("Delete User")).toBeInTheDocument();
  });

  test("renders permission descriptions correctly", () => {
    renderComponent();

    expect(
      screen.getByText("Allows creating users"),
    ).toBeInTheDocument();
  });

  test("renders permission code when description is empty", () => {
    renderComponent();

    expect(screen.getByText("DELETE_USER")).toBeInTheDocument();
  });

  test("renders switches with correct checked state", () => {
    renderComponent();

    const switches = screen.getAllByRole("checkbox");

    expect(switches[0]).toBeChecked();

    expect(switches[1]).not.toBeChecked();
  });

  test("calls onToggle handler when switch is clicked", () => {
    renderComponent();

    const switches = screen.getAllByRole("checkbox");

    fireEvent.click(switches[0]);

    expect(mockOnToggle).toHaveBeenCalledWith("Users", 0);

    expect(mockToggleHandler).toHaveBeenCalledWith(
      "Users",
      0,
    );
  });

  test("renders empty list when permissions array is empty", () => {
    renderComponent({
      permissions: [],
    });

    const switches = screen.queryAllByRole("checkbox");

    expect(switches.length).toBe(0);
  });

  test("handles undefined permissionState safely", () => {
    renderComponent({
      permissionState: {},
    });

    const switches = screen.getAllByRole("checkbox");

    expect(switches[0]).not.toBeChecked();

    expect(switches[1]).not.toBeChecked();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
