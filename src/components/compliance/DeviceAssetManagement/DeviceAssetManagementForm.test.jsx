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
          imeiNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).toBeInTheDocument();
    expect(screen.getByLabelText("IMEI Number")).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          imeiNumber: "",
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
        screen.getByText("IMEI Number is required")
      ).toBeInTheDocument();
    });
  });

  test("shows validation error for invalid IMEI number", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          imeiNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText("Model Name"), {
      target: { value: "Geotab GO9" },
    });

    fireEvent.change(screen.getByLabelText("IMEI Number"), {
      target: { value: "12345" },
    });

    const form = document.getElementById("testForm");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText("IMEI Number must be 15 digits")
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          imeiNumber: "",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText("Model Name"), {
      target: { value: "Geotab GO9" },
    });

    fireEvent.change(screen.getByLabelText("IMEI Number"), {
      target: { value: "356938090123456" },
    });

    const form = document.getElementById("testForm");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("fields are disabled in view mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "Geotab GO9",
          imeiNumber: "356938090123456",
        }}
        isEditing={false}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).toBeDisabled();

    expect(screen.getByLabelText("IMEI Number")).toBeDisabled();
  });

  test("fields are enabled in edit mode", () => {
    render(
      <DeviceAssetManagementForm
        formId="testForm"
        defaultValues={{
          modelName: "Geotab GO9",
          imeiNumber: "356938090123456",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText("Model Name")).not.toBeDisabled();

    expect(screen.getByLabelText("IMEI Number")).not.toBeDisabled();
  });
});