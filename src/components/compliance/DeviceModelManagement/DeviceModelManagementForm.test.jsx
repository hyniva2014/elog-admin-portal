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
    const { container } = renderWithTheme(<DeviceModelManagementForm {...defaultProps} />);
    expect(screen.getByLabelText(/Model Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Asset Type/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/E-Logs/i).length).toBeGreaterThan(0);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  test("shows status field in edit mode", () => {
    const { container } = renderWithTheme(<DeviceModelManagementForm {...defaultProps} isEditMode={true} />);
    expect(screen.getAllByText(/Status/i).length).toBeGreaterThan(0);
  });

  test("form accepts text input", async () => {
    renderWithTheme(<DeviceModelManagementForm {...defaultProps} />);
    const modelInput = screen.getByLabelText(/Model Name/i);
    await userEvent.type(modelInput, "Test Model");
    expect(modelInput).toHaveValue("Test Model");
  });
});
