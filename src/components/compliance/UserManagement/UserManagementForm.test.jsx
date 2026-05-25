// UserManagementForm.test.jsx

import React from "react";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import UserManagementForm from "./UserManagementForm";

const mockOnClose = jest.fn();
const mockOnSubmitForm = jest.fn();

// Mock CommonDialogForm
jest.mock("../../../common/CommonDialogForm", () => (props) => (
  <div>
    <h1>{props.title}</h1>

    {props.headerActions}

    {props.content}

    {props.submitButtonText && (
      <button
        type="submit"
        form={props.formId}
      >
        {props.submitButtonText}
      </button>
    )}

    <button onClick={props.onCancel}>
      Cancel
    </button>

    <button onClick={props.onClose}>
      Close
    </button>
  </div>
));

// Mock CommonTextField
jest.mock("../../../common/CommonTextField", () => (props) => (
  <div>
    <input
      data-testid={props.name}
      placeholder={props.label}
      disabled={props.disabled}
      {...props.register(props.name)}
    />

    {props.helperText && (
      <span>{props.helperText}</span>
    )}
  </div>
));

// Mock CommonAutocompleteDropdown
jest.mock(
  "../../../common/CommonAutocompleteDropdown",
  () => (props) => (
    <div>
      <select
        data-testid={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) =>
          props.onChange(e.target.value)
        }
      >
        <option value="">Select</option>

        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {props.helperText && (
        <span>{props.helperText}</span>
      )}
    </div>
  )
);

// Mock feature constants
jest.mock("./Constants", () => ({
  ACCOUNT_OPTIONS: [
    {
      label: "Account 1",
      value: "1",
    },
  ],

  USER_PROFILE_OPTIONS: [
    {
      label: "Admin",
      value: "1",
    },
  ],
}));

// Mock styled component
jest.mock("./UserManagementForm.styled", () => ({
  FormContainer: ({
    children,
    ...props
  }) => <form {...props}>{children}</form>,
}));

describe("UserManagementForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders add user form correctly", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByRole("button", {
        name: "Add User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("password")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "confirmPassword"
      )
    ).toBeInTheDocument();
  });

  test("renders view mode correctly", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByText("View User")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("password")
    ).not.toBeInTheDocument();
  });

  test("shows edit button in view mode", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByRole("button", {
        name: "Edit",
      })
    ).toBeInTheDocument();
  });

  test("switches to edit mode when clicking edit", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit",
      })
    );

    expect(
      screen.getByText("Edit User")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Update User",
      })
    ).toBeInTheDocument();
  });

  test("populates initial data correctly", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          initialData={{
            company_id: "1",
            role_id: "1",
            status_id: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
          }}
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByTestId("firstName")
    ).toHaveValue("John");

    expect(
      screen.getByTestId("lastName")
    ).toHaveValue("Doe");

    expect(
      screen.getByTestId("email")
    ).toHaveValue("john@test.com");
  });

  test("submits add user form successfully", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.change(
      screen.getByTestId("company_id"),
      {
        target: { value: "1" },
      }
    );

    fireEvent.change(
      screen.getByTestId("role_id"),
      {
        target: { value: "1" },
      }
    );

    fireEvent.change(
      screen.getByTestId("firstName"),
      {
        target: { value: "John" },
      }
    );

    fireEvent.change(
      screen.getByTestId("lastName"),
      {
        target: { value: "Doe" },
      }
    );

    fireEvent.change(
      screen.getByTestId("email"),
      {
        target: {
          value: "john@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByTestId("password"),
      {
        target: {
          value: "Password123",
        },
      }
    );

    fireEvent.change(
      screen.getByTestId(
        "confirmPassword"
      ),
      {
        target: {
          value: "Password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    await waitFor(() => {
      expect(
        mockOnSubmitForm
      ).toHaveBeenCalled();
    });
  });

  test("shows validation errors", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Account is required"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "First Name is required"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Email is required"
        )
      ).toBeInTheDocument();
    });
  });

  test("shows password mismatch validation", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.change(
      screen.getByTestId("password"),
      {
        target: {
          value: "Password123",
        },
      }
    );

    fireEvent.change(
      screen.getByTestId(
        "confirmPassword"
      ),
      {
        target: {
          value: "WrongPassword",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add User",
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Passwords must match"
        )
      ).toBeInTheDocument();
    });
  });

  test("calls onClose when close button clicked", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close",
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when cancel clicked in add mode", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="add"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders status dropdown in view mode", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByTestId("status_id")
    ).toBeInTheDocument();
  });

  test("fields are disabled in readonly mode", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    expect(
      screen.getByTestId("firstName")
    ).toBeDisabled();

    expect(
      screen.getByTestId("email")
    ).toBeDisabled();
  });

  test("fields are enabled after edit button click", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit",
      })
    );

    expect(
      screen.getByTestId("firstName")
    ).not.toBeDisabled();
  });

  test("cancel edit restores readonly mode", async () => {
    await act(async () => {
      render(
        <UserManagementForm
          open={true}
          mode="view"
          initialData={{
            firstName: "John",
          }}
          onClose={mockOnClose}
          onSubmitForm={mockOnSubmitForm}
        />
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );

    expect(
      screen.getByText("View User")
    ).toBeInTheDocument();
  });
});