import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import EmploymentDetailsSection from "./EmploymentDetailsSection";

jest.mock("../../../../common/CommonAutocompleteDropdown", () => {
  return function MockDropdown(props) {
    return (
      <div data-testid={props.label}>
        {props.label}
        {props.disabled && <span>disabled</span>}
      </div>
    );
  };
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

jest.mock("../HeaderComponents/FormSection", () => {
  return function MockFormSection({ title, subtitle, children }) {
    return (
      <div data-testid="form-section">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>
    );
  };
});

const TestWrapper = (props) => {
  const methods = useForm({
    defaultValues: {
      role: "",
      hire_date: null,
      status: 1,
      employment_type: 1,
      contract_information: "",
      termination_date: null,
    },
  });

  return (
    <EmploymentDetailsSection
      control={methods.control}
      errors={{}}
      editMode
      roles={roles}
      selectedEmploymentType={1}
      selectedStatus={1}
      watch={methods.watch}
      {...props}
    />
  );
};

describe("EmploymentDetailsSection", () => {
  test("renders section title", () => {
    render(<TestWrapper />);

    expect(screen.getByText("Employment Details")).toBeInTheDocument();
  });

  test("renders section subtitle", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText("Carrier, dates and employment status"),
    ).toBeInTheDocument();
  });

  test("renders role dropdown", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("Role")).toBeInTheDocument();
  });

  test("renders hire date field", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("Hire Date")).toBeInTheDocument();
  });

  test("renders status dropdown", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("Status")).toBeInTheDocument();
  });

  test("renders employment type dropdown", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("Employment Type")).toBeInTheDocument();
  });

  test("shows termination date when status is inactive", () => {
    render(<TestWrapper selectedStatus={2} />);

    expect(screen.getByTestId("Termination Date *")).toBeInTheDocument();
  });

  test("hides termination date when status is active", () => {
    render(<TestWrapper selectedStatus={1} />);

    expect(screen.queryByTestId("Termination Date *")).not.toBeInTheDocument();
  });

  test("shows contractor information field when employment type is contractor", () => {
    render(<TestWrapper selectedEmploymentType={2} />);

    expect(screen.getByTestId("Contractor Information")).toBeInTheDocument();
  });

  test("hides contractor information field when employment type is employee", () => {
    render(<TestWrapper selectedEmploymentType={1} />);

    expect(
      screen.queryByTestId("Contractor Information"),
    ).not.toBeInTheDocument();
  });

  test("disables all fields when editMode is false", () => {
    render(<TestWrapper editMode={false} />);

    expect(screen.getByTestId("Role")).toHaveTextContent("disabled");

    expect(screen.getByTestId("Hire Date")).toHaveTextContent("disabled");

    expect(screen.getByTestId("Status")).toHaveTextContent("disabled");

    expect(screen.getByTestId("Employment Type")).toHaveTextContent("disabled");
  });

  test("renders validation errors safely", () => {
    render(
      <TestWrapper
        errors={{
          role: { message: "Role is required" },
          hire_date: { message: "Hire Date is required" },
        }}
      />,
    );

    expect(screen.getByTestId("Role")).toBeInTheDocument();
  });
});
