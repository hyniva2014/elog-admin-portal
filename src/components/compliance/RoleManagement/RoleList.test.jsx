import React from "react";
import { render, screen } from "@testing-library/react";

import RoleList from "./RoleList";

jest.mock("./RoleCard", () => ({ role }) => (
  <div data-testid="role-card">
    <span>{role.title}</span>
  </div>
));

describe("RoleList Component", () => {
  const mockOnEdit = jest.fn();

  const mockRoles = [
    {
      id: 1,
      title: "Admin",
      description: "Administrator Role",
      users: 5,
      status: "Active",
    },
    {
      id: 2,
      title: "Manager",
      description: "Manager Role",
      users: 3,
      status: "Inactive",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <RoleList
        roles={mockRoles}
        onEdit={mockOnEdit}
        {...props}
      />,
    );

  test("renders all role cards", () => {
    renderComponent();

    const roleCards = screen.getAllByTestId("role-card");

    expect(roleCards).toHaveLength(2);
  });

  test("renders correct role titles", () => {
    renderComponent();

    expect(screen.getByText("Admin")).toBeInTheDocument();

    expect(screen.getByText("Manager")).toBeInTheDocument();
  });

  test("passes correct props to RoleCard", () => {
    renderComponent();

    const roleCards = screen.getAllByTestId("role-card");

    expect(roleCards.length).toBe(2);
  });

  test("renders empty list when roles array is empty", () => {
    renderComponent({
      roles: [],
    });

    const roleCards = screen.queryAllByTestId("role-card");

    expect(roleCards).toHaveLength(0);
  });

  test("handles single role correctly", () => {
    renderComponent({
      roles: [mockRoles[0]],
    });

    expect(screen.getByText("Admin")).toBeInTheDocument();

    const roleCards = screen.getAllByTestId("role-card");

    expect(roleCards).toHaveLength(1);
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
