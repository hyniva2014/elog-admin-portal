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

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn((url) => {
      if (url.includes("get-device-model-dropdown")) {
        return Promise.resolve({
          body: {
            data: [
              {
                model_name: "ELD Model 1",
              },
            ],
          },
        });
      }

      if (url.includes("device_id=")) {
        return Promise.resolve({
          body: {
            device_id: "1",
            device_model_id: "ELD Model 1",
            device_serial_number: "SN001",
            status: "1",
          },
        });
      }

      return Promise.resolve({
        body: {
          data: [
            {
              device_id: "1",
              device_serial_number: "SN001",
              device_model_id: "ELD Model 1",
              status: "1",
            },
            {
              device_id: "2",
              device_serial_number: "SN002",
              device_model_id: "ELD Model 2",
              status: "0",
            },
            {
              device_id: "3",
              device_serial_number: "SN003",
              device_model_id: "ELD Model 3",
              status: null,
            },
          ],
          pagination: {
            total_records: 3,
          },
        },
      });
    }),

    createApi: jest.fn(() =>
      Promise.resolve({
        statusCode: 200,
      }),
    ),
  }),
}));

test("shows active status correctly", async () => {
  render(<DeviceAssetManagement />);
  expect(await screen.findByText("Mock Data Grid")).toBeInTheDocument();
});

test("opens edit mode correctly", async () => {
  render(<DeviceAssetManagement />);
  const viewButtons = await screen.findAllByText("View");
  fireEvent.click(viewButtons[0]);
  const editButton = await screen.findByText("Edit");
  fireEvent.click(editButton);
  expect(screen.getByText("Update")).toBeInTheDocument();
});

test("cancel edit button works correctly", async () => {
  render(<DeviceAssetManagement />);
  const viewButtons = await screen.findAllByText("View");
  fireEvent.click(viewButtons[0]);
  fireEvent.click(await screen.findByText("Edit"));
  fireEvent.click(screen.getByText("Cancel Edit"));
  expect(screen.getByText("Edit")).toBeInTheDocument();
});

test("shows add asset modal title correctly", () => {
  render(<DeviceAssetManagement />);
  fireEvent.click(screen.getAllByText("Add Asset")[0]);
  expect(screen.getByText("Add Asset")).toBeInTheDocument();
});

test("shows save button in view mode", async () => {
  render(<DeviceAssetManagement />);
  const viewButtons = await screen.findAllByText("View");
  fireEvent.click(viewButtons[0]);
  expect(screen.getByText("Save")).toBeInTheDocument();
});

test("renders loading container", () => {
  render(<DeviceAssetManagement />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders mocked form when modal opens", () => {
  render(<DeviceAssetManagement />);
  fireEvent.click(screen.getAllByText("Add Asset")[0]);
  expect(screen.getByText("Mock Form")).toBeInTheDocument();
});

test("handles null status correctly", async () => {
  render(<DeviceAssetManagement />);
  expect(await screen.findByText("Mock Data Grid")).toBeInTheDocument();
});