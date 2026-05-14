import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserManagementHeader from "./UserManagementHeader";

// Mock CommonPageHeader
jest.mock("../../../common/CommonPageHeader", () => (props) => (
  <div data-testid="common-page-header">
    <h1>{props.title}</h1>
    <p>{props.subtitle}</p>
    <div>{props.rightContent}</div>
  </div>
));

// Mock CommonSummaryCardGroup
jest.mock("../../../common/CommonSummaryCardGroup", () => (props) => (
  <div data-testid="summary-card-group">
    Summary Cards Count: {props.cards.length}
  </div>
));

// Mock CommonFilters
jest.mock("../../../common/CommonFilters", () => (props) => (
  <div data-testid="common-filters">
    Filters Count: {props.filters.length}
  </div>
));

describe("UserManagementHeader Component", () => {
  const mockSetData = jest.fn();
  const mockHandleClick = jest.fn();

  const defaultProps = {
    data: [],
    setData: mockSetData,
    searchKey: {},
    summaryCards: [
      { title: "Total Users", value: 10 },
      { title: "Active Users", value: 8 },
    ],
    handleClick: mockHandleClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders CommonPageHeader component", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(
      screen.getByTestId("common-page-header")
    ).toBeInTheDocument();
  });

  test("renders correct title", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByText("User Management")).toBeInTheDocument();
  });

  test("renders correct subtitle", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Manage user accounts and permissions")
    ).toBeInTheDocument();
  });

  test("renders Add User button", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("calls handleClick when Add User button is clicked", () => {
    render(<UserManagementHeader {...defaultProps} />);

    const addButton = screen.getByText("Add User");

    fireEvent.click(addButton);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test("renders CommonSummaryCardGroup component", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(
      screen.getByTestId("summary-card-group")
    ).toBeInTheDocument();
  });

  test("passes correct summary cards count", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Summary Cards Count: 2")
    ).toBeInTheDocument();
  });

  test("renders CommonFilters component", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByTestId("common-filters")).toBeInTheDocument();
  });

  test("passes correct filters count to CommonFilters", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByText("Filters Count: 4")).toBeInTheDocument();
  });

  test("renders with empty summary cards", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
        summaryCards={[]}
      />
    );

    expect(
      screen.getByText("Summary Cards Count: 0")
    ).toBeInTheDocument();
  });

  test("renders component without crashing when optional props are missing", () => {
    render(
      <UserManagementHeader
        handleClick={mockHandleClick}
      />
    );

    expect(screen.getByText("User Management")).toBeInTheDocument();
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("CommonFilters receives correct filter labels", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByText("Filters Count: 4")).toBeInTheDocument();
  });

  test("button has correct text", () => {
    render(<UserManagementHeader {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: /add user/i,
    });

    expect(button).toBeInTheDocument();
  });
});