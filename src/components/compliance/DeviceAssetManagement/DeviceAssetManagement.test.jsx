import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceAssetManagement from "./DeviceAssetManagement";

jest.mock("@src/components", () => ({
  ComponentContainerCard: ({ children }) => <div>{children}</div>,
}));

jest.mock("@src/common/CommonDataGrid", () => {
  return ({ rowData, columnsData }) => (
    <div>
      <div>Mock Data Grid</div>

      {rowData.map((row) => (
        <div key={row.id}>
          <span>{row.imei}</span>
          <span>{row.deviceModel}</span>
          <button
            onClick={() =>
              columnsData[5]
                .renderCell({
                  row,
                })
                .props.children.props.onClick()
            }
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
});

jest.mock("../../../common/PageContainer", () => ({
  PageContainer: ({ children }) => <div>{children}</div>,
}));

jest.mock("../../../common/CommonLoading", () => {
  return () => ({
    setLoading: jest.fn(),
    LoadingContainer: () => <div>Loading...</div>,
  });
});

jest.mock("../../../common/CommonDialogForm", () => {
  return ({ open, title, submitButtonText, headerActions }) =>
    open ? (
      <div>
        <h1>{title}</h1>
        <button>{submitButtonText}</button>
        {headerActions}
      </div>
    ) : null;
});

jest.mock("./DeviceAssetManagementHeader", () => {
  return ({ handleClick }) => <button onClick={handleClick}>Add Asset</button>;
});

jest.mock("./DeviceAssetManagementForm", () => {
  return () => <div>Mock Form</div>;
});

describe("DeviceAssetManagement Component", () => {
  test("renders component correctly", () => {
    render(<DeviceAssetManagement />);

    expect(screen.getByText("Mock Data Grid")).toBeInTheDocument();
    expect(screen.getByText("Add Asset")).toBeInTheDocument();
  });

  test("opens add asset modal when Add Asset button clicked", () => {
    render(<DeviceAssetManagement />);

    const addButtons = screen.getAllByText("Add Asset");

    fireEvent.click(addButtons[0]);

    expect(
      screen.getByRole("heading", { name: "Add Asset" }),
    ).toBeInTheDocument();
  });

  test("opens view asset modal when view button clicked", () => {
    render(<DeviceAssetManagement />);

    const viewButtons = screen.getAllByText("View");

    fireEvent.click(viewButtons[0]);

    expect(screen.getByText("View Asset")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("shows edit button in view mode", () => {
    render(<DeviceAssetManagement />);

    const viewButtons = screen.getAllByText("View");

    fireEvent.click(viewButtons[0]);

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("clicking edit changes button to update", () => {
    render(<DeviceAssetManagement />);

    const viewButtons = screen.getAllByText("View");

    fireEvent.click(viewButtons[0]);

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
  });
});
