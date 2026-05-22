import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AddButton, StatusText, EditButton, CancelEditButton } from "./DeviceModelManagement.styled.jsx";

const theme = createTheme();

const render = (ui, options) => {
  const Wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

describe("DeviceModelManagement.styled", () => {
  describe("AddButton", () => {
    it("should render correctly", () => {
      render(<AddButton>Add Asset</AddButton>);
      expect(screen.getByText("Add Asset")).toBeInTheDocument();
    });

    it("should render with custom text", () => {
      render(<AddButton>Custom Text</AddButton>);
      expect(screen.getByText("Custom Text")).toBeInTheDocument();
    });
  });

  describe("StatusText", () => {
    it("should render active status", () => {
      render(<StatusText status="Active">Active</StatusText>);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should render inactive status", () => {
      render(<StatusText status="Inactive">Inactive</StatusText>);
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });
  });

  describe("EditButton", () => {
    it("should render correctly with 'Edit' text", () => {
      render(<EditButton>Edit</EditButton>);
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("should handle click events", () => {
      const handleClick = jest.fn();
      render(<EditButton onClick={handleClick}>Edit</EditButton>);
      fireEvent.click(screen.getByText("Edit"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render with variant contained", () => {
      render(<EditButton variant="contained">Edit</EditButton>);
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });
  });

  describe("CancelEditButton", () => {
    it("should render correctly with 'Cancel Edit' text", () => {
      render(<CancelEditButton>Cancel Edit</CancelEditButton>);
      expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
    });

    it("should handle click events", () => {
      const handleClick = jest.fn();
      render(<CancelEditButton onClick={handleClick}>Cancel Edit</CancelEditButton>);
      fireEvent.click(screen.getByText("Cancel Edit"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render with variant outlined", () => {
      render(<CancelEditButton variant="outlined">Cancel Edit</CancelEditButton>);
      expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
    });
  });
});
