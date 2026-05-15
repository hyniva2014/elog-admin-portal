import { render, screen } from "@testing-library/react";
import DeviceModelManagement from "./DeviceModelManagement";

jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid(props) {
    return <div data-testid="common-data-grid">CommonDataGrid</div>;
  };
});

jest.mock("../../../common/CommonLoading", () => {
  return function MockCommonLoading() {
    return {
      setLoading: jest.fn(),
      LoadingContainer: ({ children }) => <div data-testid="common-loading">{children}</div>,
    };
  };
});

jest.mock("./DeviceModelManagementHeader", () => {
  return function MockDeviceModelManagementHeader(props) {
    return <div data-testid="device-model-header">DeviceModelHeader</div>;
  };
});

jest.mock("./AddDeviceModelDialog", () => {
  return function MockAddDeviceModelDialog(props) {
    return <div data-testid="add-device-model-dialog">AddDeviceModelDialog</div>;
  };
});

describe("DeviceModelManagement", () => {
  it("should render without crashing", () => {
    const { container } = render(<DeviceModelManagement />);
    expect(container).toBeTruthy();
  });

  it("should render all main components", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
    expect(screen.getByTestId("common-loading")).toBeInTheDocument();
    expect(screen.getByTestId("add-device-model-dialog")).toBeInTheDocument();
  });

  it("should render multiple times without error", () => {
    const { rerender } = render(<DeviceModelManagement />);
    rerender(<DeviceModelManagement />);
    rerender(<DeviceModelManagement />);
    expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
  });
});
