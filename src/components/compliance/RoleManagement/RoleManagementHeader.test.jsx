import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleManagementHeader from "./RoleManagementHeader";

describe("RoleManagementHeader Component", () => {
  const mockOnAddRole = jest.fn();

  const defaultProps = {
    roles: [
      {
        id: 1,
        title: "Admin",
      },
      {
        id: 2,
        title: "Manager",
      },
    ],
    onAddRole: mockOnAddRole,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <RoleManagementHeader
        {...defaultProps}
        {...props}
      />,
    );

  test("renders title correctly", () => {
    renderComponent();

    expect(
      screen.getByText("Roles Overview"),
    ).toBeInTheDocument();
  });

  test("renders subtitle correctly", () => {
    renderComponent();

    expect(
      screen.getByText(
        "Quick view of all roles and their access levels",
      ),
    ).toBeInTheDocument();
  });

  test("renders role count correctly", () => {
    renderComponent();

    expect(
      screen.getByText("2 roles configured"),
    ).toBeInTheDocument();
  });

  test("renders zero roles count correctly", () => {
    renderComponent({
      roles: [],
    });

    expect(
      screen.getByText("0 roles configured"),
    ).toBeInTheDocument();
  });

  test("renders single role count correctly", () => {
    renderComponent({
      roles: [
        {
          id: 1,
          title: "Admin",
        },
      ],
    });

    expect(
      screen.getByText("1 roles configured"),
    ).toBeInTheDocument();
  });

  test("renders Add Role button", () => {
    renderComponent();

    expect(
      screen.getByText("Add Role"),
    ).toBeInTheDocument();
  });

  test("calls onAddRole when Add Role button clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Add Role"));

    expect(mockOnAddRole).toHaveBeenCalledTimes(1);
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
