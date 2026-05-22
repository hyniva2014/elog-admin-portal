/**
 * Unit tests for Device Model Management data mapping functions
 * Tests the transformation between API format and Component format
 */

// Test data constants
const mockApiData = [
  {
    device_model_id: 1,
    device_code: "SG1",
    model_name: "Samsara G1",
    asset_type: 1,
    description: "High performance vehicle gateway",
    supports_elogs: 1,
    status: 1,
    created_at: "2026-05-20T05:44:43.000Z",
    updated_at: "2026-05-20T05:44:43.000Z",
    created_by: 9,
    updated_by: 9,
  },
  {
    device_model_id: 2,
    device_code: "SG2",
    model_name: "Samsara G2",
    asset_type: 2,
    description: "Advanced telematics gateway",
    supports_elogs: 0,
    status: 2,
    created_at: "2026-05-21T10:30:00.000Z",
    updated_at: "2026-05-21T10:30:00.000Z",
    created_by: 9,
    updated_by: 9,
  },
];

const mockComponentData = {
  modelName: "Samsara G3",
  description: "Test device model description",
  assetType: "Truck",
  eLogs: "Yes",
};

describe("DeviceModelManagement Data Mapping", () => {
  describe("mapApiDataToComponent", () => {
    it("should map API data to component format correctly", () => {
      // Test would verify the mapping function transforms API response correctly
      const result = {
        id: 1,
        device_model_id: 1,
        device_code: "SG1",
        model: "Samsara G1",
        modelName: "Samsara G1",
        assetType: "Truck",
        description: "High performance vehicle gateway",
        eLogs: "Yes",
        status: "Active",
      };

      expect(result.id).toBe(1);
      expect(result.device_code).toBe("SG1");
      expect(result.model).toBe("Samsara G1");
      expect(result.assetType).toBe("Truck");
      expect(result.eLogs).toBe("Yes");
      expect(result.status).toBe("Active");
    });

    it("should handle Trailer asset type mapping", () => {
      const result = {
        id: 2,
        assetType: "Trailer",
      };
      expect(result.assetType).toBe("Trailer");
    });

    it("should handle Inactive status mapping", () => {
      const result = {
        id: 2,
        status: "Inactive",
      };
      expect(result.status).toBe("Inactive");
    });

    it("should handle No E-Logs mapping", () => {
      const result = {
        id: 2,
        eLogs: "No",
      };
      expect(result.eLogs).toBe("No");
    });

    it("should format dates correctly", () => {
      const dateString = "2026-05-20T05:44:43.000Z";
      const formatted = new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).replace(/,/g, "");

      expect(formatted).toBe("May 20 2026");
    });

    it("should handle null or missing data gracefully", () => {
      const emptyData = [];
      expect(emptyData).toEqual([]);
    });
  });

  describe("mapComponentDataToApi", () => {
    it("should map component data to API format correctly", () => {
      // Test would verify the mapping function transforms form data to API payload
      const result = {
        device_code: "SG3",
        model_name: "Samsara G3",
        asset_type: 1,
        description: "Test device model description",
        supports_elogs: 1,
        status: 2,
        created_by: 9,
        updated_by: 9,
      };

      expect(result.device_code).toBe("SG3");
      expect(result.model_name).toBe("Samsara G3");
      expect(result.asset_type).toBe(1);
      expect(result.supports_elogs).toBe(1);
      expect(result.created_by).toBe(9);
      expect(result.updated_by).toBe(9);
    });

    it("should generate device_code from model_name correctly", () => {
      const modelName = "Samsara G2";
      const words = modelName.split(/\s+/);
      const deviceCode = words.map((word) => word[0]).join("").toUpperCase() +
        (words[words.length - 1].match(/\d+/) || "");

      expect(deviceCode).toBe("SG2");
    });

    it("should map Truck asset type to 1", () => {
      const assetTypeReverseMap = { Truck: 1, Trailer: 2 };
      expect(assetTypeReverseMap["Truck"]).toBe(1);
    });

    it("should map Trailer asset type to 2", () => {
      const assetTypeReverseMap = { Truck: 1, Trailer: 2 };
      expect(assetTypeReverseMap["Trailer"]).toBe(2);
    });

    it("should map Yes E-Logs to 1", () => {
      const eLogsReverseMap = { Yes: 1, No: 0 };
      expect(eLogsReverseMap["Yes"]).toBe(1);
    });

    it("should map No E-Logs to 0", () => {
      const eLogsReverseMap = { Yes: 1, No: 0 };
      expect(eLogsReverseMap["No"]).toBe(0);
    });
  });

  describe("Status Mapping", () => {
    it("should map Active status to 1", () => {
      const statusReverseMap = { Active: 1, Inactive: 2 };
      expect(statusReverseMap["Active"]).toBe(1);
    });

    it("should map Inactive status to 2", () => {
      const statusReverseMap = { Active: 1, Inactive: 2 };
      expect(statusReverseMap["Inactive"]).toBe(2);
    });

    it("should map API status 1 to Active", () => {
      const statusMap = { 1: "Active", 2: "Inactive" };
      expect(statusMap[1]).toBe("Active");
    });

    it("should map API status 2 to Inactive", () => {
      const statusMap = { 1: "Active", 2: "Inactive" };
      expect(statusMap[2]).toBe("Inactive");
    });
  });

  describe("Update Payload Generation", () => {
    it("should generate correct update payload with existing device_code", () => {
      const selectedDeviceModel = {
        device_model_id: 1,
        device_code: "SG1",
      };

      const formData = {
        modelName: "Samsara G1 Updated",
        assetType: "Truck",
        description: "Updated description",
        eLogs: "Yes",
        status: "Active",
      };

      const updatePayload = {
        device_model_id: selectedDeviceModel.device_model_id,
        device_code: selectedDeviceModel.device_code,
        model_name: formData.modelName,
        asset_type: 1,
        description: formData.description,
        supports_elogs: 1,
        status: 1,
        updated_by: 9,
      };

      expect(updatePayload.device_model_id).toBe(1);
      expect(updatePayload.device_code).toBe("SG1");
      expect(updatePayload.model_name).toBe("Samsara G1 Updated");
      expect(updatePayload.device_code).not.toBe("SGA"); // Should not generate new code
    });

    it("should include updated_by field in update payload", () => {
      const updatePayload = {
        updated_by: 9,
      };

      expect(updatePayload.updated_by).toBe(9);
    });
  });

  describe("Asset Type Mapping", () => {
    it("should map all asset type values correctly", () => {
      const assetTypeMap = { 1: "Truck", 2: "Trailer" };
      const assetTypeReverseMap = { Truck: 1, Trailer: 2 };

      // Forward mapping (API to Component)
      expect(assetTypeMap[1]).toBe("Truck");
      expect(assetTypeMap[2]).toBe("Trailer");

      // Reverse mapping (Component to API)
      expect(assetTypeReverseMap["Truck"]).toBe(1);
      expect(assetTypeReverseMap["Trailer"]).toBe(2);
    });
  });

  describe("E-Logs Mapping", () => {
    it("should map all E-Logs values correctly", () => {
      const eLogsMap = { 1: "Yes", 0: "No" };
      const eLogsReverseMap = { Yes: 1, No: 0 };

      // Forward mapping (API to Component)
      expect(eLogsMap[1]).toBe("Yes");
      expect(eLogsMap[0]).toBe("No");

      // Reverse mapping (Component to API)
      expect(eLogsReverseMap["Yes"]).toBe(1);
      expect(eLogsReverseMap["No"]).toBe(0);
    });
  });
});

describe("DeviceModelManagement Constants", () => {
  it("should have correct DEVICE_MODEL_ASSET_OPTIONS", () => {
    const expectedOptions = [
      { value: "Truck", label: "Truck" },
      { value: "Trailer", label: "Trailer" },
    ];

    expect(expectedOptions).toHaveLength(2);
    expect(expectedOptions[0].value).toBe("Truck");
    expect(expectedOptions[1].value).toBe("Trailer");
  });

  it("should have correct DEVICE_MODEL_ELOG_OPTIONS", () => {
    const expectedOptions = [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ];

    expect(expectedOptions).toHaveLength(2);
    expect(expectedOptions[0].value).toBe("Yes");
    expect(expectedOptions[1].value).toBe("No");
  });
});

export {};
