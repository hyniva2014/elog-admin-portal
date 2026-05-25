// AlertCenterScreenHeader.test.jsx

import { render, screen } from "@testing-library/react";
import AlertCenterScreenHeader from "./AlertCenterScreenHeader";

// Mock constants
jest.mock("../AdminConstant", () => ({
  AlertCenterCards: [
    { id: 1, title: "Active Alerts" },
    { id: 2, title: "Critical Alerts" },
  ],
}));

// Mock CommonPageHeader
jest.mock("../../../../common/CommonPageHeader", () =>
  jest.fn((props) => (
    <div data-testid="page-header">
      <span data-testid="page-header-props">{JSON.stringify(props)}</span>
    </div>
  )),
);

// Mock CommonSummaryCardGroup
jest.mock("../../../../common/CommonSummaryCardGroup", () =>
  jest.fn((props) => (
    <div data-testid="summary-card-group">
      <span data-testid="summary-card-props">{JSON.stringify(props)}</span>
    </div>
  )),
);

// Mock CommonFilters
jest.mock("../../../../common/CommonFilters", () =>
  jest.fn((props) => (
    <div data-testid="filters">
      <span data-testid="filters-props">{JSON.stringify(props)}</span>
    </div>
  )),
);

describe("AlertCenterScreenHeader", () => {
  const mockSetData = jest.fn();

  const mockProps = {
    data: {
      search: "",
      fromDate: null,
      toDate: null,
      category: "",
      severity: "",
      page: 1,
      pageSize: 10,
    },
    setData: mockSetData,
    searchKey: 0,
    categoryOptions: [
      { value: "", label: "All Category" },
      { value: "maintenance", label: "Maintenance" },
    ],
    severityOptions: [
      { value: "", label: "All Severity" },
      { value: "high", label: "High" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all child components", () => {
    render(<AlertCenterScreenHeader {...mockProps} />);

    expect(screen.getByTestId("page-header")).toBeInTheDocument();

    expect(screen.getByTestId("summary-card-group")).toBeInTheDocument();

    expect(screen.getByTestId("filters")).toBeInTheDocument();
  });

  test("passes correct props to CommonPageHeader", () => {
    render(<AlertCenterScreenHeader {...mockProps} />);

    const props = JSON.parse(
      screen.getByTestId("page-header-props").textContent,
    );

    expect(props).toEqual({
      title: "Alert Center",
      subtitle: false,
      rightContent: false,
    });
  });

  test("passes correct props to CommonSummaryCardGroup", () => {
    render(<AlertCenterScreenHeader {...mockProps} />);

    const props = JSON.parse(
      screen.getByTestId("summary-card-props").textContent,
    );

    expect(props.cards).toEqual([
      { id: 1, title: "Active Alerts" },
      { id: 2, title: "Critical Alerts" },
    ]);

    expect(props.showAccentBar).toBe(false);
    expect(props.layout).toBe("default");
  });

  test("passes correct props to CommonFilters", () => {
    render(<AlertCenterScreenHeader {...mockProps} />);

    const props = JSON.parse(screen.getByTestId("filters-props").textContent);

    expect(props.data).toEqual(mockProps.data);

    expect(props.searchKey).toBe(0);

    expect(props.allowDateClear).toBe(true);

    expect(props.filters).toEqual([
      {
        label: "Category",
        dataKey: "category",
        options: mockProps.categoryOptions,
      },
      {
        label: "Severity",
        dataKey: "severity",
        options: mockProps.severityOptions,
      },
    ]);
  });

  test("setData function exists", () => {
    const MockFilters = require("../../../../common/CommonFilters");
    render(<AlertCenterScreenHeader {...mockProps} />);

    const lastCall = MockFilters.mock.calls[MockFilters.mock.calls.length - 1][0];
    expect(typeof lastCall.setData).toBe("function");
  });
});
