// AlertCenterScreenCards.test.jsx

import { render, screen, act } from "@testing-library/react";
import AlertCenterScreenCards from "./AlertCenterScreenCards";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("./AlertCenterScreenCard.styles.jsx", () => ({
  AlertsContainer: jest.fn(({ children }) => (
    <div data-testid="alerts-container">{children}</div>
  )),
}));

jest.mock("./AlertListPanel", () =>
  jest.fn(({ alerts, selectedAlert, handleAlertSelect }) => (
    <div
      data-testid="alert-list-panel"
      data-alert-count={alerts.length}
      data-selected-title={selectedAlert?.title ?? "none"}
      onClick={() => handleAlertSelect(alerts[1])}
    />
  )),
);

jest.mock("./AlertDetailsPanel", () =>
  jest.fn(({ selectedAlert }) => (
    <div
      data-testid="alert-details-panel"
      data-selected-title={selectedAlert?.title ?? "none"}
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

describe("AlertCenterScreenCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe("rendering", () => {
    test("renders the outer container", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);
      expect(screen.getByTestId("alerts-container")).toBeInTheDocument();
    });

    test("renders AlertListPanel", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);
      expect(screen.getByTestId("alert-list-panel")).toBeInTheDocument();
    });

    test("renders AlertDetailsPanel", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);
      expect(screen.getByTestId("alert-details-panel")).toBeInTheDocument();
    });

    test("passes all alerts to AlertListPanel", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);
      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-alert-count",
        "3",
      );
    });
  });

  // ── Initial selection ──────────────────────────────────────────────────────

  describe("initial selection", () => {
    test("selects the first alert by default", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);

      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert One",
      );
      expect(screen.getByTestId("alert-details-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert One",
      );
    });

    test("selectedAlert is undefined when alerts array is empty", () => {
      render(<AlertCenterScreenCards alerts={[]} />);

      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-selected-title",
        "none",
      );
      expect(screen.getByTestId("alert-details-panel")).toHaveAttribute(
        "data-selected-title",
        "none",
      );
    });
  });

  // ── Selection update ───────────────────────────────────────────────────────

  describe("selection update", () => {
    test("updates selectedAlert when handleAlertSelect is called", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);

      act(() => {
        screen.getByTestId("alert-list-panel").click();
      });

      expect(screen.getByTestId("alert-details-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert Two",
      );
    });

    test("passes updated selectedAlert to both panels after selection", () => {
      render(<AlertCenterScreenCards alerts={mockAlerts} />);

      act(() => {
        screen.getByTestId("alert-list-panel").click();
      });

      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert Two",
      );
      expect(screen.getByTestId("alert-details-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert Two",
      );
    });
  });

  // ── Default prop ───────────────────────────────────────────────────────────

  describe("default prop", () => {
    test("renders without crashing when alerts prop is omitted", () => {
      render(<AlertCenterScreenCards />);
      expect(screen.getByTestId("alerts-container")).toBeInTheDocument();
    });

    test("passes empty array to AlertListPanel when alerts prop is omitted", () => {
      render(<AlertCenterScreenCards />);
      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-alert-count",
        "0",
      );
    });
  });

  // ── Edge & negative cases ──────────────────────────────────────────────────

  describe("edge and negative cases", () => {
    test("renders correctly with a single alert", () => {
      render(<AlertCenterScreenCards alerts={[mockAlerts[0]]} />);

      expect(screen.getByTestId("alert-list-panel")).toHaveAttribute(
        "data-alert-count",
        "1",
      );
      expect(screen.getByTestId("alert-details-panel")).toHaveAttribute(
        "data-selected-title",
        "Alert One",
      );
    });

    test("renders correctly with null values inside alert objects", () => {
      const alertsWithNulls = [
        { title: null, role: "ELD", color: null },
        { title: "Valid Alert", role: "System", color: "#EF4444" },
      ];

      render(<AlertCenterScreenCards alerts={alertsWithNulls} />);
      expect(screen.getByTestId("alerts-container")).toBeInTheDocument();
    });
  });
});
