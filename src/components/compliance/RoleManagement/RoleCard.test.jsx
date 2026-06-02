import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RoleCard from "./RoleCard";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RoleCard Component", () => {
  const mockOnEdit = jest.fn();

  const defaultRole = {
    id: 1,
    title: "Admin",
    description: "Administrator Role",
    users: 5,
    status: "Active",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <RoleCard
          role={defaultRole}
          onEdit={mockOnEdit}
          {...props}
        />
      </MemoryRouter>,
    );

  test("renders role title correctly", () => {
    renderComponent();

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  test("renders role description correctly", () => {
    renderComponent();

    expect(
      screen.getByText("Administrator Role"),
    ).toBeInTheDocument();
  });

  test("renders avatar first letter correctly", () => {
    renderComponent();

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  test("formats users count correctly", () => {
    renderComponent();

    expect(screen.getByText("05")).toBeInTheDocument();
  });

  test("renders active status correctly", () => {
    renderComponent();

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("renders inactive status correctly", () => {
    renderComponent({
      role: {
        ...defaultRole,
        status: "Inactive",
      },
    });

    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  test("navigates to role user management page on users count click", () => {
    renderComponent();

    fireEvent.click(screen.getByText("05"));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/role-user-management?roleId=1&roleName=Admin",
    );
  });

  test("navigates to role permissions page on view button click", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/role-permissions/1",
    );
  });

  test("calls onEdit when edit button clicked", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(mockOnEdit).toHaveBeenCalledWith(defaultRole);
  });

  test("handles role title with lowercase correctly", () => {
    renderComponent({
      role: {
        ...defaultRole,
        title: "manager",
      },
    });

    expect(screen.getByText("m")).toBeInTheDocument();
  });

  test("handles users count greater than 9 correctly", () => {
    renderComponent({
      role: {
        ...defaultRole,
        users: 15,
      },
    });

    expect(screen.getByText("15")).toBeInTheDocument();
  });

  test("handles empty role title safely", () => {
    renderComponent({
      role: {
        ...defaultRole,
        title: "",
      },
    });

    expect(
      screen.getByText("Administrator Role"),
    ).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
