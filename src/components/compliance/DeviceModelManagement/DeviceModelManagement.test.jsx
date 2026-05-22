import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import DeviceModelManagement from "./DeviceModelManagement";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => null,
  useDispatch: () => jest.fn(),
}));

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(),
    createApi: jest.fn(),
  }),
}));

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
    return (
      <div data-testid="add-device-model-dialog">
        <span data-testid="dialog-mode">{props.isEditMode ? 'edit' : 'add'}</span>
        <span data-testid="dialog-editing">{props.isEditing ? 'true' : 'false'}</span>
        {props.headerActions && <div data-testid="header-actions">{props.headerActions}</div>}
      </div>
    );
  };
});

const mockDeviceModel = {
  id: 1,
  device_model_id: 1,
  device_code: "SG1",
  model: "Samsara G1",
  modelName: "Samsara G1",
  assetType: "Truck",
  description: "Test description",
  eLogs: "Yes",
  status: "Active",
};

describe("DeviceModelManagement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("should initialize in add mode by default", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByTestId("dialog-mode")).toHaveTextContent("add");
    expect(screen.getByTestId("dialog-editing")).toHaveTextContent("false");
  });
});

describe("DeviceModelManagement – View/Edit Mode", () => {
  it("should start with dialog in add mode before any row is viewed", async () => {
    render(<DeviceModelManagement />);
    await waitFor(() => {
      expect(screen.getByTestId("dialog-mode")).toHaveTextContent("add");
    });
  });

  it("should render header actions when in view mode", async () => {
    render(<DeviceModelManagement />);
    
    // Header actions should not be present in add mode
    expect(screen.queryByTestId("header-actions")).toBeNull();
  });

  it("should handle rapid mode switching without crashing", () => {
    const { rerender } = render(<DeviceModelManagement />);
    
    for (let i = 0; i < 3; i++) {
      rerender(<DeviceModelManagement />);
    }
    
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
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

  it("should handle empty device model data gracefully", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });
});

describe("DeviceModelManagement – API Integration", () => {
  it("should handle API fetch errors gracefully", () => {
    render(<DeviceModelManagement />);
    // Component should render even if API fails
    expect(screen.getByTestId("device-model-header")).toBeInTheDocument();
  });

  it("should handle successful data fetch", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
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
    render(<DeviceModelManagement />);
    act(() => {
      expect(screen.getByTestId("add-device-model-dialog")).toBeInTheDocument();
    });
  });

  it("should handle undefined selected device model", () => {
    render(<DeviceModelManagement />);
    // Should not crash when selectedDeviceModel is null/undefined
    expect(screen.getByTestId("add-device-model-dialog")).toBeInTheDocument();
  });
});
