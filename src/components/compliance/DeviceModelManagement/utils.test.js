import { formatDate } from "./utils";

describe("DeviceModelManagement utils", () => {
  describe("formatDate", () => {
    it("should return empty string for null input", () => {
      expect(formatDate(null)).toBe("");
    });

    it("should return empty string for undefined input", () => {
      expect(formatDate(undefined)).toBe("");
    });

    it("should return empty string for empty string input", () => {
      expect(formatDate("")).toBe("");
    });

    it("should return the date string for valid input", () => {
      expect(formatDate("05 05 2026")).toBe("05 05 2026");
    });

    it("should return the date string for different valid format", () => {
      expect(formatDate("12 25 2025")).toBe("12 25 2025");
    });
  });
});
