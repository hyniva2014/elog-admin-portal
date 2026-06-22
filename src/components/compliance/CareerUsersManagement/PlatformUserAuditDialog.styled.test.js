import {
  auditCreatedDateSx,
  auditCreatedTimeSx,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./PlatformUserAuditDialog.styled";

describe("PlatformUserAuditDialog styles", () => {
  const mockTheme = {
    palette: {
      text: {
        primary: "#000000",
        secondary: "#666666",
      },
    },
  };

  describe("auditCreatedDateSx", () => {
    it("should return correct styles", () => {
      expect(auditCreatedDateSx(mockTheme)).toEqual({
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1,
        color: "#000000",
      });
    });
  });

  describe("auditCreatedTimeSx", () => {
    it("should return correct styles", () => {
      expect(auditCreatedTimeSx(mockTheme)).toEqual({
        fontSize: "0.75rem",
        color: "#666666",
        lineHeight: 1.4,
      });
    });
  });

  describe("tableContainerSx", () => {
    it("should have correct styles", () => {
      expect(tableContainerSx).toEqual({
        width: "100%",
        mt: 1,
      });
    });
  });

  describe("backButtonWrapperSx", () => {
    it("should have correct styles", () => {
      expect(backButtonWrapperSx).toEqual({
        pt: 2,
        mt: 1,
        display: "flex",
        justifyContent: "center",
      });
    });
  });

  describe("backButtonSx", () => {
    it("should have correct button styles", () => {
      expect(backButtonSx).toMatchObject({
        minWidth: 200,
        backgroundColor: "#1a3a6b",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 1,
      });
    });

    it("should have correct hover styles", () => {
      expect(backButtonSx["&:hover"]).toEqual({
        backgroundColor: "#14306a",
      });
    });
  });
});