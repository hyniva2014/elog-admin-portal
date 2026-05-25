// UserManagementHeader.test.jsx

import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import UserManagementHeader from "./UserManagementHeader";

const mockHandleClick = jest.fn();
const mockSetData = jest.fn();

// Mock CommonPageHeader
jest.mock(
  "../../../common/CommonPageHeader",
  () => (props) => (
    <div data-testid="common-page-header">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>

      <div>{props.rightContent}</div>
    </div>
  )
);

// Mock CommonSummaryCardGroup
jest.mock(
  "../../../common/CommonSummaryCardGroup",
  () => (props) => (
    <div data-testid="summary-card-group">
      {props.cards?.map((card, index) => (
        <div key={index}>{card.title}</div>
      ))}
    </div>
  )
);

// Mock CommonFilters
jest.mock(
  "../../../common/CommonFilters",
  () => (props) => (
    <div data-testid="common-filters">
      Filters Component
      <button
        onClick={() =>
          props.setData({
            search: "test",
          })
        }
      >
        Apply Filter
      </button>
    </div>
  )
);

// Mock styled components
jest.mock(
  "./UserManagementHeader.styled",
  () => ({
    HeaderContainer: ({ children }) => (
      <div data-testid="header-container">
        {children}
      </div>
    ),

    SummaryCardWrapper: ({
      children,
    }) => (
      <div data-testid="summary-wrapper">
        {children}
      </div>
    ),

    AddUserButton: ({
      children,
      onClick,
    }) => (
      <button onClick={onClick}>
        {children}
      </button>
    ),
  })
);

// Mock constants
jest.mock(
  "../../../common/Constants",
  () => ({
    USER_MANAGEMENT_FILTERS: [
      {
        label: "Status",
        key: "status",
      },
    ],
  })
);

describe("UserManagementHeader Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    data: [],
    setData: mockSetData,
    searchKey: {},
    summaryCards: [
      {
        title: "Total Users",
        count: 10,
      },
      {
        title: "Active Users",
        count: 8,
      },
    ],
    handleClick: mockHandleClick,
  };

  test("renders component correctly", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByTestId(
        "header-container"
      )
    ).toBeInTheDocument();
  });

  test("renders page header title and subtitle", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByText("User Management")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Manage user accounts and permissions"
      )
    ).toBeInTheDocument();
  });

  test("renders Add User button", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByText("Add User")
    ).toBeInTheDocument();
  });

  test("calls handleClick when Add User button clicked", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    fireEvent.click(
      screen.getByText("Add User")
    );

    expect(
      mockHandleClick
    ).toHaveBeenCalledTimes(1);
  });

  test("renders summary cards correctly", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByText("Total Users")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Active Users")
    ).toBeInTheDocument();
  });

  test("renders CommonFilters component", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByTestId(
        "common-filters"
      )
    ).toBeInTheDocument();
  });

  test("calls setData from filters", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    fireEvent.click(
      screen.getByText("Apply Filter")
    );

    expect(
      mockSetData
    ).toHaveBeenCalledWith({
      search: "test",
    });
  });

  test("renders summary wrapper", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
      />
    );

    expect(
      screen.getByTestId(
        "summary-wrapper"
      )
    ).toBeInTheDocument();
  });

  test("renders without summary cards", () => {
    render(
      <UserManagementHeader
        {...defaultProps}
        summaryCards={[]}
      />
    );

    expect(
      screen.getByTestId(
        "summary-card-group"
      )
    ).toBeInTheDocument();
  });

  test("renders with empty data prop", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        handleClick={mockHandleClick}
      />
    );

    expect(
      screen.getByText("User Management")
    ).toBeInTheDocument();
  });
});