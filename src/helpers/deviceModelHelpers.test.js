import { generateDeviceCode } from "./deviceModelHelpers";

describe("generateDeviceCode", () => {
  test("generates code from model name with number", () => {
    expect(generateDeviceCode("Samsara G2")).toBe("SG2");
    expect(generateDeviceCode("Samsara G11")).toBe("SG11");
  });

  test("generates code from single word", () => {
    expect(generateDeviceCode("Volvo")).toBe("V");
  });

  test("handles empty/null input with fallback", () => {
    expect(generateDeviceCode("")).toMatch(/^DM\d{3}$/);
    expect(generateDeviceCode(null)).toMatch(/^DM\d{3}$/);
    expect(generateDeviceCode(undefined)).toMatch(/^DM\d{3}$/);
  });

  test("handles multiple words without numbers", () => {
    expect(generateDeviceCode("Heavy Duty Truck")).toBe("HDT");
  });
});
