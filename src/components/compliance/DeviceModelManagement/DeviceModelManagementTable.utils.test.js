import {
  formatDate,
  getRowHeight,
  getColumns,
} from "./DeviceModelManagementTable.utils";
import { transformDeviceModelData } from "@src/helpers/deviceModelHelpers";

describe("DeviceModelManagementTable.utils", () => {
  describe("formatDate", () => {
    test("formats valid date to MMM DD, YYYY", () => {
      expect(formatDate("2026-05-23T10:45:36.000Z")).toBe("May 23, 2026");
    });

    test("returns '-' for null/undefined", () => {
      expect(formatDate(null)).toBe("-");
      expect(formatDate(undefined)).toBe("-");
      expect(formatDate("")).toBe("-");
    });
  });

  describe("getRowHeight", () => {
    test("returns 'auto'", () => {
      expect(getRowHeight()).toBe("auto");
    });
  });

  describe("getColumns", () => {
    const columns = getColumns(jest.fn());

    test("returns 8 columns", () => {
      expect(columns).toHaveLength(8);
    });

    test("has required fields", () => {
      const fields = columns.map((col) => col.field);
      expect(fields).toContain("model");
      expect(fields).toContain("assetType");
      expect(fields).toContain("statusLabel");
      expect(fields).toContain("action");
    });
  });

  describe("transformDeviceModelData", () => {
    const mockData = [
      {
        device_model_id: 1,
        device_code: "SG1",
        model_name: "Samsara G1",
        asset_type: 1,
        description: "Test",
        supports_elogs: 1,
        status: 1,
        created_at: "2026-05-23T10:45:36.000Z",
        updated_at: "2026-05-23T10:45:36.000Z",
      },
    ];

    test("transforms API data correctly", () => {
      const result = transformDeviceModelData(mockData);
      expect(result[0].id).toBe(1);
      expect(result[0].model).toBe("Samsara G1");
      expect(result[0].assetType).toBe("Truck");
      expect(result[0].statusLabel).toBe("Active");
    });

    test("handles null description", () => {
      const data = [{ ...mockData[0], description: null }];
      expect(transformDeviceModelData(data)[0].description).toBe("-");
    });

    test("maps asset_type 2 to Trailer", () => {
      const data = [{ ...mockData[0], asset_type: 2 }];
      expect(transformDeviceModelData(data)[0].assetType).toBe("Trailer");
    });

    test("returns empty array for empty input", () => {
      expect(transformDeviceModelData([])).toEqual([]);
    });
  });
});
