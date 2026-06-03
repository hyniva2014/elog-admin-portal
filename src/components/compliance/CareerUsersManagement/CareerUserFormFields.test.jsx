import React from "react";
import { render, screen } from "@testing-library/react";
import CareerUserFormFields from "./CareerUserFormFields";

jest.mock("./FormSections/BasicInformationSection", () => () => (
  <div data-testid="basic-information-section">
    Basic Information Section
  </div>
));

jest.mock("./FormSections/ContactInformationSection", () => () => (
  <div data-testid="contact-information-section">
    Contact Information Section
  </div>
));

jest.mock("./FormSections/EmploymentDetailsSection", () => () => (
  <div data-testid="employment-details-section">
    Employment Details Section
  </div>
));

jest.mock("./FormSections/EmploymentHistorySection", () => () => (
  <div data-testid="employment-history-section">
    Employment History Section
  </div>
));

jest.mock("./FormSections/DocumentationSection", () => () => (
  <div data-testid="documentation-section">
    Documentation Section
  </div>
));

const defaultProps = {
  control: {},
  errors: {},
  watch: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
  clearErrors: jest.fn(),
  editMode: true,
  existingProfileFiles: [],
  setExistingProfileFiles: jest.fn(),
  handleImagePreview: jest.fn(),
  handleRemoveExistingFile: jest.fn(),
  dynamicStates: [],
  loadingStates: false,
  secondaryDynamicStates: [],
  loadingSecondaryStates: false,
  existingMedicalFiles: [],
  setExistingMedicalFiles: jest.fn(),
  medicalUploaded: false,
  setMedicalUploaded: jest.fn(),
  imageUploaded: false,
  setImageUploaded: jest.fn(),
  filteredRoles: [],
  handleAddressChange: jest.fn(),
  handleSecondaryAddressChange: jest.fn(),
  handleAddEmployment: jest.fn(),
  handleRemoveEmployment: jest.fn(),
  isInitializing: false,
  mode: "add",
  sameAsPrimary: false,
  selectedCountry: "",
  selectedCitizenship: 1,
  selectedEmploymentType: 1,
  selectedStatus: 1,
  selectedSecondaryCountry: "",
  handleSameAddressToggle: jest.fn(),
};

describe("CareerUserFormFields", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders successfully", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("basic-information-section"),
    ).toBeInTheDocument();
  });

  test("renders BasicInformationSection", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("basic-information-section"),
    ).toBeInTheDocument();
  });

  test("renders ContactInformationSection", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("contact-information-section"),
    ).toBeInTheDocument();
  });

  test("renders EmploymentDetailsSection", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("employment-details-section"),
    ).toBeInTheDocument();
  });

  test("renders EmploymentHistorySection", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("employment-history-section"),
    ).toBeInTheDocument();
  });

  test("renders DocumentationSection", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getByTestId("documentation-section"),
    ).toBeInTheDocument();
  });

  test("renders all five form sections", () => {
    render(<CareerUserFormFields {...defaultProps} />);

    expect(
      screen.getAllByTestId(/section/i),
    ).toHaveLength(5);
  });

  test("renders correctly in edit mode", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        editMode={true}
        mode="edit"
      />,
    );

    expect(
      screen.getByTestId("basic-information-section"),
    ).toBeInTheDocument();
  });

  test("renders correctly in add mode", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        editMode={true}
        mode="add"
      />,
    );

    expect(
      screen.getByTestId("basic-information-section"),
    ).toBeInTheDocument();
  });

  test("renders when loading states are true", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        loadingStates={true}
        loadingSecondaryStates={true}
      />,
    );

    expect(
      screen.getByTestId("contact-information-section"),
    ).toBeInTheDocument();
  });

  test("renders with selected citizenship as non-US", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        selectedCitizenship={2}
      />,
    );

    expect(
      screen.getByTestId("employment-details-section"),
    ).toBeInTheDocument();
  });

  test("renders with employment type contractor", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        selectedEmploymentType={2}
      />,
    );

    expect(
      screen.getByTestId("employment-details-section"),
    ).toBeInTheDocument();
  });

  test("renders with inactive status", () => {
    render(
      <CareerUserFormFields
        {...defaultProps}
        selectedStatus={2}
      />,
    );

    expect(
      screen.getByTestId("employment-details-section"),
    ).toBeInTheDocument();
  });
});