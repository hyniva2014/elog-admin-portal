import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import RoleManagementForm from "./RoleManagementForm";

jest.mock("../../../common/CommonTextField", () => (props) => (
  <div>
    <input
      data-testid={props.label}
      value={props.value || ""}
      onChange={props.onChange}
      disabled={props.disabled}
    />
    {props.helperText ? <span>{props.helperText}</span> : null}
  </div>
));

jest.mock("../DeviceAssetManagement/Constants", () => ({
  STATUS_OPTIONS: [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "Inactive",
      value: 0,
    },
  ],
}));

describe("RoleManagementForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnDirtyChange = jest.fn();

  const defaultProps = {
    formId: "role-form",
    defaultValues: {
      id: 1,
      title: "Admin",
      description: "Administrator Role",
      status: 1,
    },
    isEditing: true,
    isEditMode: true,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(<RoleManagementForm {...defaultProps} {...props} />);

  test("renders form fields correctly", () => {
    renderComponent();

    expect(screen.getByTestId("Role Title")).toBeInTheDocument();

    expect(screen.getByTestId("Description")).toBeInTheDocument();

    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  test("renders default values correctly", () => {
    renderComponent();

    expect(screen.getByTestId("Role Title")).toHaveValue("Admin");

    expect(screen.getByTestId("Description")).toHaveValue("Administrator Role");
  });

  test("updates title field correctly", () => {
    renderComponent();

    const titleField = screen.getByTestId("Role Title");

    fireEvent.change(titleField, {
      target: {
        value: "Manager",
      },
    });

    expect(titleField).toHaveValue("Manager");
  });

  test("updates description field correctly", () => {
    renderComponent();

    const descriptionField = screen.getByTestId("Description");

    fireEvent.change(descriptionField, {
      target: {
        value: "Manager Description",
      },
    });

    expect(descriptionField).toHaveValue("Manager Description");
  });

  test("reports dirty state when form values change", () => {
    renderComponent({ onDirtyChange: mockOnDirtyChange });

    expect(mockOnDirtyChange).toHaveBeenCalledWith(false);

    fireEvent.change(screen.getByTestId("Role Title"), {
      target: { value: "Manager" },
    });

    expect(mockOnDirtyChange).toHaveBeenLastCalledWith(true);
  });

  test("renders status dropdown only in edit mode", () => {
    renderComponent({
      isEditMode: false,
    });

    expect(screen.queryByLabelText("Status")).not.toBeInTheDocument();
  });

  test("disables fields when not editing", () => {
    renderComponent({
      isEditMode: true,
      isEditing: false,
    });

    expect(screen.getByTestId("Role Title")).toBeDisabled();

    expect(screen.getByTestId("Description")).toBeDisabled();

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("submits form correctly", async () => {
    renderComponent();

    fireEvent.submit(document.getElementById("role-form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: 1,
        title: "Admin",
        description: "Administrator Role",
        status: 1,
      });
    });
  });

  test("updates form when defaultValues change", async () => {
    const { rerender } = renderComponent();

    rerender(
      <RoleManagementForm
        {...defaultProps}
        defaultValues={{
          id: 2,
          title: "Manager",
          description: "Manager Description",
          status: 0,
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("Role Title")).toHaveValue("Manager");

      expect(screen.getByTestId("Description")).toHaveValue(
        "Manager Description",
      );
    });
  });

  test("shows validation errors when fields are empty", async () => {
    renderComponent({
      defaultValues: {
        title: "",
        description: "",
        status: 1,
      },
    });

    fireEvent.submit(document.getElementById("role-form"));

    await waitFor(() => {
      expect(screen.getByText("Role Title is required")).toBeInTheDocument();

      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  test("renders status options correctly", async () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByRole("combobox"));

    expect(await screen.findAllByText("Active")).toHaveLength(2);
    expect(await screen.findByText("Inactive")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
