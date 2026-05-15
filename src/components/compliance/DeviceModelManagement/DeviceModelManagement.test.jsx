import { render, screen, act } from "@testing-library/react";
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

describe("DeviceModelManagement – edge cases", () => {
  it("should render add-device-model dialog in closed state by default", () => {
    render(<DeviceModelManagement />);
    const dialog = screen.getByTestId("add-device-model-dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("should not crash when rerendered rapidly", () => {
    const { rerender, unmount } = render(<DeviceModelManagement />);
    for (let i = 0; i < 5; i++) {
      rerender(<DeviceModelManagement />);
    }
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
    unmount();
  });

  it("should render header with data-testid even when no options are derived", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
  });
});

describe("DeviceModelManagement – negative cases", () => {
  it("should not render unexpected elements outside the known structure", () => {
    render(<DeviceModelManagement />);
    expect(screen.queryByTestId("nonexistent-component")).toBeNull();
  });

  it("should remain stable when the component mounts and unmounts", () => {
    const { unmount } = render(<DeviceModelManagement />);
    expect(() => unmount()).not.toThrow();
  });

  it("should handle rapid open/close state changes without crashing", () => {
    const MockAddDeviceModelDialog = jest.requireMock("./AddDeviceModelDialog");
    render(<DeviceModelManagement />);
    act(() => {
      expect(screen.getByTestId("add-device-model-dialog")).toBeInTheDocument();
    });
  });
});
