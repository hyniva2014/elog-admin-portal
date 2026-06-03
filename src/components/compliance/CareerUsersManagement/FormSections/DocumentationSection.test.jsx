import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import DocumentationSection from "./DocumentationSection";

jest.mock("../../../../common/CommonFileUpload", () => {
  return function MockCommonFileUpload(props) {
    return (
      <div data-testid="common-file-upload">
        <span>File Upload Component</span>
        <span data-testid="disabled-state">
          {props.disabled ? "disabled" : "enabled"}
        </span>
        <span data-testid="existing-files-count">
          {props.existingFiles?.length || 0}
        </span>
      </div>
    );
  };
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
      medical_document_files: [],
    },
  });

  return (
    <DocumentationSection
      control={methods.control}
      errors={{}}
      editMode={true}
      existingMedicalFiles={[]}
      setMedicalUploaded={jest.fn()}
      handleImagePreview={jest.fn()}
      handleRemoveExistingFile={jest.fn()}
      {...props}
    />
  );
};

describe("DocumentationSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders documentation section title", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText("Upload proof of Documentation")
    ).toBeInTheDocument();
  });

  test("renders documentation section subtitle", () => {
    render(<TestWrapper />);

    expect(
      screen.getByText(
        "Upload supporting documents for verification and compliance"
      )
    ).toBeInTheDocument();
  });

  test("renders CommonFileUpload component", () => {
    render(<TestWrapper />);

    expect(
      screen.getByTestId("common-file-upload")
    ).toBeInTheDocument();
  });

  test("enables file upload when editMode is true", () => {
    render(<TestWrapper editMode />);

    expect(
      screen.getByTestId("disabled-state")
    ).toHaveTextContent("enabled");
  });

  test("disables file upload when editMode is false", () => {
    render(<TestWrapper editMode={false} />);

    expect(
      screen.getByTestId("disabled-state")
    ).toHaveTextContent("disabled");
  });

  test("passes existing medical files to upload component", () => {
    const existingMedicalFiles = [
      {
        id: 1,
        name: "medical.pdf",
        url: "test-url",
      },
    ];

    render(
      <TestWrapper
        existingMedicalFiles={existingMedicalFiles}
      />
    );

    expect(
      screen.getByTestId("existing-files-count")
    ).toHaveTextContent("1");
  });

  test("renders without errors object", () => {
    render(<TestWrapper errors={{}} />);

    expect(
      screen.getByTestId("common-file-upload")
    ).toBeInTheDocument();
  });

  test("renders with validation error", () => {
    render(
      <TestWrapper
        errors={{
          medical_document_files: {
            message: "File is required",
          },
        }}
      />
    );

    expect(
      screen.getByTestId("common-file-upload")
    ).toBeInTheDocument();
  });
});