import { render as rtlRender, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";

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
  modelOptions: [],
  statusOptions: [],
};

describe("DeviceModelManagementHeader", () => {
  it("should render component correctly", () => {
    render(<DeviceModelManagementHeader {...defaultProps} />);
    expect(screen.getByText("Device Model Management")).toBeInTheDocument();
    expect(screen.getByText("Manage device models and specifications")).toBeInTheDocument();
  });

  it("should render Add Asset button", () => {
    render(<DeviceModelManagementHeader {...defaultProps} />);
    expect(screen.getByText("Add Asset")).toBeInTheDocument();
  });

  it("should render filter dropdowns with correct labels", () => {
    render(<DeviceModelManagementHeader {...defaultProps} />);
    expect(screen.getAllByText("Asset Type").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("All Model").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("All Status").length).toBeGreaterThanOrEqual(1);
  });

  it("should render with custom options", () => {
    const propsWithOptions = {
      ...defaultProps,
      assetTypeOptions: [{ value: "Truck", label: "Truck" }],
      modelOptions: [{ value: "Model1", label: "Model 1" }],
      statusOptions: [{ value: "Active", label: "Active" }],
    };
    render(<DeviceModelManagementHeader {...propsWithOptions} />);
    expect(screen.getByText("Device Model Management")).toBeInTheDocument();
  });
});
