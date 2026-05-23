import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeviceModelManagementForm from "./DeviceModelManagementForm";

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
    render(<DeviceModelManagementForm {...defaultProps} />);
    expect(screen.getByLabelText(/Model Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asset Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Logs/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Status/i)).not.toBeInTheDocument();
  });

  test("shows status field in edit mode", () => {
    render(<DeviceModelManagementForm {...defaultProps} isEditMode={true} />);
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  test("shows validation errors for required fields", async () => {
    render(<DeviceModelManagementForm {...defaultProps} />);
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/Model Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    });
  });

  test("calls onSubmit with form values", async () => {
    const mockSubmit = jest.fn();
    render(<DeviceModelManagementForm {...defaultProps} onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/Model Name/i), "Test Model");
    await userEvent.type(screen.getByLabelText(/Description/i), "Description");

    const assetType = screen.getByLabelText(/Asset Type/i);
    await userEvent.click(assetType);
    await userEvent.click(screen.getByText("Truck"));

    const eLogs = screen.getByLabelText(/E-Logs/i);
    await userEvent.click(eLogs);
    await userEvent.click(screen.getByText("Yes"));

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
