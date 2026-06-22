import React from "react";
import { render, screen } from "@testing-library/react";
import {
  getAuditColumns,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./DeviceModelAuditDialog.styled";

describe("DeviceModelAuditDialog.styled", () => {
  const mockTheme = {
    palette: {
      text: {
        primary: "#000000",
        secondary: "#666666",
      },
    },
  };

  describe("getAuditColumns", () => {
    it("should return 3 columns", () => {
      const columns = getAuditColumns(mockTheme);

      expect(columns).toHaveLength(3);
    });

    it("should return correct column fields", () => {
      const columns = getAuditColumns(mockTheme);

      expect(columns[0].field).toBe("createdBy");
      expect(columns[1].field).toBe("createdDate");
      expect(columns[2].field).toBe("notes");
    });

    it("should return correct header names", () => {
      const columns = getAuditColumns(mockTheme);

      expect(columns[0].headerName).toBe("Created By");
      expect(columns[1].headerName).toBe("Created On");
      expect(columns[2].headerName).toBe("Notes");
    });

    it("should render created date and time correctly", () => {
      const columns = getAuditColumns(mockTheme);

      const RenderedCell = columns[1].renderCell({
        row: {
          createdDate: "Dec 11, 2025",
          createdTime: "06:15 AM",
        },
      });

      render(RenderedCell);

      expect(screen.getByText("Dec 11, 2025")).toBeInTheDocument();
      expect(screen.getByText("06:15 AM")).toBeInTheDocument();
    });

    it("should make all columns non-sortable", () => {
      const columns = getAuditColumns(mockTheme);

      columns.forEach((column) => {
        expect(column.sortable).toBe(false);
      });
    });
  });

  describe("style objects", () => {
    it("should have correct tableContainerSx styles", () => {
      expect(tableContainerSx).toEqual({
        width: "100%",
        mt: 1,
      });
    });

    it("should have correct backButtonWrapperSx styles", () => {
      expect(backButtonWrapperSx).toEqual({
        pt: 2,
        mt: 1,
        display: "flex",
        justifyContent: "center",
      });
    });

    it("should have correct backButtonSx styles", () => {
      expect(backButtonSx).toMatchObject({
        minWidth: 200,
        backgroundColor: "#1a3a6b",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 1,
      });

      expect(backButtonSx["&:hover"]).toEqual({
        backgroundColor: "#14306a",
      });
    });
  });
});