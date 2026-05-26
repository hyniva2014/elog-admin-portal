import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import UserManagementHeader from "./UserManagementHeader";

import { getUserManagementFilters } from "./Constants";

jest.mock("./Constants", () => ({
  getUserManagementFilters: jest.fn(),
}));

jest.mock("../../../common/CommonPageHeader", () => {
  return function MockCommonPageHeader(props) {
    return (
      <div>
        <div>{props.title}</div>

        <div>{props.subtitle}</div>

        {props.rightContent}
      </div>
    );
  };
});

jest.mock("../../../common/CommonSummaryCardGroup", () => {
  return function MockSummaryCards(props) {
    return <div data-testid="summary-cards">{JSON.stringify(props.cards)}</div>;
  };
});

jest.mock("../../../common/CommonFilters", () => {
  return function MockCommonFilters(props) {
    return (
      <div data-testid="common-filters">
        Filters Component
        <div>{JSON.stringify(props.filters)}</div>
      </div>
    );
  };
});

describe("UserManagementHeader", () => {
  const mockSetData = jest.fn();

  const mockHandleClick = jest.fn();

  const mockCompanyOptions = [
    {
      label: "TrackPulse Logistics",
      value: "7",
    },
  ];

  const mockSummaryCards = [
    {
      id: "total_users",
      title: "Total Users",
      value: "10",
    },
  ];

  const mockFilters = [
    {
      label: "User Profile",
      dataKey: "role_id",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    getUserManagementFilters.mockReturnValue(mockFilters);
  });

  test("renders component correctly", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByText("User Management")).toBeInTheDocument();

    expect(
      screen.getByText("Manage user accounts and permissions"),
    ).toBeInTheDocument();
  });

  test("renders add user button", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("calls handleClick when add user button clicked", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    fireEvent.click(screen.getByText("Add User"));

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test("renders summary cards correctly", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByTestId("summary-cards")).toBeInTheDocument();

    expect(
      screen.getByText(JSON.stringify(mockSummaryCards)),
    ).toBeInTheDocument();
  });

  test("renders common filters correctly", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByTestId("common-filters")).toBeInTheDocument();

    expect(screen.getByText("Filters Component")).toBeInTheDocument();
  });

  test("calls getUserManagementFilters with company options", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(getUserManagementFilters).toHaveBeenCalledWith(mockCompanyOptions);
  });

  test("passes generated filters to CommonFilters", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByText(JSON.stringify(mockFilters))).toBeInTheDocument();
  });

  test("renders correctly with empty props", () => {
    render(<UserManagementHeader handleClick={mockHandleClick} />);

    expect(screen.getByText("User Management")).toBeInTheDocument();

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("renders without summary cards", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={[]}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(screen.getByTestId("summary-cards")).toBeInTheDocument();
  });

  test("renders without company options", () => {
    render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={[]}
      />,
    );

    expect(getUserManagementFilters).toHaveBeenCalledWith([]);
  });

  test("matches snapshot", () => {
    const { container } = render(
      <UserManagementHeader
        data={[]}
        setData={mockSetData}
        searchKey={{}}
        summaryCards={mockSummaryCards}
        handleClick={mockHandleClick}
        companyOptions={mockCompanyOptions}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
