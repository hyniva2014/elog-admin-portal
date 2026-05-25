import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceAssetManagementForm from "./DeviceAssetManagementForm";

describe("DeviceAssetManagementForm Component", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          serialNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).toBeInTheDocument();

    expect(screen.getByLabelText("Serial Number")).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          serialNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    const form = document.getElementById("testForm");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText("Model Name is required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Serial Number is required")
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          serialNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText("Model Name"), {
      target: { value: "ELD Model 1" },
    });

    fireEvent.change(screen.getByLabelText("Serial Number"), {
      target: { value: "SN001" },
    });

    const form = document.getElementById("testForm");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        modelName: "ELD Model 1",
        serialNumber: "SN001",
        status: "1",
      });
    });
  });

  test("fields are disabled in view mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "ELD Model 1",
          serialNumber: "SN001",
          status: "1",
        }}
        isEditing={false}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).toBeDisabled();

    expect(screen.getByLabelText("Serial Number")).toBeDisabled();

    expect(screen.getByLabelText("Status")).toBeDisabled();
  });

  test("fields are enabled in edit mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "ELD Model 1",
          serialNumber: "SN001",
          status: "1",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).not.toBeDisabled();

    expect(screen.getByLabelText("Serial Number")).not.toBeDisabled();

    expect(screen.getByLabelText("Status")).not.toBeDisabled();
  });

  test("renders status dropdown only in edit mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          serialNumber: "",
        }}
        isEditing={false}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  test("does not render status dropdown in add mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          serialNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.queryByLabelText("Status")).not.toBeInTheDocument();
  });

  test("updates status dropdown value", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "ELD Model 1",
          serialNumber: "SN001",
          status: "1",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    const statusDropdown = screen.getByLabelText("Status");

    fireEvent.mouseDown(statusDropdown);

    const inactiveOption = await screen.findByText("Inactive");

    fireEvent.click(inactiveOption);

    expect(inactiveOption).toBeInTheDocument();
  });

  test("resets form values when defaultValues change", async () => {
    const { rerender } = render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          serialNumber: "SN001",
          status: "1",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByDisplayValue("Model 1")).toBeInTheDocument();

    rerender(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 2",
          serialNumber: "SN002",
          status: "0",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Model 2")).toBeInTheDocument();

      expect(screen.getByDisplayValue("SN002")).toBeInTheDocument();
    });
  });
});