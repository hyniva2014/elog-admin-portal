import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import UserManagementForm from "./UserManagementForm";

const mockOnClose = jest.fn();
const mockOnSubmitForm = jest.fn();

jest.mock("../../../common/CommonDialogForm", () => {
  return function MockCommonDialogForm(props) {
    return (
      <div>
        <div>{props.title}</div>

        {props.headerActions}

        <div>{props.content}</div>

        {props.submitButtonText && (
          <button onClick={props.onCancel}>Cancel</button>
        )}

        {props.submitButtonText && (
          <button form={props.formId} onClick={props.onSubmit}>
            {props.submitButtonText}
          </button>
        )}
      </div>
    );
  };
});

jest.mock("../../../common/CommonTextField", () => {
  return function MockTextField(props) {
    return (
      <div>
        <label>{props.label}</label>

        <input
          data-testid={props.name}
          disabled={props.disabled}
          {...props.register(props.name)}
        />

        {props.helperText && <span>{props.helperText}</span>}
      </div>
    );
  };
});

jest.mock("../../../common/CommonAutocompleteDropdown", () => {
  return function MockDropdown(props) {
    return (
      <div>
        <label>{props.label}</label>

        <select
          data-testid={props.name}
          disabled={props.disabled}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <option value="">Select</option>

          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {props.helperText && <span>{props.helperText}</span>}
      </div>
    );
  };
});

const companyOptions = [
  {
    label: "TrackPulse Logistics",
    value: "7",
  },
];

const initialData = {
  company_id: 7,
  role_id: 1,
  status_id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@test.com",
};

describe("UserManagementForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders add user form correctly", () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getAllByText("Add User")[0]).toBeInTheDocument();

    expect(screen.getByTestId("firstName")).toBeInTheDocument();

    expect(screen.getByTestId("lastName")).toBeInTheDocument();

    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  test("renders password fields in add mode", () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getByTestId("password")).toBeInTheDocument();

    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
  });

  test("does not render password fields in view mode", () => {
    render(
      <UserManagementForm
        open
        mode="view"
        initialData={initialData}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.queryByTestId("password")).not.toBeInTheDocument();

    expect(screen.queryByTestId("confirmPassword")).not.toBeInTheDocument();
  });

  test("renders view mode correctly", () => {
    render(
      <UserManagementForm
        open
        mode="view"
        initialData={initialData}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getByText("View User")).toBeInTheDocument();

    expect(screen.getByDisplayValue("John")).toBeDisabled();

    expect(screen.getByDisplayValue("Doe")).toBeDisabled();
  });

  test("enables edit mode when edit button clicked", async () => {
    render(
      <UserManagementForm
        open
        mode="view"
        initialData={initialData}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(screen.getByText("Update User")).toBeInTheDocument();
    });
  });

  test("calls onClose when cancel clicked", () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("submits add form successfully", async () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.change(screen.getByTestId("company_id"), {
      target: {
        value: "7",
      },
    });

    fireEvent.change(screen.getByTestId("role_id"), {
      target: {
        value: "1",
      },
    });

    fireEvent.change(screen.getByTestId("firstName"), {
      target: {
        value: "John",
      },
    });

    fireEvent.change(screen.getByTestId("lastName"), {
      target: {
        value: "Doe",
      },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: {
        value: "john@test.com",
      },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: {
        value: "test@123",
      },
    });

    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: {
        value: "test@123",
      },
    });

    fireEvent.submit(document.getElementById("user-management-form"));

    await waitFor(() => {
      expect(mockOnSubmitForm).toHaveBeenCalled();
    });
  });

  test("shows validation errors for empty fields", async () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.submit(document.getElementById("user-management-form"));

    await waitFor(() => {
      expect(screen.getByText("Account is required")).toBeInTheDocument();
    });

    expect(screen.getByText("User Profile is required")).toBeInTheDocument();

    expect(screen.getByText("First Name is required")).toBeInTheDocument();

    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
  });

  test("shows password mismatch validation", async () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.change(screen.getByTestId("password"), {
      target: {
        value: "test@123",
      },
    });

    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: {
        value: "wrong@123",
      },
    });

    fireEvent.submit(document.getElementById("user-management-form"));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });
  });

  test("shows invalid email validation", async () => {
    render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.change(screen.getByTestId("email"), {
      target: {
        value: "invalid-email",
      },
    });

    fireEvent.submit(document.getElementById("user-management-form"));

    await waitFor(() => {
      expect(screen.getByText("Enter valid email")).toBeInTheDocument();
    });
  });

  test("renders loading state correctly", () => {
    render(
      <UserManagementForm
        open
        loading
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getAllByText("Add User")[0]).toBeInTheDocument();
  });

  test("resets form values when reopened", async () => {
    const { rerender } = render(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.change(screen.getByTestId("firstName"), {
      target: {
        value: "Temp User",
      },
    });

    rerender(
      <UserManagementForm
        open={false}
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    rerender(
      <UserManagementForm
        open
        mode="add"
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getByTestId("firstName").value).toBe("");
  });

  test("renders status dropdown in view mode", () => {
    render(
      <UserManagementForm
        open
        mode="view"
        initialData={initialData}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    expect(screen.getByTestId("status_id")).toBeInTheDocument();
  });

  test("calls submit in edit mode", async () => {
    render(
      <UserManagementForm
        open
        mode="view"
        initialData={initialData}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
        companyOptions={companyOptions}
      />,
    );

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(screen.getByText("Update User")).toBeInTheDocument();
    });

    fireEvent.submit(document.getElementById("user-management-form"));

    await waitFor(() => {
      expect(mockOnSubmitForm).toHaveBeenCalled();
    });
  });
});
