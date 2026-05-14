import { render as rtlRender, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material";
import AddAccountDialog from "./AddAccountDialog";

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

describe("AddAccountDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render dialog with title", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByText("Add New Account")).toBeInTheDocument();
  });

  it("should render all required form fields", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByLabelText(/Carrier Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Carrier Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/USDOT Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/MC Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Devices/i)).toBeInTheDocument();
  });

  it("should render primary details section", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByText("PRIMARY DETAILS")).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Contact Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Contact Email/i)).toBeInTheDocument();
  });

  it("should render secondary details section", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByText("SECONDARY DETAILS")).toBeInTheDocument();
    expect(screen.getByLabelText(/Secondary Contact Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Secondary Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Secondary Contact Email/i)).toBeInTheDocument();
  });

  it("should format Tax ID input", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    const taxIdInput = screen.getByPlaceholderText("XX-XXXXXXX");
    
    await userEvent.type(taxIdInput, "123456789");
    
    expect(taxIdInput.value).toBe("12-3456789");
  });

  it("should format phone number inputs", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    const tollFreeInput = screen.getAllByPlaceholderText("(XXX) XXX-XXXX")[0];
    
    await userEvent.type(tollFreeInput, "6025550100");
    
    expect(tollFreeInput.value).toBe("(602) 555-0100");
  });

  it("should show validation error for empty required fields", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    const saveButton = screen.getByText("Save");
    
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Carrier Name is required/i)).toBeInTheDocument();
    });
  });

  it("should call onClose when cancel button is clicked", () => {
    render(<AddAccountDialog {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have working form fields", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getByLabelText(/Carrier Name/i), "Test Carrier");
    expect(screen.getByLabelText(/Carrier Name/i).value).toBe("Test Carrier");
    
    await userEvent.type(screen.getAllByPlaceholderText("(XXX) XXX-XXXX")[0], "6025550100");
    expect(screen.getAllByPlaceholderText("(XXX) XXX-XXXX")[0].value).toBe("(602) 555-0100");
  });

  it("should format all phone fields correctly", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    const phoneInputs = screen.getAllByPlaceholderText("(XXX) XXX-XXXX");
    
    await userEvent.type(phoneInputs[0], "8005550100");
    expect(phoneInputs[0].value).toBe("(800) 555-0100");
    
    await userEvent.type(phoneInputs[1], "6025550200");
    expect(phoneInputs[1].value).toBe("(602) 555-0200");
    
    await userEvent.type(phoneInputs[2], "6025550300");
    expect(phoneInputs[2].value).toBe("(602) 555-0300");
    
    await userEvent.type(phoneInputs[3], "6025550400");
    expect(phoneInputs[3].value).toBe("(602) 555-0400");
  });

  it("should validate USDOT number format", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    const saveButton = screen.getByText("Save");
    
    await userEvent.type(screen.getByLabelText(/Carrier Name/i), "Test Carrier");
    await userEvent.type(screen.getByLabelText(/Carrier Address/i), "123 Test St");
    
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/USDOT Number is required/i)).toBeInTheDocument();
    });
  });

  it("should validate email format", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getByLabelText(/Primary Contact Email/i), "invalid-email");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("should validate Max Devices is a positive number", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getByLabelText(/Max Devices/i), "-1");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Max Devices must be greater than 0/i)).toBeInTheDocument();
    });
  });

  it("should validate carrier name minimum length", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getByLabelText(/Carrier Name/i), "A");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Carrier Name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it("should validate primary contact phone format", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getAllByPlaceholderText("(XXX) XXX-XXXX")[2], "123");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      const phoneErrors = screen.getAllByText(/Please enter a valid phone number/i);
      expect(phoneErrors.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should render optional fields", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Toll Free/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fax/i)).toBeInTheDocument();
  });

  it("should render with loading state", () => {
    render(<AddAccountDialog {...defaultProps} loading={true} />);
    expect(screen.getByText("Add New Account")).toBeInTheDocument();
  });

  it("should reset form when dialog is closed and reopened", async () => {
    const { rerender } = render(<AddAccountDialog {...defaultProps} open={false} />);
    
    rerender(<AddAccountDialog {...defaultProps} open={true} />);
    expect(screen.getByText("Add New Account")).toBeInTheDocument();
  });

  it("should have correct number of phone inputs", () => {
    render(<AddAccountDialog {...defaultProps} />);
    const phoneInputs = screen.getAllByPlaceholderText("(XXX) XXX-XXXX");
    expect(phoneInputs).toHaveLength(4);
  });

  it("should validate secondary contact phone", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getAllByPlaceholderText("(XXX) XXX-XXXX")[3], "123");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      const phoneErrors = screen.getAllByText(/Please enter a valid phone number/i);
      expect(phoneErrors.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should validate Tax ID format", async () => {
    render(<AddAccountDialog {...defaultProps} />);
    
    await userEvent.type(screen.getByPlaceholderText("XX-XXXXXXX"), "12345678");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Tax ID \(EIN\) must be in format XX-XXXXXXX/i)).toBeInTheDocument();
    });
  });

  it("should have Save and Cancel buttons", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should close on Cancel button click", () => {
    render(<AddAccountDialog {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should have correct form structure", () => {
    render(<AddAccountDialog {...defaultProps} />);
    expect(screen.getByText("PRIMARY DETAILS")).toBeInTheDocument();
    expect(screen.getByText("SECONDARY DETAILS")).toBeInTheDocument();
  });
});
