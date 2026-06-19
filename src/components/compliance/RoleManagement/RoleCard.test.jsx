import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RoleCard from "./RoleCard";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@mui/material/styles", () => ({
  ...jest.requireActual("@mui/material/styles"),
  styled: (Component) => (styles) => {
    const StyledComponent = ({ children, ...props }) => (
      <Component {...props}>{children}</Component>
    );
    return StyledComponent;
  },
}));

jest.mock("@mui/material/Box", () => ({ children }) => <div>{children}</div>);

jest.mock("@mui/material/Avatar", () => ({ children }) => (
  <div>{children}</div>
));

jest.mock("@mui/material/Typography", () => ({ children }) => (
  <span>{children}</span>
));

jest.mock("@mui/material/Tooltip", () => ({ title, children }) => (
  <div title={title}>{children}</div>
));

jest.mock(
  "@mui/material/IconButton",
  () =>
    ({ children, onClick, disabled }) => (
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
    ),
);

jest.mock("@mui/icons-material/VisibilityOutlined", () => () => (
  <span>ViewIcon</span>
));

jest.mock("@mui/icons-material/EditOutlined", () => () => (
  <span>EditIcon</span>
));

jest.mock("../../../assets/images/svg/Group.png", () => "mock-group-icon.png");

jest.mock("./RoleCard.styles", () => ({
  RoleRow: ({ children }) => <div>{children}</div>,
  LeftSection: ({ children }) => <div>{children}</div>,
  RoleAvatar: ({ children }) => <div>{children}</div>,
  RoleTitle: ({ children }) => <h3>{children}</h3>,
  RoleDescription: ({ children }) => <p>{children}</p>,
  UsersColumn: ({ children }) => <div>{children}</div>,
  StatusColumn: ({ children }) => <div>{children}</div>,
  ClickableUsersCount: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ActiveStatusText: ({ children }) => <span>{children}</span>,
  InactiveStatusText: ({ children }) => <span>{children}</span>,
  ActionsWrapper: ({ children }) => <div>{children}</div>,
  ViewButton: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  EditButton: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  AuditLogIcon: ({ src, alt }) => <img src={src} alt={alt} />,
}));

describe("RoleCard Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnAuditLog = jest.fn();

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
          onOpenAuditLog={mockOnAuditLog}
          canView={true}
          canUpdate={true}
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

    expect(screen.getByText("Administrator Role")).toBeInTheDocument();
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

    fireEvent.click(buttons[1]);

    expect(mockNavigate).toHaveBeenCalledWith("/role-permissions/1");
  });

  test("calls onOpenAuditLog when audit history button is clicked", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[2]);

    expect(mockOnAuditLog).toHaveBeenCalledWith(defaultRole);
  });

  test("calls onEdit when edit button clicked", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[3]);

    expect(mockOnEdit).toHaveBeenCalledWith(defaultRole);
  });

  test("renders audit history button", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    expect(buttons[2]).toBeInTheDocument();
  });

  test("disables view button when canView is false", () => {
    renderComponent({
      canView: false,
    });

    const buttons = screen.getAllByRole("button");

    expect(buttons[1]).toBeDisabled();
  });

  test("disables edit button when canUpdate is false", () => {
    renderComponent({
      canUpdate: false,
    });

    const buttons = screen.getAllByRole("button");

    expect(buttons[3]).toBeDisabled();
  });

  test("does not navigate when view button is disabled", () => {
    renderComponent({
      canView: false,
    });

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("does not call onEdit when edit button is disabled", () => {
    renderComponent({
      canUpdate: false,
    });

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[3]);

    expect(mockOnEdit).not.toHaveBeenCalled();
  });

  test("audit history button remains enabled when permissions are disabled", () => {
    renderComponent({
      canView: false,
      canUpdate: false,
    });

    const buttons = screen.getAllByRole("button");

    expect(buttons[2]).not.toBeDisabled();
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

    expect(screen.getByText("Administrator Role")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
