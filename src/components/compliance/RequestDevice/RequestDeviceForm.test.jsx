import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RequestDeviceForm from "./RequestDeviceForm";

// Mock CommonTextField component
const MockCommonTextField = (props) => {
  const { label, value, onChange, type, error, helperText } = props;
  
  return (
    <div>
      <label>{label}</label>
      <input
        data-testid={label}
        value={value || ""}
        onChange={onChange}
        type={type || "text"}
      />
      {error && <span>{helperText}</span>}
    </div>
  );
};

jest.mock("../../../common/CommonTextField", () => MockCommonTextField);

describe("RequestDeviceForm", () => {
  const mockSubmit = jest.fn();
  const mockRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", () => {
    render(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    expect(screen.getByTestId("Add Number of devices")).toBeInTheDocument();

    expect(screen.getByTestId("Description")).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    mockRef.current();

    await waitFor(() => {
      expect(
        screen.getByText("Number of devices is required"),
      ).toBeInTheDocument();

      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  test("shows validation error when numberOfDevices is less than 1", async () => {
    render(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    fireEvent.change(screen.getByTestId("Add Number of devices"), {
      target: { value: 0 },
    });

    fireEvent.change(screen.getByTestId("Description"), {
      target: { value: "Testing" },
    });

    mockRef.current();

    await waitFor(() => {
      expect(
        screen.getByText("At least 1 device must be requested"),
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    fireEvent.change(screen.getByTestId("Add Number of devices"), {
      target: { value: 10 },
    });

    fireEvent.change(screen.getByTestId("Description"), {
      target: { value: "Need devices for testing" },
    });

    mockRef.current();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        numberOfDevices: 10,
        description: "Need devices for testing",
      });
    });
  });

  test("loads formData values correctly", async () => {
    render(
      <RequestDeviceForm
        formData={{
          numberOfDevices: 5,
          description: "Existing Request",
        }}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    expect(screen.getByTestId("Add Number of devices")).toHaveValue(5);

    expect(screen.getByTestId("Description")).toHaveValue("Existing Request");
  });

  test("reset form when formData is empty", async () => {
    const { rerender } = render(
      <RequestDeviceForm
        formData={{
          numberOfDevices: 5,
          description: "Existing Request",
        }}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    rerender(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    expect(screen.getByTestId("Add Number of devices")).toHaveValue(null);

    expect(screen.getByTestId("Description")).toHaveValue("");
  });

  test("assigns submit handler to submitRef", () => {
    render(
      <RequestDeviceForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={mockRef}
      />,
    );

    expect(typeof mockRef.current).toBe("function");
  });
});
