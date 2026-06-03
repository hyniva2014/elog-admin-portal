import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AssignAssetForm from "./AssignAssetForm";

jest.useFakeTimers();

const mockFetchApi = jest.fn();

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: mockFetchApi,
  }),
}));

jest.mock("../../../common/CommonTextField", () => (props) => (
  <div>
    <input
      data-testid={props.label}
      value={props.value || ""}
      onChange={props.onChange}
      disabled={props.disabled}
    />
    {props.error && <span>{props.helperText}</span>}
  </div>
));

jest.mock("../../../common/CommonAutocompleteDropdown", () => (props) => (
  <div>
    <select
      data-testid="Model Name"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      disabled={props.disabled}
    >
      <option value="">Select</option>
      {props.options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {props.error && <span>{props.helperText}</span>}
  </div>
));

describe("AssignAssetForm", () => {
  const mockSubmit = jest.fn();
  const submitRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        data: [{ model_name: "VG34" }],
      },
    });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    expect(screen.getByTestId("Model Name")).toBeInTheDocument();
    expect(screen.getByTestId("No of devices")).toBeInTheDocument();
  });

  test("loads model dropdown options", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        data: [{ model_name: "VG34" }],
      },
    });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("VG34")).toBeInTheDocument();
    });
  });

  test("shows required validation errors", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: { data: [] },
    });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    submitRef.current();

    await waitFor(() => {
      expect(screen.getByText("Model name is required")).toBeInTheDocument();

      expect(
        screen.getByText("Number of devices is required"),
      ).toBeInTheDocument();
    });
  });

  test("checks stock availability", async () => {
    mockFetchApi
      .mockResolvedValueOnce({
        statusCode: 200,
        body: {
          data: [{ model_name: "VG34" }],
        },
      })
      .mockResolvedValueOnce({
        body: {
          available_count: 20,
          message: "",
          device_id: [1, 2],
        },
      });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    fireEvent.change(screen.getByTestId("No of devices"), {
      target: { value: "5" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Available: 20")).toBeInTheDocument();
    });
  });

  test("shows stock message when API returns message", async () => {
    mockFetchApi
      .mockResolvedValueOnce({
        statusCode: 200,
        body: {
          data: [{ model_name: "VG34" }],
        },
      })
      .mockResolvedValueOnce({
        body: {
          available_count: 0,
          message: "Less Stock Available",
          device_id: [],
        },
      });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    fireEvent.change(screen.getByTestId("No of devices"), {
      target: { value: "100" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText("Less Stock Available")).toBeInTheDocument();
    });
  });

  test("submits valid form with deviceIds", async () => {
    mockFetchApi
      .mockResolvedValueOnce({
        statusCode: 200,
        body: {
          data: [{ model_name: "VG34" }],
        },
      })
      .mockResolvedValueOnce({
        body: {
          available_count: 10,
          message: "",
          device_id: [11, 22],
        },
      });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    fireEvent.change(screen.getByTestId("Model Name"), {
      target: { value: "VG34" },
    });

    fireEvent.change(screen.getByTestId("No of devices"), {
      target: { value: "5" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(mockFetchApi).toHaveBeenCalled();
    });

    submitRef.current();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        modelName: "VG34",
        numberOfDevices: 5,
        deviceIds: [11, 22],
      });
    });
  });

  test("disables fields when isDisabled=true", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        data: [{ model_name: "VG34" }],
      },
    });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
        isDisabled={true}
      />,
    );

    expect(screen.getByTestId("Model Name")).toBeDisabled();
    expect(screen.getByTestId("No of devices")).toBeDisabled();
  });

  test("assigns submit handler to submitRef", async () => {
    mockFetchApi.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        data: [],
      },
    });

    render(
      <AssignAssetForm
        formData={{}}
        onSubmit={mockSubmit}
        setSubmitRef={submitRef}
      />,
    );

    expect(typeof submitRef.current).toBe("function");
  });
});
