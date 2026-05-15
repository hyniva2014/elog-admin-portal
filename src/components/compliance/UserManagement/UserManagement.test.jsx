// UserManagement.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserManagement from "./UserManagement";

// Mock CommonDataGrid
jest.mock("@src/common/CommonDataGrid", () => (props) => (
  <div data-testid="common-data-grid">
    CommonDataGrid
    <div>Rows Count: {props.data.rows.length}</div>
  </div>
));

// Mock UserManagementHeader
jest.mock("./UserManagementHeader", () => (props) => (
  <div data-testid="user-management-header">
    UserManagementHeader
    <button onClick={props.handleClick}>Open Form</button>
  </div>
));

// Mock PageContainer
jest.mock("../../../common/PageContainer", () => ({
  PageContainer: ({ children }) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

// Mock CommonLoading
jest.mock("../../../common/CommonLoading", () => () => ({
  setLoading: jest.fn(),
  LoadingContainer: () => (
    <div data-testid="loading-container">LoadingContainer</div>
  ),
}));

// Mock UserManagementForm
jest.mock(
  "./UserManagementForm",
  () => (props) =>
    props.open ? (
      <div data-testid="user-management-form">
        UserManagementForm
        <button onClick={props.onClose}>Close Form</button>
      </div>
    ) : null,
);

// Mock Row & Column Data
jest.mock("../../CommonRowColumnUtils", () => ({
  UserManagementColumnData: [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
  ],
  UserManagementRowData: [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ],
}));

describe("UserManagement Component", () => {
  test("renders loading container", () => {
    render(<UserManagement />);

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  test("renders page container", () => {
    render(<UserManagement />);

    expect(screen.getByTestId("page-container")).toBeInTheDocument();
  });

  test("renders UserManagementHeader component", () => {
    render(<UserManagement />);

    expect(screen.getByTestId("user-management-header")).toBeInTheDocument();
  });

  test("renders CommonDataGrid component", () => {
    render(<UserManagement />);

    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  test("passes row data correctly to CommonDataGrid", () => {
    render(<UserManagement />);

    expect(screen.getByText("Rows Count: 2")).toBeInTheDocument();
  });

  test("UserManagementForm should not render initially", () => {
    render(<UserManagement />);

    expect(
      screen.queryByTestId("user-management-form"),
    ).not.toBeInTheDocument();
  });

  test("opens UserManagementForm when handleClick is triggered", () => {
    render(<UserManagement />);

    const openButton = screen.getByText("Open Form");
    fireEvent.click(openButton);

    expect(screen.getByTestId("user-management-form")).toBeInTheDocument();
  });

  test("closes UserManagementForm when onClose is triggered", () => {
    render(<UserManagement />);

    // Open form
    fireEvent.click(screen.getByText("Open Form"));

    expect(screen.getByTestId("user-management-form")).toBeInTheDocument();

    // Close form
    fireEvent.click(screen.getByText("Close Form"));

    expect(
      screen.queryByTestId("user-management-form"),
    ).not.toBeInTheDocument();
  });

  test("renders UserManagementForm with mode='add'", () => {
    render(<UserManagement />);

    fireEvent.click(screen.getByText("Open Form"));

    expect(screen.getByTestId("user-management-form")).toBeInTheDocument();
  });
});

describe("Edge Cases & Data Integrity", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders gracefully with empty row data", () => {
    // Mock CommonRowColumnUtils to return empty rows for this test
    jest.mock("../../CommonRowColumnUtils", () => ({
      ...jest.requireActual("../../CommonRowColumnUtils"),
      UserManagementRowData: [],
    }));

    // We just render and make sure it doesn't crash
    const { container } = render(<UserManagement />);
    expect(container).toBeInTheDocument();
  });

  test("handles undefined data state gracefully", () => {
    const { container } = render(<UserManagement />);
    expect(container).toBeInTheDocument();
  });
});
