import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import AccountManagementHeader from "./AccountMangementHeader";

const theme = createTheme();

const render = (ui, options) => {
  const Wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

const mockData = {
  rows: [],
  columns: [],
  total: 0,
  page: 1,
  pageSize: 10,
};

const mockSetData = jest.fn();
const mockHandleClick = jest.fn();

const defaultProps = {
  data: mockData,
  setData: mockSetData,
  searchKey: 0,
  handleClick: mockHandleClick,
  assetTypeOptions: [],
  truckOptions: [],
  carrierOptions: [],
  statusOptions: [],
};

describe("AccountManagementHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component correctly", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    expect(screen.getByText("Account Management")).toBeInTheDocument();
    expect(screen.getByText("Manage carrier accounts and subscriptions")).toBeInTheDocument();
  });

  it("should render Add Account button", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    expect(screen.getByText("Add Account")).toBeInTheDocument();
  });

  it("should call handleClick when Add Account button is clicked", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    const addButton = screen.getByText("Add Account");
    fireEvent.click(addButton);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("should render filter dropdowns with correct labels", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    expect(screen.getAllByText("Asset Type").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("All Truck").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("All Carrier").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("All Status").length).toBeGreaterThanOrEqual(1);
  });

  it("should render with custom options", () => {
    const propsWithOptions = {
      ...defaultProps,
      assetTypeOptions: [{ value: "truck", label: "Truck" }],
      truckOptions: [{ value: "truck1", label: "Truck 1" }],
      carrierOptions: [{ value: "carrier1", label: "Carrier 1" }],
      statusOptions: [{ value: "active", label: "Active" }],
    };
    render(<AccountManagementHeader {...propsWithOptions} />);
    expect(screen.getByText("Account Management")).toBeInTheDocument();
  });

  it("should render with different searchKey", () => {
    const propsWithSearchKey = {
      ...defaultProps,
      searchKey: 1,
    };
    render(<AccountManagementHeader {...propsWithSearchKey} />);
    expect(screen.getByText("Account Management")).toBeInTheDocument();
  });

  it("should have correct button styling", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    const addButton = screen.getByText("Add Account");
    expect(addButton).toHaveClass("MuiButton-contained");
  });

  it("should render subtitle correctly", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    expect(screen.getByText("Manage carrier accounts and subscriptions")).toBeInTheDocument();
  });

  it("should handle multiple rapid clicks on Add Account button", () => {
    render(<AccountManagementHeader {...defaultProps} />);
    const addButton = screen.getByText("Add Account");
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(mockHandleClick).toHaveBeenCalledTimes(3);
  });
});
