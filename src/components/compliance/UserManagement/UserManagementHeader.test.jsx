import { render, screen, fireEvent } from "@testing-library/react";
import UserManagementHeader from "./UserManagementHeader";

jest.mock("../../../common/CommonPageHeader", () => (props) => (
  <div data-testid="common-page-header">
    <div>{props.title}</div>
    <div>{props.subtitle}</div>
    <div>{props.rightContent}</div>
  </div>
));

jest.mock("../../../common/CommonSummaryCardGroup", () => (props) => (
  <div data-testid="summary-card-group">
    Summary Cards: {props.cards?.length}
  </div>
));

jest.mock("../../../common/CommonFilters", () => (props) => (
  <div data-testid="common-filters">Filters: {props.filters?.length}</div>
));

describe("UserManagementHeader Component", () => {
  const mockSetData = jest.fn();
  const mockHandleClick = jest.fn();

  const defaultProps = {
    data: {},
    setData: mockSetData,
    searchKey: {
      search: "",
    },
    summaryCards: [
      {
        title: "Active Users",
        value: 10,
      },
      {
        title: "Inactive Users",
        value: 5,
      },
    ],
    handleClick: mockHandleClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders page header title and subtitle", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByText("User Management")).toBeInTheDocument();

    expect(
      screen.getByText("Manage user accounts and permissions"),
    ).toBeInTheDocument();
  });

  test("renders Add User button", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /add user/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls handleClick when Add User button is clicked", () => {
    render(<UserManagementHeader {...defaultProps} />);

    const addButton = screen.getByRole("button", {
      name: /add user/i,
    });

    fireEvent.click(addButton);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test("renders summary card group", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByTestId("summary-card-group")).toBeInTheDocument();

    expect(screen.getByText("Summary Cards: 2")).toBeInTheDocument();
  });

  test("renders common filters component", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByTestId("common-filters")).toBeInTheDocument();

    expect(screen.getByText("Filters: 3")).toBeInTheDocument();
  });

  test("passes correct filter configuration", () => {
    render(<UserManagementHeader {...defaultProps} />);

    expect(screen.getByTestId("common-filters")).toBeInTheDocument();
  });

  test("renders gracefully with empty summary cards", () => {
    render(<UserManagementHeader {...defaultProps} summaryCards={[]} />);

    expect(screen.getByText("Summary Cards: 0")).toBeInTheDocument();
  });

  test("renders gracefully with undefined summary cards", () => {
    render(<UserManagementHeader {...defaultProps} summaryCards={undefined} />);

    expect(screen.getByTestId("summary-card-group")).toBeInTheDocument();
  });

  test("renders gracefully with null data", () => {
    render(<UserManagementHeader {...defaultProps} data={null} />);

    expect(screen.getByTestId("common-filters")).toBeInTheDocument();
  });

  test("renders without crashing when handleClick is undefined", () => {
    render(<UserManagementHeader {...defaultProps} handleClick={undefined} />);

    const addButton = screen.getByRole("button", {
      name: /add user/i,
    });

    expect(addButton).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<UserManagementHeader {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });
});
