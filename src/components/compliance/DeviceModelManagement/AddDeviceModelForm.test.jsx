import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddDeviceModelForm from "./AddDeviceModelForm";

describe("AddDeviceModelForm Component", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Model Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asset Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Logs/)).toBeInTheDocument();
  });

  test("does not render status dropdown in add mode", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.queryByLabelText(/Status/)).not.toBeInTheDocument();
  });

  test("renders status dropdown in edit mode", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          description: "Description 1",
          assetType: "Truck",
          eLogs: "Yes",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Status/)).toBeInTheDocument();
  });

  test("fields are disabled in view mode", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          description: "Description 1",
          assetType: "Truck",
          eLogs: "Yes",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Model Name/)).toBeDisabled();
    expect(screen.getByLabelText(/Description/)).toBeDisabled();
    expect(screen.getByLabelText(/Asset Type/)).toBeDisabled();
    expect(screen.getByLabelText(/E-Logs/)).toBeDisabled();
    expect(screen.getByLabelText(/Status/)).toBeDisabled();
  });

  test("fields are enabled in edit mode", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          description: "Description 1",
          assetType: "Truck",
          eLogs: "Yes",
          status: "Active",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Model Name/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Description/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Asset Type/)).not.toBeDisabled();
    expect(screen.getByLabelText(/E-Logs/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Status/)).not.toBeDisabled();
  });

  test("fields are enabled in add mode", () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Model Name/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Description/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Asset Type/)).not.toBeDisabled();
    expect(screen.getByLabelText(/E-Logs/)).not.toBeDisabled();
  });

  test("shows validation errors when required fields are empty", async () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    const form = document.getElementById("testForm");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Model Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Asset Type is required")).toBeInTheDocument();
      expect(screen.getByText("E-Logs is required")).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Model Name/), {
      target: { value: "Test Model" },
    });

    fireEvent.change(screen.getByLabelText(/Description/), {
      target: { value: "Test Description" },
    });

    const assetTypeDropdown = screen.getByLabelText(/Asset Type/);
    fireEvent.mouseDown(assetTypeDropdown);
    const truckOption = await screen.findByText("Truck");
    fireEvent.click(truckOption);

    const eLogsDropdown = screen.getByLabelText(/E-Logs/);
    fireEvent.mouseDown(eLogsDropdown);
    const yesOption = await screen.findByText("Yes");
    fireEvent.click(yesOption);

    const form = document.getElementById("testForm");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        modelName: "Test Model",
        description: "Test Description",
        assetType: "Truck",
        eLogs: "Yes",
        status: "Active",
      });
    });
  });

  test("updates dropdown values correctly", async () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          description: "Description 1",
          assetType: "Truck",
          eLogs: "Yes",
          status: "Active",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    const statusDropdown = screen.getByLabelText(/Status/);
    fireEvent.mouseDown(statusDropdown);
    const inactiveOption = await screen.findByText("Inactive");
    fireEvent.click(inactiveOption);

    expect(inactiveOption).toBeInTheDocument();
  });

  test("resets form values when defaultValues change", async () => {
    const { rerender } = render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 1",
          description: "Description 1",
          assetType: "Truck",
          eLogs: "Yes",
          status: "Active",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByDisplayValue("Model 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Description 1")).toBeInTheDocument();

    rerender(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "Model 2",
          description: "Description 2",
          assetType: "Trailer",
          eLogs: "No",
          status: "Inactive",
        }}
        isEditing={true}
        isEditMode={true}
        onSubmit={mockSubmit}
      />
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Model 2")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Description 2")).toBeInTheDocument();
    });
  });

  test("handles trailer asset type selection", async () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    const assetTypeDropdown = screen.getByLabelText(/Asset Type/);
    fireEvent.mouseDown(assetTypeDropdown);
    const trailerOption = await screen.findByText("Trailer");
    fireEvent.click(trailerOption);

    expect(trailerOption).toBeInTheDocument();
  });

  test("handles no option for e-logs selection", async () => {
    render(
      <AddDeviceModelForm
        formId="testForm"
        defaultValues={{
          modelName: "",
          description: "",
          assetType: "",
          eLogs: "",
          status: "Active",
        }}
        isEditing={false}
        isEditMode={false}
        onSubmit={mockSubmit}
      />
    );

    const eLogsDropdown = screen.getByLabelText(/E-Logs/);
    fireEvent.mouseDown(eLogsDropdown);
    const noOption = await screen.findByText("No");
    fireEvent.click(noOption);

    expect(noOption).toBeInTheDocument();
  });
});
