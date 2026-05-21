// AlertListPanel.test.jsx

import { render, screen } from "@testing-library/react";
import AlertListPanel from "./AlertListPanel";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("./AlertCenterScreenCard.styles.jsx", () => ({
  AlertList: jest.fn(({ children }) => (
    <div data-testid="alert-list">{children}</div>
  )),
  AlertCardContainer: jest.fn(({ children }) => (
    <div data-testid="alert-card-container">{children}</div>
  )),
}));

jest.mock("./AlertCardItem.jsx", () =>
  jest.fn(({ item, isSelected, onSelect }) => (
    <div
      data-testid="alert-card-item"
      data-title={item.title}
      data-selected={String(isSelected)}
      onClick={() => onSelect(item)}
    />
  )),
);

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockAlerts = [
  { title: "Alert One", role: "ELD", color: "#2563EB" },
  { title: "Alert Two", role: "System", color: "#EF4444" },
  { title: "Alert Three", role: "Admin", color: "#3B82F6" },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("AlertListPanel", () => {
  const mockHandleAlertSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe("rendering", () => {
    test("renders the container and list wrapper", () => {
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      expect(screen.getByTestId("alert-card-container")).toBeInTheDocument();
      expect(screen.getByTestId("alert-list")).toBeInTheDocument();
    });

    test("renders one AlertCardItem per alert", () => {
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      const items = screen.getAllByTestId("alert-card-item");
      expect(items).toHaveLength(3);
    });

    test("passes the correct item to each AlertCardItem", () => {
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      const items = screen.getAllByTestId("alert-card-item");
      expect(items[0]).toHaveAttribute("data-title", "Alert One");
      expect(items[1]).toHaveAttribute("data-title", "Alert Two");
      expect(items[2]).toHaveAttribute("data-title", "Alert Three");
    });

    test("marks the selected alert as isSelected=true", () => {
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={mockAlerts[1]}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      const items = screen.getAllByTestId("alert-card-item");
      expect(items[0]).toHaveAttribute("data-selected", "false");
      expect(items[1]).toHaveAttribute("data-selected", "true");
      expect(items[2]).toHaveAttribute("data-selected", "false");
    });

    test("marks all items as not selected when selectedAlert is null", () => {
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      screen.getAllByTestId("alert-card-item").forEach((item) => {
        expect(item).toHaveAttribute("data-selected", "false");
      });
    });
  });

  // ── Selection callback ─────────────────────────────────────────────────────

  describe("selection callback", () => {
    test("passes handleAlertSelect down to each AlertCardItem as onSelect", () => {
      const MockAlertCardItem = require("./AlertCardItem.jsx");
      render(
        <AlertListPanel
          alerts={mockAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      const calls = MockAlertCardItem.mock.calls;
      calls.forEach((call) => {
        expect(typeof call[0].onSelect).toBe("function");
      });
    });
  });

  // ── Edge & negative cases ──────────────────────────────────────────────────

  describe("edge and negative cases", () => {
    test("renders without crashing when alerts is an empty array", () => {
      render(
        <AlertListPanel
          alerts={[]}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      expect(screen.getByTestId("alert-list")).toBeInTheDocument();
      expect(screen.queryAllByTestId("alert-card-item")).toHaveLength(0);
    });

    test("renders a single alert correctly", () => {
      render(
        <AlertListPanel
          alerts={[mockAlerts[0]]}
          selectedAlert={mockAlerts[0]}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      const items = screen.getAllByTestId("alert-card-item");
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveAttribute("data-selected", "true");
    });

    test("renders correctly when alert items have minimal fields", () => {
      const minimalAlerts = [
        { title: "Minimal", role: "ELD", color: "#000" },
      ];

      render(
        <AlertListPanel
          alerts={minimalAlerts}
          selectedAlert={null}
          handleAlertSelect={mockHandleAlertSelect}
        />,
      );

      expect(screen.getByTestId("alert-card-item")).toBeInTheDocument();
    });
  });
});
