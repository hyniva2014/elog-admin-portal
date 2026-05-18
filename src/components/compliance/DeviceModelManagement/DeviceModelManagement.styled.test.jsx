import { render as rtlRender, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AddButton, StatusText } from "./DeviceModelManagement.styled.jsx";

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
});
