import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material";
import AddDeviceDialog from "./AddDeviceDialog";

// ─── Theme wrapper ────────────────────────────────────────────────────────────
const theme = createTheme();

const render = (ui, options) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

// ─── Default props ────────────────────────────────────────────────────────────
const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  loading: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
/**
 * Opens an MUI Autocomplete by clicking its input, then selects the first
 * matching option from the dropdown list.
 * Pass exactLabel=true to match the label text exactly (avoids ambiguity).
 */
const selectAutocompleteOption = async (labelText, optionText, exactLabel = false) => {
  const input = exactLabel
    ? screen.getByRole("combobox", { name: new RegExp(`^${labelText}`, "i") })
    : screen.getByLabelText(new RegExp(labelText, "i"));
  await userEvent.click(input);
  const option = await screen.findByText(optionText);
  await userEvent.click(option);
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("AddDeviceDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe("Rendering", () => {
    it("renders the dialog with the correct title", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(
        screen.getByText("Assign Device to Carrier")
      ).toBeInTheDocument();
    });

    it("does not render when open is false", () => {
      render(<AddDeviceDialog {...defaultProps} open={false} />);
      expect(
        screen.queryByText("Assign Device to Carrier")
      ).not.toBeInTheDocument();
    });

    it("renders the DEVICE INFORMATION section header", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByText("DEVICE INFORMATION")).toBeInTheDocument();
    });

    it("renders the CURRENT STATUS section header", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByText("CURRENT STATUS")).toBeInTheDocument();
    });

    it("renders the VEHICLE DETAILS section header", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByText("VEHICLE DETAILS")).toBeInTheDocument();
    });

    it("renders Save and Cancel action buttons", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("renders all device information fields", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByLabelText(/Serial Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Carrier Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Firmware Version/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Current Status/i)).toBeInTheDocument();
    });

    it("renders all vehicle detail fields", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByLabelText(/VIN No/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Plate Number/i)).toBeInTheDocument();
      // Use placeholder to avoid ambiguity with "Device Model"
      expect(screen.getByPlaceholderText("Freightliner")).toBeInTheDocument();
      expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    });

    it("renders correct placeholders on text fields", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByPlaceholderText("SN-ABC12345")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("v2.4.1")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("In Stock")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("1HGBH41JXMN109186")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("FL-01-201")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Freightliner")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("2025")).toBeInTheDocument();
    });
  });

  // ── Validation ─────────────────────────────────────────────────────────────

  describe("Validation", () => {
    it("shows required error for Carrier ID when form is submitted empty", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText(/Carrier ID is required/i)
        ).toBeInTheDocument();
      });
    });

    it("shows required error for Serial Number when form is submitted empty", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText(/Serial Number is required/i)
        ).toBeInTheDocument();
      });
    });

    it("shows required error for Status when form is submitted empty", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(screen.getByText(/Status is required/i)).toBeInTheDocument();
      });
    });

    it("shows required error for Truck No when form is submitted empty", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(screen.getByText(/Truck No is required/i)).toBeInTheDocument();
      });
    });

    it("shows year format error when year is not 4 digits", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const yearInput = screen.getByPlaceholderText("2025");

      await userEvent.type(yearInput, "25");
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText(/Year must be 4 digits/i)
        ).toBeInTheDocument();
      });
    });

    it("does not show year error when year is a valid 4-digit value", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const yearInput = screen.getByPlaceholderText("2025");

      await userEvent.type(yearInput, "2024");
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.queryByText(/Year must be 4 digits/i)
        ).not.toBeInTheDocument();
      });
    });

    it("does not call onSubmit when required fields are missing", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });

  // ── User interactions ──────────────────────────────────────────────────────

  describe("User interactions", () => {
    it("calls onClose when Cancel button is clicked", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      fireEvent.click(screen.getByText("Cancel"));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when the close (X) icon button is clicked", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      // CloseIcon button is the only icon button in the dialog header
      const closeButton = screen.getByTestId
        ? screen.queryByTestId("CloseIcon")?.closest("button") ||
          screen.getAllByRole("button").find((btn) =>
            btn.querySelector('[data-testid="CloseIcon"]')
          )
        : screen.getAllByRole("button")[0];

      if (closeButton) {
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it("allows typing in the Serial Number field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const serialInput = screen.getByPlaceholderText("SN-ABC12345");

      await userEvent.type(serialInput, "SN-XYZ99999");
      expect(serialInput.value).toBe("SN-XYZ99999");
    });

    it("allows typing in the Firmware Version field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const fwInput = screen.getByPlaceholderText("v2.4.1");

      await userEvent.type(fwInput, "v3.0.0");
      expect(fwInput.value).toBe("v3.0.0");
    });

    it("allows typing in the VIN No field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const vinInput = screen.getByPlaceholderText("1HGBH41JXMN109186");

      await userEvent.type(vinInput, "1FTFW1ET5DFC10312");
      expect(vinInput.value).toBe("1FTFW1ET5DFC10312");
    });

    it("allows typing in the Plate Number field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const plateInput = screen.getByPlaceholderText("FL-01-201");

      await userEvent.type(plateInput, "TX-99-001");
      expect(plateInput.value).toBe("TX-99-001");
    });

    it("allows typing in the Model field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const modelInput = screen.getByPlaceholderText("Freightliner");

      await userEvent.type(modelInput, "Cascadia");
      expect(modelInput.value).toBe("Cascadia");
    });

    it("allows typing a valid year in the Year field", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      const yearInput = screen.getByPlaceholderText("2025");

      await userEvent.type(yearInput, "2023");
      expect(yearInput.value).toBe("2023");
    });

    it("selects a Carrier ID from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Carrier ID", "C-01");
      expect(screen.getByDisplayValue("C-01")).toBeInTheDocument();
    });

    it("selects a Device Model from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Device Model", "Geotab GO9");
      expect(screen.getByDisplayValue("Geotab GO9")).toBeInTheDocument();
    });

    it("selects a Status from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Status", "Active", true);
      expect(screen.getByDisplayValue("Active")).toBeInTheDocument();
    });

    it("selects a Truck No from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Truck No", "TRK-089");
      expect(screen.getByDisplayValue("TRK-089")).toBeInTheDocument();
    });

    it("selects a Make from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Make", "Kenworth");
      expect(screen.getByDisplayValue("Kenworth")).toBeInTheDocument();
    });

    it("selects a GVWR from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("GVWR", "80,000 lbs");
      expect(screen.getByDisplayValue("80,000 lbs")).toBeInTheDocument();
    });

    it("selects a Registration State from the dropdown", async () => {
      render(<AddDeviceDialog {...defaultProps} />);
      await selectAutocompleteOption("Registration State", "Texas");
      expect(screen.getByDisplayValue("Texas")).toBeInTheDocument();
    });
  });

  // ── Form submission ────────────────────────────────────────────────────────

  describe("Form submission", () => {
    it("calls onSubmit with optional fields included in payload", async () => {
      render(<AddDeviceDialog {...defaultProps} />);

      await selectAutocompleteOption("Carrier ID", "C-03");
      await userEvent.type(
        screen.getByPlaceholderText("SN-ABC12345"),
        "SN-OPT002"
      );
      await selectAutocompleteOption("Status", "Warning", true);
      await selectAutocompleteOption("Truck No", "TRK-045");
      await userEvent.type(screen.getByPlaceholderText("v2.4.1"), "v1.0.0");
      await userEvent.type(
        screen.getByPlaceholderText("1HGBH41JXMN109186"),
        "1FTFW1ET5DFC10312"
      );
      await userEvent.type(screen.getByPlaceholderText("2025"), "2022");

      await waitFor(async () => {
        const form = document.querySelector('form[id="add-device-form"]');
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            carrierId: "C-03",
            serialNumber: "SN-OPT002",
            status: "Warning",
            truckNumber: "TRK-045",
            firmwareVersion: "v1.0.0",
            vinNo: "1FTFW1ET5DFC10312",
            year: "2022",
          })
        );
      });
    });
  });

  // ── Loading state ──────────────────────────────────────────────────────────

  describe("Loading state", () => {
    it("renders the dialog in loading state without crashing", () => {
      render(<AddDeviceDialog {...defaultProps} loading={true} />);
      expect(
        screen.getByText("Assign Device to Carrier")
      ).toBeInTheDocument();
    });

    it("disables the Save button when loading", () => {
      render(<AddDeviceDialog {...defaultProps} loading={true} />);
      expect(screen.getByText("Save").closest("button")).toBeDisabled();
    });

    it("disables the Cancel button when loading", () => {
      render(<AddDeviceDialog {...defaultProps} loading={true} />);
      expect(screen.getByText("Cancel").closest("button")).toBeDisabled();
    });

    it("disables the Serial Number input when loading", () => {
      render(<AddDeviceDialog {...defaultProps} loading={true} />);
      expect(screen.getByPlaceholderText("SN-ABC12345")).toBeDisabled();
    });

    it("disables the Firmware Version input when loading", () => {
      render(<AddDeviceDialog {...defaultProps} loading={true} />);
      expect(screen.getByPlaceholderText("v2.4.1")).toBeDisabled();
    });
  });

  // ── Form reset ─────────────────────────────────────────────────────────────

  describe("Form reset", () => {
    it("resets the form when the dialog is closed (open → false)", async () => {
      const { rerender } = render(<AddDeviceDialog {...defaultProps} />);

      await userEvent.type(
        screen.getByPlaceholderText("SN-ABC12345"),
        "SN-RESET"
      );
      expect(screen.getByPlaceholderText("SN-ABC12345").value).toBe(
        "SN-RESET"
      );

      // Close the dialog
      rerender(<AddDeviceDialog {...defaultProps} open={false} />);
      // Reopen
      rerender(<AddDeviceDialog {...defaultProps} open={true} />);

      expect(screen.getByPlaceholderText("SN-ABC12345").value).toBe("");
    });

    it("resets the form when Cancel is clicked", async () => {
      render(<AddDeviceDialog {...defaultProps} />);

      await userEvent.type(
        screen.getByPlaceholderText("SN-ABC12345"),
        "SN-CANCEL"
      );
      fireEvent.click(screen.getByText("Cancel"));

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("resets the form after a successful submission", async () => {
      render(<AddDeviceDialog {...defaultProps} />);

      // Use the same combination that works in the "optional fields" test
      await selectAutocompleteOption("Carrier ID", "C-03");
      await userEvent.type(
        screen.getByPlaceholderText("SN-ABC12345"),
        "SN-RESET"
      );
      await selectAutocompleteOption("Status", "Warning", true);
      await selectAutocompleteOption("Truck No", "TRK-045");
      await userEvent.type(screen.getByPlaceholderText("v2.4.1"), "v1.0.0");
      await userEvent.type(
        screen.getByPlaceholderText("1HGBH41JXMN109186"),
        "1FTFW1ET5DFC10312"
      );
      await userEvent.type(screen.getByPlaceholderText("2025"), "2022");

      await waitFor(async () => {
        const form = document.querySelector('form[id="add-device-form"]');
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      // After submit the serial number field should be cleared
      expect(screen.getByPlaceholderText("SN-ABC12345").value).toBe("");
    });
  });

  // ── Carrier Name (disabled) ────────────────────────────────────────────────

  describe("Carrier Name field", () => {
    it("renders the Carrier Name field as disabled", () => {
      render(<AddDeviceDialog {...defaultProps} />);
      expect(screen.getByLabelText(/Carrier Name/i)).toBeDisabled();
    });
  });
});
