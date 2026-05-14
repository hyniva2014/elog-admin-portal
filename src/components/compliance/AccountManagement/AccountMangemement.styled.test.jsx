import { render, screen } from "@testing-library/react";
import {
  HeaderContainer,
  AddAccountButton,
  GridContainer,
  StatusText,
  AddressCellText,
  DialogFormContainer,
  SectionHeaderText,
} from "./AccountMangemement.styled";

describe("Styled Components", () => {
  describe("HeaderContainer", () => {
    it("should render children correctly", () => {
      render(
        <HeaderContainer data-testid="header-container">
          <div>Test Content</div>
        </HeaderContainer>
      );
      expect(screen.getByTestId("header-container")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("AddAccountButton", () => {
    it("should render with correct text", () => {
      render(<AddAccountButton>Add Account</AddAccountButton>);
      expect(screen.getByText("Add Account")).toBeInTheDocument();
    });

    it("should be clickable", () => {
      const handleClick = jest.fn();
      render(<AddAccountButton onClick={handleClick}>Click Me</AddAccountButton>);
      screen.getByText("Click Me").click();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("GridContainer", () => {
    it("should render children", () => {
      render(
        <GridContainer data-testid="grid-container">
          <div>Grid Content</div>
        </GridContainer>
      );
      expect(screen.getByTestId("grid-container")).toBeInTheDocument();
    });
  });

  describe("StatusText", () => {
    it("should render with Active status", () => {
      render(<StatusText accountStatus="Active">Active</StatusText>);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should render with Inactive status", () => {
      render(<StatusText accountStatus="Inactive">Inactive</StatusText>);
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });
  });

  describe("AddressCellText", () => {
    it("should render address text", () => {
      render(<AddressCellText>123 Test St</AddressCellText>);
      expect(screen.getByText("123 Test St")).toBeInTheDocument();
    });
  });

  describe("DialogFormContainer", () => {
    it("should render form content", () => {
      render(
        <DialogFormContainer data-testid="form-container">
          <div>Form Fields</div>
        </DialogFormContainer>
      );
      expect(screen.getByTestId("form-container")).toBeInTheDocument();
    });
  });

  describe("SectionHeaderText", () => {
    it("should render section header", () => {
      render(<SectionHeaderText>Section Header</SectionHeaderText>);
      expect(screen.getByText("Section Header")).toBeInTheDocument();
    });
  });
});
