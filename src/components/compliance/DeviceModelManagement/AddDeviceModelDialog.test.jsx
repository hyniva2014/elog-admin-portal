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

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  loading: false,
};

describe("AddDeviceModelDialog", () => {
  it("should render dialog with title", () => {
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
});

describe("AddDeviceModelDialog – edge cases", () => {
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
});

describe("AddDeviceModelDialog – negative cases", () => {
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

  it("should show description min-length validation error for short input", async () => {
    render(<AddDeviceModelDialog {...defaultProps} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "ValidName" } });
    fireEvent.change(inputs[1], { target: { value: "Hi" } });
    const submitButton = screen.getByText("Add Device");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Description must be at least 5 characters")).toBeInTheDocument();
    });
  });
});
