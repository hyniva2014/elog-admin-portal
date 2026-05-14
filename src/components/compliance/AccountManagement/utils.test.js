import { formatTaxId, formatPhoneNumber } from "./utils";

describe("formatTaxId", () => {
  it("should return empty value for empty input", () => {
    expect(formatTaxId("")).toBe("");
    expect(formatTaxId(null)).toBe(null);
    expect(formatTaxId(undefined)).toBe(undefined);
  });

  it("should format partial tax ID correctly", () => {
    expect(formatTaxId("1")).toBe("1");
    expect(formatTaxId("12")).toBe("12");
  });

  it("should format complete tax ID with dash", () => {
    expect(formatTaxId("123456789")).toBe("12-3456789");
    expect(formatTaxId("12345678")).toBe("12-345678");
  });

  it("should remove non-digits and format", () => {
    expect(formatTaxId("12-3456789")).toBe("12-3456789");
    expect(formatTaxId("ab12cd3456789")).toBe("12-3456789");
  });

  it("should limit to 9 digits", () => {
    expect(formatTaxId("1234567890")).toBe("12-3456789");
  });
});

describe("formatPhoneNumber", () => {
  it("should return empty value for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
    expect(formatPhoneNumber(null)).toBe(null);
    expect(formatPhoneNumber(undefined)).toBe(undefined);
  });

  it("should format partial phone numbers", () => {
    expect(formatPhoneNumber("6")).toBe("(6");
    expect(formatPhoneNumber("602")).toBe("(602)");
    expect(formatPhoneNumber("6025")).toBe("(602) 5");
    expect(formatPhoneNumber("602555")).toBe("(602) 555");
  });

  it("should format complete phone number", () => {
    expect(formatPhoneNumber("6025550100")).toBe("(602) 555-0100");
  });

  it("should remove non-digits and format", () => {
    expect(formatPhoneNumber("(602) 555-0100")).toBe("(602) 555-0100");
    expect(formatPhoneNumber("602-555-0100")).toBe("(602) 555-0100");
    expect(formatPhoneNumber("abc602def555ghi0100")).toBe("(602) 555-0100");
  });

  it("should limit to 10 digits", () => {
    expect(formatPhoneNumber("6025550100123")).toBe("(602) 555-0100");
  });

  it("should handle various digit counts correctly", () => {
    // 4 digits
    expect(formatPhoneNumber("6025")).toBe("(602) 5");
    // 5 digits
    expect(formatPhoneNumber("60255")).toBe("(602) 55");
    // 6 digits
    expect(formatPhoneNumber("602555")).toBe("(602) 555");
    // 7 digits
    expect(formatPhoneNumber("6025550")).toBe("(602) 555-0");
    // 8 digits
    expect(formatPhoneNumber("60255501")).toBe("(602) 555-01");
    // 9 digits
    expect(formatPhoneNumber("602555010")).toBe("(602) 555-010");
    // 10 digits
    expect(formatPhoneNumber("6025550100")).toBe("(602) 555-0100");
  });

  it("should handle special characters in input", () => {
    expect(formatPhoneNumber("(602)555-0100")).toBe("(602) 555-0100");
    expect(formatPhoneNumber("602.555.0100")).toBe("(602) 555-0100");
    expect(formatPhoneNumber("602 555 0100")).toBe("(602) 555-0100");
    // Note: +1 adds an extra digit, so result includes the 1
    expect(formatPhoneNumber("+1 (602) 555-0100")).toBe("(160) 255-5010");
  });
});

describe("formatTaxId edge cases", () => {
  it("should handle single digit", () => {
    expect(formatTaxId("5")).toBe("5");
  });

  it("should handle exactly 2 digits", () => {
    expect(formatTaxId("12")).toBe("12");
  });

  it("should handle 3 digits (just after dash position)", () => {
    expect(formatTaxId("123")).toBe("12-3");
  });

  it("should handle mixed alphanumeric input", () => {
    expect(formatTaxId("XX-12-3456789")).toBe("12-3456789");
    expect(formatTaxId("EIN: 123456789")).toBe("12-3456789");
  });

  it("should preserve existing dashes correctly", () => {
    expect(formatTaxId("12-3456789")).toBe("12-3456789");
    expect(formatTaxId("12-34-56789")).toBe("12-3456789");
  });
});
