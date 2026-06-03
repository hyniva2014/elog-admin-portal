import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import EmploymentHistorySection from "./EmploymentHistorySection";

jest.mock("../../../../common/CommonTextField", () => {
  const React = require("react");

  return React.forwardRef((props, ref) => (
    <input
      ref={ref}
      data-testid={props.label}
      disabled={props.disabled}
      value={props.value || ""}
      onChange={props.onChange}
    />
  ));
});

jest.mock("../../../../common/CommonSingleDateSelector", () => {
  return function MockDateSelector(props) {
    return (
      <div data-testid={props.label}>
        {props.label}
        {props.disabled && <span>disabled</span>}
      </div>
    );
  };
});

jest.mock("../HeaderComponents/FormSection", () => {
  return function MockFormSection({
    title,
    subtitle,
    children,
  }) {
    return (
      <div data-testid="form-section">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>
    );
  };
});

const defaultProps = {
  errors: {},
  editMode: true,
  handleAddEmployment: jest.fn(),
  handleRemoveEmployment: jest.fn(),
  setValue: jest.fn(),
};

const TestWrapper = ({
  formValues,
  ...props
}) => {
  const methods = useForm({
    defaultValues: {
      total_years_of_experince: "",
      emp_history: [
        {
          emp_history_details: "",
          emp_history_start_date: null,
          emp_history_end_date: null,
          emp_history_duration: "",
        },
      ],
      ...formValues,
    },
  });

  return (
    <EmploymentHistorySection
      control={methods.control}
      watch={methods.watch}
      {...defaultProps}
      {...props}
    />
  );
};

const MultipleEmploymentWrapper = () => {
  const methods = useForm({
    defaultValues: {
      total_years_of_experince: "",
      emp_history: [
        {
          emp_history_details: "",
          emp_history_start_date: null,
          emp_history_end_date: null,
          emp_history_duration: "",
        },
        {
          emp_history_details: "",
          emp_history_start_date: null,
          emp_history_end_date: null,
          emp_history_duration: "",
        },
      ],
    },
  });

  return (
    <EmploymentHistorySection
      control={methods.control}
      watch={methods.watch}
      errors={{}}
      editMode
      handleAddEmployment={jest.fn()}
      handleRemoveEmployment={jest.fn()}
      setValue={jest.fn()}
    />
  );
};

describe("EmploymentHistorySection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders section title", () => {
    render(<TestWrapper />);

    expect(
      screen.getAllByText("Prior Employment History")
    ).toHaveLength(2);
  });

  test("renders section subtitle", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText(
        "Previous employment details and durartion history"
      )
    ).toBeInTheDocument();
  });

  test("renders add employment button", () => {
    render(<TestWrapper />);

    expect(
      screen.getByRole("button", {
        name: /add employment/i,
      })
    ).toBeInTheDocument();
  });

  test("renders total experience field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Total Experience")
    ).toBeInTheDocument();
  });

  test("renders employer details field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Employer Details")
    ).toBeInTheDocument();
  });

  test("renders start date field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Start Date")
    ).toBeInTheDocument();
  });

  test("renders end date field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("End Date")
    ).toBeInTheDocument();
  });

  test("renders duration field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Duration")
    ).toBeInTheDocument();
  });

  test("calls handleAddEmployment when button clicked", async () => {
    const handleAddEmployment = jest.fn();

    render(
      <TestWrapper
        handleAddEmployment={handleAddEmployment}
      />
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /add employment/i,
      })
    );

    expect(handleAddEmployment).toHaveBeenCalledTimes(1);
  });

  test("disables add employment button when edit mode is false", () => {
    render(
      <TestWrapper editMode={false} />
    );

    expect(
      screen.getByRole("button", {
        name: /add employment/i,
      })
    ).toBeDisabled();
  });

  test("renders remove button for second employment record", () => {
    render(<MultipleEmploymentWrapper />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(1);
  });

  test("shows total experience field when validation error exists", () => {
    render(
      <TestWrapper
        errors={{
          total_years_of_experince: {
            message: "Required",
          },
        }}
      />
    );

    expect(
      screen.getByTestId("Total Experience")
    ).toBeInTheDocument();
  });

  test("disables total experience field when edit mode false", () => {
    render(
      <TestWrapper editMode={false} />
    );

    expect(
      screen.getByTestId("Total Experience")
    ).toBeDisabled();
  });

  test("disables add employment button when 3 records already exist", () => {
    render(
      <TestWrapper
        formValues={{
          emp_history: [{}, {}, {}],
        }}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /add employment/i,
      })
    ).toBeDisabled();
  });

  test("renders employment sections correctly", () => {
    render(<MultipleEmploymentWrapper />);

    expect(
      screen.getByText("Employment 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Employment 2")
    ).toBeInTheDocument();
  });
});