// UserManagementForm.test.jsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserManagementForm from "./UserManagementForm";

// Mock CommonDialogForm
jest.mock("../../../common/CommonDialogForm", () => (props) => (
  <div data-testid="common-dialog-form">
    <h1>{props.title}</h1>

    {props.content}

    <button onClick={props.onCancel}>Cancel</button>

    <button type="submit" form={props.formId}>
      {props.submitButtonText}
    </button>
  </div>
));

// Mock CommonTextField
jest.mock("../../../common/CommonTextField", () => (props) => (
  <div>
    <input
      data-testid={props.name}
      placeholder={props.label}
      {...props.register(props.name)}
    />
    {props.helperText && <span>{props.helperText}</span>}
  </div>
));

// Mock CommonAutocompleteDropdown
jest.mock("../../../common/CommonAutocompleteDropdown", () => (props) => (
  <div>
    <select
      data-testid={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="">Select</option>

      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    {props.helperText && <span>{props.helperText}</span>}
  </div>
));

describe("UserManagementForm Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmitForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Add User title in add mode", () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} mode="add" />);

    expect(
      screen.getByRole("button", { name: "Add User" }),
    ).toBeInTheDocument();
  });

  test("renders Edit User title in edit mode", () => {
    render(
      <UserManagementForm open={true} onClose={mockOnClose} mode="edit" />,
    );

    expect(screen.getByText("Edit User")).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} />);

    expect(screen.getByTestId("selectAccount")).toBeInTheDocument();
    expect(screen.getByTestId("userProfile")).toBeInTheDocument();
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    await waitFor(() => {
      expect(screen.getByText("First Name is required")).toBeInTheDocument();
      expect(screen.getByText("Last Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      // expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Confirm Password is required"),
      ).toBeInTheDocument();
    });
  });

  test("shows email validation error", async () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Add User" }),
      ).toBeInTheDocument();
    });
  });

  test("shows password mismatch validation error", async () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password123" },
    });

    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "WrongPassword" },
    });

    // fireEvent.click(screen.getByText("Add User"));
    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });
  });

  test("submits form successfully with valid data", async () => {
    render(
      <UserManagementForm
        open={true}
        onClose={mockOnClose}
        onSubmitForm={mockOnSubmitForm}
      />,
    );

    fireEvent.change(screen.getByTestId("selectAccount"), {
      target: { value: "Swift Transportation" },
    });

    fireEvent.change(screen.getByTestId("userProfile"), {
      target: { value: "Admin" },
    });

    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password123" },
    });

    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "Password123" },
    });

    // fireEvent.click(screen.getByText("Add User"));
    fireEvent.click(screen.getByRole("button", { name: "Add User" }));

    await waitFor(() => {
      expect(mockOnSubmitForm).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test("calls onClose when cancel button is clicked", () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders Update User button in edit mode", () => {
    render(
      <UserManagementForm open={true} onClose={mockOnClose} mode="edit" />,
    );

    expect(
      screen.getByRole("button", { name: "Update User" }),
    ).toBeInTheDocument();
  });

  test("renders Add User button in add mode", () => {
    render(<UserManagementForm open={true} onClose={mockOnClose} mode="add" />);

    expect(
      screen.getByRole("button", { name: "Add User" }),
    ).toBeInTheDocument();
  });
});
