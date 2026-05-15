import { render as rtlRender, screen } from "@testing-library/react";
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
