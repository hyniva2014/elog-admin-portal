import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import BasicInformationSection from "./BasicInformationSection";

jest.mock("../HeaderComponents/ImagePreview", () => () => (
  <div data-testid="image-preview" />
));

jest.mock("../../../../common/CommonTextField", () => (props) => (
  <input
    data-testid={props.label}
    disabled={props.disabled}
    value={props.value || ""}
    onChange={props.onChange}
  />
));

jest.mock("../../../../common/CommonSingleDateSelector", () => (props) => (
  <input
    data-testid={props.label}
    disabled={props.disabled}
    value={props.value || ""}
    onChange={() => {}}
  />
));

jest.mock("../../../../common/CommonAutocompleteDropdown", () => (props) => (
  <div data-testid={props.label}>{props.label}</div>
));

jest.mock("../../../../common/CommonMultiSelectDropdown", () => (props) => (
  <div data-testid={props.label}>{props.label}</div>
));

const TestWrapper = (props) => {
  const methods = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: null,
      language: [],
      gender: "",
      ssn: "",
      last_drug_test: null,
      citizenship: "",
    },
  });

  return (
    <BasicInformationSection
      control={methods.control}
      errors={{}}
      editMode={true}
      existingProfileFiles={[]}
      setExistingProfileFiles={jest.fn()}
      handleRemoveExistingFile={jest.fn()}
      imageUploaded={false}
      setImageUploaded={jest.fn()}
      handleImagePreview={jest.fn()}
      {...props}
    />
  );
};

describe("BasicInformationSection", () => {
  test("renders basic information section", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();
  });

  test("renders image preview", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByTestId("image-preview")).toBeInTheDocument();
  });

  test("renders first name field", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByTestId("First Name")).toBeInTheDocument();
  });

  test("renders last name field", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByTestId("Last Name")).toBeInTheDocument();
  });

  test("renders dob field", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByTestId("Date of Birth *")).toBeInTheDocument();
  });

  test("renders citizenship dropdown", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(screen.getByTestId("Citizenship")).toBeInTheDocument();
  });

  test("renders passport fields for non-US citizenship", () => {
    render(<TestWrapper selectedCitizenship={2} />);

    expect(screen.getByTestId("Passport / Visa Number")).toBeInTheDocument();

    expect(
      screen.getByTestId("Passport / Visa Expiry Date"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("Work Permit Expiry Date")).toBeInTheDocument();
  });

  test("does not render passport fields for US citizenship", () => {
    render(<TestWrapper selectedCitizenship={1} />);

    expect(
      screen.queryByTestId("Passport / Visa Number"),
    ).not.toBeInTheDocument();
  });

  test("renders citizenship country field when citizenship is Others", () => {
    render(<TestWrapper selectedCitizenship={4} />);

    expect(screen.getByTestId("Country")).toBeInTheDocument();
  });

  test("all fields disabled when editMode is false", () => {
    render(<TestWrapper selectedCitizenship={1} editMode={false} />);

    expect(screen.getByTestId("First Name")).toBeDisabled();

    expect(screen.getByTestId("Last Name")).toBeDisabled();
  });
});
