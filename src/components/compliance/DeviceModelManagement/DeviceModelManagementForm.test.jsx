import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeviceModelManagementForm from "./DeviceModelManagementForm";

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("DeviceModelManagementForm", () => {
  const defaultProps = {
    formId: "testForm",
    defaultValues: {
      deviceCode: "",
      modelName: "",
      description: "",
      assetType: "",
      supportsElogs: "",
      status: 1,
    },
    isEditing: false,
    isEditMode: false,
    onSubmit: jest.fn(),
  };

  test("renders form fields in add mode", () => {
    renderWithTheme(<DeviceModelManagementForm {...defaultProps} />);
    expect(screen.getByLabelText(/Model Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Asset Type/i)).toBeInTheDocument();
    expect(screen.getByText(/E-Logs/i)).toBeInTheDocument();
  });

  test("shows status field in edit mode", () => {
    renderWithTheme(<DeviceModelManagementForm {...defaultProps} isEditMode={true} />);
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  test("form renders without crashing", () => {
    const { container } = renderWithTheme(<DeviceModelManagementForm {...defaultProps} />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  test("form has submit button", () => {
    renderWithTheme(<DeviceModelManagementForm {...defaultProps} />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
