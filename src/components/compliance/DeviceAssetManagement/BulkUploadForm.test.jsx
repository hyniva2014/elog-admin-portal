import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import BulkUploadForm from "./BulkUploadForm";

describe("BulkUploadForm", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <BulkUploadForm
        formId="bulk-form"
        onSubmit={mockSubmit}
      />
    );

  test("renders upload box initially", () => {
    renderComponent();

    expect(
      screen.getByText(/click to upload/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/csv, xls, xlsx/i)
    ).toBeInTheDocument();
  });

  test("uploads CSV file successfully", async () => {
    renderComponent();

    const file = new File(
      ["name,id\nabc,1"],
      "sample.csv",
      {
        type: "text/csv",
      }
    );

    const input =
      document.querySelector("#bulk-upload-input");

    await userEvent.upload(input, file);

    expect(
      screen.getByText("sample.csv")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/kb/i)
    ).toBeInTheDocument();
  });

  test("uploads XLSX file successfully", async () => {
    renderComponent();

    const file = new File(
      ["dummy"],
      "report.xlsx",
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const input =
      document.querySelector("#bulk-upload-input");

    await userEvent.upload(input, file);

    expect(
      screen.getByText("report.xlsx")
    ).toBeInTheDocument();
  });

  test("shows validation for unsupported file", async () => {
    renderComponent();

    const file = new File(
      ["dummy"],
      "image.png",
      {
        type: "image/png",
      }
    );

    const input =
      document.querySelector("#bulk-upload-input");

    await userEvent.upload(input, file);

    fireEvent.submit(
      document.getElementById("bulk-form")
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /please upload a file|only csv or excel files are allowed/i,
        ),
      ).toBeInTheDocument();
    });
  });

  test("shows required validation if no file selected", async () => {
    renderComponent();

    fireEvent.submit(
      document.getElementById("bulk-form")
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /please upload a file/i
        )
      ).toBeInTheDocument();
    });
  });

  test("removes uploaded file", async () => {
    renderComponent();

    const file = new File(
      ["test"],
      "sample.csv",
      {
        type: "text/csv",
      }
    );

    const input =
      document.querySelector("#bulk-upload-input");

    await userEvent.upload(input, file);

    expect(
      screen.getByText("sample.csv")
    ).toBeInTheDocument();

    // close icon button
    const removeBtn =
      screen.getByRole("button");

    await userEvent.click(removeBtn);

    await waitFor(() => {
      expect(
        screen.queryByText("sample.csv")
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(/click to upload/i)
    ).toBeInTheDocument();
  });

  test("calls onSubmit with uploaded file", async () => {
    renderComponent();

    const file = new File(
      ["test"],
      "sample.csv",
      {
        type: "text/csv",
      }
    );

    const input =
      document.querySelector("#bulk-upload-input");

    await userEvent.upload(input, file);

    fireEvent.submit(
      document.getElementById("bulk-form")
    );

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        files: file,
      });
    });
  });
});