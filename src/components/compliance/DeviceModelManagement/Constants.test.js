import {
  DEVICE_MODEL_STATUS_FILTER_OPTIONS,
  ASSET_TYPE_FILTER_OPTIONS,
  ELOGS_FILTER_OPTIONS,
} from "./Constants";

describe("Constants", () => {
  test("DEVICE_MODEL_STATUS_FILTER_OPTIONS has Active and Inactive", () => {
    expect(DEVICE_MODEL_STATUS_FILTER_OPTIONS).toHaveLength(2);
    expect(DEVICE_MODEL_STATUS_FILTER_OPTIONS).toContainEqual({
      value: 1,
      label: "Active",
    });
    expect(DEVICE_MODEL_STATUS_FILTER_OPTIONS).toContainEqual({
      value: 0,
      label: "Inactive",
    });
  });

  test("ASSET_TYPE_FILTER_OPTIONS has Truck and Trailer", () => {
    expect(ASSET_TYPE_FILTER_OPTIONS).toHaveLength(2);
    expect(ASSET_TYPE_FILTER_OPTIONS).toContainEqual({
      value: 1,
      label: "Truck",
    });
    expect(ASSET_TYPE_FILTER_OPTIONS).toContainEqual({
      value: 2,
      label: "Trailer",
    });
  });

  test("ELOGS_FILTER_OPTIONS has Yes and No", () => {
    expect(ELOGS_FILTER_OPTIONS).toHaveLength(2);
    expect(ELOGS_FILTER_OPTIONS).toContainEqual({ value: 1, label: "Yes" });
    expect(ELOGS_FILTER_OPTIONS).toContainEqual({ value: 0, label: "No" });
  });
});
