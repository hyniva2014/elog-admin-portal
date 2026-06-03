import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import ContactInformationSection from "./ContactInformationSection";

jest.mock("../../../../common/CommonTextField", () => (props) => (
  <input
    data-testid={props.label}
    disabled={props.disabled}
    value={props.value || ""}
    onChange={props.onChange}
  />
));

jest.mock("../../../../common/CommonAutocompleteDropdown", () => (props) => (
  <div data-testid={props.label}>{props.label}</div>
));

jest.mock("../HeaderComponents/FormSection", () => ({ children, title }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
));

const TestWrapper = (props) => {
  const methods = useForm({
    defaultValues: {
      email: "",
      phone: "",
      alternate_contact_number: "",
      address_line1: "",
      city: "",
      country: "",
      states: "",
      zip_code: "",
      same_as_primary: false,
      secondary_address_line: "",
      secondary_city: "",
      secondary_country: "",
      secondary_states: "",
      secondary_zip_code: "",
    },
  });

  return (
    <ContactInformationSection
      control={methods.control}
      errors={{}}
      editMode={true}
      watch={methods.watch}
      setValue={methods.setValue}
      handleAddressChange={jest.fn()}
      handleSecondaryAddressChange={jest.fn()}
      sameAsPrimary={false}
      isInitializing={false}
      dynamicStates={[]}
      loadingStates={false}
      selectedCountry=""
      selectedSecondaryCountry=""
      secondaryDynamicStates={[]}
      loadingSecondaryStates={false}
      handleSameAddressToggle={jest.fn()}
      {...props}
    />
  );
};

describe("ContactInformationSection", () => {
  test("renders section title", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText("Contact Information")
    ).toBeInTheDocument();
  });

  test("renders email field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Email")
    ).toBeInTheDocument();
  });

  test("renders phone number field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Phone Number")
    ).toBeInTheDocument();
  });

  test("renders alternate phone number field", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("Alternative Phone Number")
    ).toBeInTheDocument();
  });

  test("renders primary address fields", () => {
    render(<TestWrapper />);

    expect(
      screen.getAllByTestId("Address Line")
    ).toHaveLength(2);

    expect(
      screen.getAllByTestId("City")
    ).toHaveLength(2);

    expect(
      screen.getAllByTestId("Country")
    ).toHaveLength(2);

    expect(
      screen.getAllByTestId("State")
    ).toHaveLength(2);

    expect(
      screen.getAllByTestId("Zip Code")
    ).toHaveLength(2);
  });

  test("renders primary mailing address heading", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText("Primary Mailing Address")
    ).toBeInTheDocument();
  });

  test("renders secondary mailing address heading", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText("Secondary Mailing Address")
    ).toBeInTheDocument();
  });

  test("renders same as primary checkbox", () => {
    render(<TestWrapper />);

    expect(
      screen.getByLabelText(
        "Secondary address same as primary"
      )
    ).toBeInTheDocument();
  });

  test("disables fields when editMode is false", () => {
    render(<TestWrapper editMode={false} />);

    expect(
      screen.getByTestId("Email")
    ).toBeDisabled();

    expect(
      screen.getByTestId("Phone Number")
    ).toBeDisabled();
  });

  test("renders country dropdown", () => {
    render(<TestWrapper />);

    const countries = screen.getAllByTestId("Country");

    expect(countries.length).toBe(2);
  });

  test("renders state dropdown", () => {
    render(<TestWrapper />);

    const states = screen.getAllByTestId("State");

    expect(states.length).toBe(2);
  });
});
