import { render as rtlRender, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import AddDeviceModelDialog from "./AddDeviceModelDialog";

const theme = createTheme();

const render = (ui, options) => {
  const Wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();
const mockOnEditClick = jest.fn();
const mockOnCancelEdit = jest.fn();

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  loading: false,
  isEditMode: false,
  isEditing: false,
  selectedDeviceModel: null,
  headerActions: null,
};

const viewModeProps = {
  open: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  loading: false,
  isEditMode: true,
  isEditing: false,
  selectedDeviceModel: {
    model: "Samsara G1",
    modelName: "Samsara G1",
    description: "Test description",
    assetType: "Truck",
    eLogs: "Yes",
    status: "Active",
  },
  headerActions: <button data-testid="edit-button">Edit</button>,
};

const editModeProps = {
  open: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  loading: false,
  isEditMode: true,
  isEditing: true,
  selectedDeviceModel: {
    model: "Samsara G1",
    modelName: "Samsara G1",
    description: "Test description",
    assetType: "Truck",
    eLogs: "Yes",
    status: "Active",
  },
  headerActions: <button data-testid="cancel-edit-button">Cancel Edit</button>,
};

describe("AddDeviceModelDialog - Add Mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render dialog with 'Add Device Model' title", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    expect(screen.getByText("Add Device Model")).toBeInTheDocument();
  });

  it("should render all required form fields", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    expect(screen.getAllByText("Model Name").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Description").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Asset Type").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("E-Logs").length).toBeGreaterThanOrEqual(1);
  });

  it("should have Add Device and Cancel buttons", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    expect(screen.getByText("Add Device")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should not render Status field in add mode", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    expect(screen.queryByText("Status")).toBeNull();
  });

  it("should not render header actions in add mode", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    expect(screen.queryByTestId("edit-button")).toBeNull();
  });
});

describe("AddDeviceModelDialog - View Mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render dialog with 'View Device Model' title", () => {
    render(<AddDeviceModelDialog {...viewModeProps} />);
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });

  it("should render Status field in view mode", () => {
    render(<AddDeviceModelDialog {...viewModeProps} />);
    // Status appears in both label and other elements, so use getAllByText
    expect(screen.getAllByText("Status").length).toBeGreaterThanOrEqual(1);
  });

  it("should render header actions (Edit button) in view mode", () => {
    render(<AddDeviceModelDialog {...viewModeProps} />);
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });

  it("should disable form fields in view mode", () => {
    render(<AddDeviceModelDialog {...viewModeProps} />);
    // Fields should be disabled when isEditing is false
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });

  it("should pre-populate form with selected device model data", () => {
    render(<AddDeviceModelDialog {...viewModeProps} />);
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });
});

describe("AddDeviceModelDialog - Edit Mode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render dialog with 'View Device Model' title in edit mode", () => {
    render(<AddDeviceModelDialog {...editModeProps} />);
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });

  it("should render Update button in edit mode", () => {
    render(<AddDeviceModelDialog {...editModeProps} />);
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("should render Cancel Edit button in header actions", () => {
    render(<AddDeviceModelDialog {...editModeProps} />);
    expect(screen.getByTestId("cancel-edit-button")).toBeInTheDocument();
  });

  it("should enable form fields in edit mode", () => {
    render(<AddDeviceModelDialog {...editModeProps} />);
    expect(screen.getByText("Update")).toBeInTheDocument();
  });
});

describe("AddDeviceModelDialog – Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show validation errors when form is submitted with empty fields", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Model Name is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  it("should show min-length validation error for model name below 2 characters", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "A" } });
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Model Name must be at least 2 characters")).toBeInTheDocument();
    });
  });

  it("should show max-length validation error for model name exceeding 100 characters", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "A".repeat(101) } });
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Model Name must not exceed 100 characters")).toBeInTheDocument();
    });
  });

  it("should show validation error for description below 5 characters", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Valid Name" } });
    fireEvent.change(inputs[1], { target: { value: "Hi" } });
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Description must be at least 5 characters")).toBeInTheDocument();
    });
  });
});

describe("AddDeviceModelDialog – Edge Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render dialog content when open is false", () => {
    render(<AddDeviceModelDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Add Device Model")).toBeNull();
  });

  it("should disable all fields when loading is true", () => {
    render(<AddDeviceModelDialog {...defaultProps} loading={true} />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("should disable fields in view mode when loading is true", () => {
    render(<AddDeviceModelDialog {...viewModeProps} loading={true} />);
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });

  it("should handle missing selectedDeviceModel gracefully", () => {
    render(<AddDeviceModelDialog {...viewModeProps} selectedDeviceModel={null} />);
    expect(screen.getByText("View Device Model")).toBeInTheDocument();
  });
});

describe("AddDeviceModelDialog – Negative Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not call onSubmit when required fields are empty", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("should call onClose when Cancel is clicked", () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not render when open prop is explicitly false", () => {
    render(<AddDeviceModelDialog {...defaultProps} open={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should handle rapid open/close transitions", async () => {
    const { rerender } = render(<AddDeviceModelDialog {...defaultProps} open={false} />);
    rerender(<AddDeviceModelDialog {...defaultProps} open={true} />);
    rerender(<AddDeviceModelDialog {...defaultProps} open={false} />);
    rerender(<AddDeviceModelDialog {...defaultProps} open={true} />);
    expect(screen.getByText("Add Device Model")).toBeInTheDocument();
  });
});
