import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";

// Mock redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn((callback) =>
    callback({
      loginSlice: {
        loginDetails: {
          body: {
            data: {
              userdetails: {
                company_id: 1,
                role_id: 1,
              },
            },
          },
        },
      },
    })
  ),
}));

// Mock services
jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(),
  }),
}));

// Mock CommonPageHeader
jest.mock("../../../common/CommonPageHeader", () => {
  return ({ title, rightContent }) => (
    <div>
      <h1>{title}</h1>
      {rightContent}
    </div>
  );
});

// Mock CommonFilters
jest.mock("../../../common/CommonFilters", () => {
  return ({ filters }) => (
    <div>
      <div>Common Filters</div>

      {filters.map((filter, index) => (
        <div key={index}>{filter.label}</div>
      ))}
    </div>
  );
});

// Mock CommonSummaryCardGroup
jest.mock("../../../common/CommonSummaryCardGroup", () => {
  return ({ cards }) => (
    <div>
      Summary Cards Count: {cards.length}
    </div>
  );
});

describe("DeviceAssetManagementHeader Component", () => {
  const mockHandleClick = jest.fn();
  const mockSetData = jest.fn();
  const mockSetMode = jest.fn();

  const defaultProps = {
    data: [],
    setData: mockSetData,
    searchKey: "",
    summaryCards: [
      { title: "Total Assets", count: 10 },
      { title: "Active Assets", count: 5 },
    ],
    mode: "",
    setMode: mockSetMode,
    handleClick: mockHandleClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component correctly", () => {
    render(<DeviceAssetManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Device Asset Management")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Assign unassigned devices to carriers")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Common Filters")
    ).toBeInTheDocument();
  });

  test("renders add model button", () => {
    render(<DeviceAssetManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Add Model")
    ).toBeInTheDocument();
  });

  test("calls handleClick when add model button clicked", () => {
    render(<DeviceAssetManagementHeader {...defaultProps} />);

    fireEvent.click(screen.getByText("Add Model"));

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test("renders summary cards", () => {
    render(<DeviceAssetManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Summary Cards Count: 2")
    ).toBeInTheDocument();
  });

  test("renders filter labels", () => {
    render(<DeviceAssetManagementHeader {...defaultProps} />);

    expect(
      screen.getByText("Model Type")
    ).toBeInTheDocument();

    expect(
      screen.getByText("All Status")
    ).toBeInTheDocument();
  });
});