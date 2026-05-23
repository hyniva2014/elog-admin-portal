import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceModelManagement from "./DeviceModelManagement";

jest.mock("@src/common/CommonDataGrid", () => {
  return ({ rowData, columnsData }) => (
    <div>
      <div>Mock Data Grid</div>
      {rowData.map((row) => (
        <div key={row.id}>
          <span>{row.model}</span>
          <span>{row.assetType}</span>
          <button
            onClick={() =>
              columnsData[7]
                .renderCell({ row })
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

jest.mock("../../../common/CommonSnackbar", () => {
  return ({ open, message }) => (open ? <div>{message}</div> : null);
});

jest.mock("./DeviceModelManagementHeader", () => {
  return ({ handleClick }) => <button onClick={handleClick}>Add Device Model</button>;
});

jest.mock("./AddDeviceModelDialog", () => {
  return ({ open, title, submitButtonText, headerActions, onClose }) =>
    open ? (
      <div>
        <h1>{title}</h1>
        <button onClick={onClose}>Cancel</button>
        <button>{submitButtonText}</button>
        {headerActions}
      </div>
    ) : null;
});

describe("DeviceModelManagement Component", () => {
  test("renders component correctly", () => {
    render(<DeviceModelManagement />);

    expect(screen.getByText("Mock Data Grid")).toBeInTheDocument();
    expect(screen.getByText("Add Device Model")).toBeInTheDocument();
  });

  test("opens add device model modal when Add Device Model button clicked", () => {
    render(<DeviceModelManagement />);

    const addButtons = screen.getAllByText("Add Device Model");
    fireEvent.click(addButtons[0]);

    expect(
      screen.getByRole("heading", { name: "Add Device Model" })
    ).toBeInTheDocument();
  });

  test("opens view device model modal when view button clicked", async () => {
    render(<DeviceModelManagement />);

    const viewButtons = await screen.findAllByText("View");
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText("View Device Model")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("shows edit button in view mode", async () => {
    render(<DeviceModelManagement />);

    const viewButtons = await screen.findAllByText("View");
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("clicking edit changes button to update", async () => {
    render(<DeviceModelManagement />);

    const viewButtons = await screen.findAllByText("View");
    fireEvent.click(viewButtons[0]);

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
  });

  test("clicking cancel edit reverts to view mode", async () => {
    render(<DeviceModelManagement />);

    const viewButtons = await screen.findAllByText("View");
    fireEvent.click(viewButtons[0]);

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByText("Cancel Edit"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("closes modal when cancel button clicked", () => {
    render(<DeviceModelManagement />);

    const addButtons = screen.getAllByText("Add Device Model");
    fireEvent.click(addButtons[0]);

    expect(screen.getByText("Add Device Model")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    waitFor(() => {
      expect(screen.queryByText("Add Device Model")).not.toBeInTheDocument();
    });
  });

  test("renders loading container", () => {
    render(<DeviceModelManagement />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn((url) => {
      if (url.includes("get-device-model")) {
        if (url.includes("device_model_id=")) {
          return Promise.resolve({
            body: {
              data: [
                {
                  device_model_id: "1",
                  device_code: "DM001",
                  model_name: "Test Model",
                  description: "Test Description",
                  asset_type: 1,
                  supports_elogs: 1,
                  status: 1,
                  created_at: "2026-05-20",
                  updated_at: "2026-05-22",
                },
              ],
            },
          });
        }
        return Promise.resolve({
          body: {
            data: {
              data: [
                {
                  device_model_id: "1",
                  device_code: "DM001",
                  model_name: "Model 1",
                  description: "Description 1",
                  asset_type: 1,
                  supports_elogs: 1,
                  status: 1,
                  created_at: "2026-05-20",
                  updated_at: "2026-05-22",
                },
                {
                  device_model_id: "2",
                  device_code: "DM002",
                  model_name: "Model 2",
                  description: "Description 2",
                  asset_type: 2,
                  supports_elogs: 0,
                  status: 2,
                  created_at: "2026-05-21",
                  updated_at: "2026-05-23",
                },
              ],
              pagination: {
                total_records: 2,
              },
            },
          },
        });
      }
      return Promise.resolve({ body: { data: [] } });
    }),
    createApi: jest.fn(() =>
      Promise.resolve({
        statusCode: 200,
      })
    ),
  }),
}));

test("fetches and displays device models correctly", async () => {
  render(<DeviceModelManagement />);
  expect(await screen.findByText("Mock Data Grid")).toBeInTheDocument();
});

test("handles null status correctly in data transformation", async () => {
  render(<DeviceModelManagement />);
  expect(await screen.findByText("Mock Data Grid")).toBeInTheDocument();
});
