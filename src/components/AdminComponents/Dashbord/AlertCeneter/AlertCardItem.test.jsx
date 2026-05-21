// AlertCardItem.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import AlertCardItem from "./AlertCardItem";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("./AlertCenterScreenCard.styles.jsx", () => ({
  AlertCard: jest.fn(({ children, onClick }) => (
    <div data-testid="alert-card" onClick={onClick}>
      {children}
    </div>
  )),
  AlertCardTitle: jest.fn(({ children }) => (
    <span data-testid="alert-card-title">{children}</span>
  )),
  AlertContent: jest.fn(({ children }) => (
    <div data-testid="alert-content">{children}</div>
  )),
  AlertDetailItem: jest.fn(({ children }) => (
    <div data-testid="alert-detail-item">{children}</div>
  )),
  AlertDetailRow: jest.fn(({ children }) => (
    <div data-testid="alert-detail-row">{children}</div>
  )),
  AlertIcon: jest.fn(({ alt }) => <img data-testid={`icon-${alt}`} alt={alt} />),
  ELDTag: jest.fn(({ children }) => (
    <span data-testid="eld-tag">{children}</span>
  )),
  LocationRow: jest.fn(({ children }) => (
    <div data-testid="location-row">{children}</div>
  )),
  AlertTopRow: jest.fn(({ children }) => (
    <div data-testid="alert-top-row">{children}</div>
  )),
  AlertRight: jest.fn(({ children }) => (
    <div data-testid="alert-right">{children}</div>
  )),
  AlertStatus: jest.fn(({ children }) => (
    <span data-testid="alert-status">{children}</span>
  )),
  AlertOpen: jest.fn(({ children, inProgress }) => (
    <span data-testid="alert-open" data-in-progress={String(inProgress)}>
      {children}
    </span>
  )),
}));

jest.mock("../AlertCenter.styles", () => ({
  AlertAccentBar: jest.fn(() => <div data-testid="accent-bar" />),
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const eldAlert = {
  title: "Device Offline Issue",
  severity: "Critical",
  company: "Swift Transportation",
  truck: "TRK-256",
  serial: "SN-ABC12345",
  role: "ELD",
  location1: "30.250661",
  location2: "-97.735925",
  color: "#2563EB",
  time: null,
  city: null,
};

const systemAlert = {
  title: "ELD - Device Connection Lost",
  severity: "warning",
  company: null,
  truck: "TRK-109",
  serial: null,
  role: "System",
  city: "Dallas, TX.",
  time: "07:54 AM",
  color: "#2563EB",
  location1: null,
  location2: null,
};

const adminAlert = {
  title: "New devices assigned",
  severity: null,
  company: null,
  truck: "TRK-221",
  serial: null,
  role: "Admin",
  city: "Dallas, TX.",
  time: "07:51 AM",
  color: "#3B82F6",
  location1: null,
  location2: null,
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("AlertCardItem", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe("rendering", () => {
    test("renders the alert title", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("alert-card-title")).toHaveTextContent(
        "Device Offline Issue",
      );
    });

    test("renders the severity label", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("alert-status")).toHaveTextContent("Critical");
    });

    test("renders the ELD role tag", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("eld-tag")).toHaveTextContent("ELD");
    });

    test("renders the accent bar", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("accent-bar")).toBeInTheDocument();
    });

    test("renders company, truck, and serial detail items", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByText("Swift Transportation")).toBeInTheDocument();
      expect(screen.getByText("TRK-256")).toBeInTheDocument();
      expect(screen.getByText("SN-ABC12345")).toBeInTheDocument();
    });

    test("renders location1 when present", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByText("30.250661")).toBeInTheDocument();
    });

    test("falls back to city when location1 is null", () => {
      render(
        <AlertCardItem item={systemAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByText("Dallas, TX.")).toBeInTheDocument();
    });

    test("renders location2 when present", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByText("-97.735925")).toBeInTheDocument();
    });

    test("falls back to time when location2 is null", () => {
      render(
        <AlertCardItem item={systemAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByText("07:54 AM")).toBeInTheDocument();
    });
  });

  // ── Role-based status label ────────────────────────────────────────────────

  describe("role-based status label", () => {
    test('shows "Open" label for ELD role', () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      const label = screen.getByTestId("alert-open");
      expect(label).toHaveTextContent("Open");
      expect(label).toHaveAttribute("data-in-progress", "false");
    });

    test('shows "in-progress" label for System role', () => {
      render(
        <AlertCardItem item={systemAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      const label = screen.getByTestId("alert-open");
      expect(label).toHaveTextContent("in-progress");
      expect(label).toHaveAttribute("data-in-progress", "true");
    });

    test("hides status label for Admin role", () => {
      render(
        <AlertCardItem item={adminAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.queryByTestId("alert-open")).not.toBeInTheDocument();
    });
  });

  // ── Click / selection ──────────────────────────────────────────────────────

  describe("click interaction", () => {
    test("calls onSelect with the item when clicked", () => {
      render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      fireEvent.click(screen.getByTestId("alert-card"));

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(eldAlert);
    });

    test("calls onSelect with the correct item when multiple cards exist", () => {
      const { rerender } = render(
        <AlertCardItem item={eldAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      fireEvent.click(screen.getByTestId("alert-card"));
      expect(mockOnSelect).toHaveBeenCalledWith(eldAlert);

      rerender(
        <AlertCardItem item={systemAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      fireEvent.click(screen.getByTestId("alert-card"));
      expect(mockOnSelect).toHaveBeenCalledWith(systemAlert);
    });
  });

  // ── Edge & negative cases ──────────────────────────────────────────────────

  describe("edge and negative cases", () => {
    test("renders without crashing when severity is null", () => {
      render(
        <AlertCardItem item={adminAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("alert-status")).toBeInTheDocument();
    });

    test("renders without crashing when company, serial are null", () => {
      render(
        <AlertCardItem item={systemAlert} isSelected={false} onSelect={mockOnSelect} />,
      );

      expect(screen.getByTestId("alert-card")).toBeInTheDocument();
    });

    test("renders without crashing when all location fields are null", () => {
      const noLocationAlert = {
        ...eldAlert,
        location1: null,
        location2: null,
        city: null,
        time: null,
      };

      render(
        <AlertCardItem
          item={noLocationAlert}
          isSelected={false}
          onSelect={mockOnSelect}
        />,
      );

      expect(screen.getByTestId("location-row")).toBeInTheDocument();
    });

    test("does not throw when onSelect is called with an empty item", () => {
      const emptyItem = {
        title: "",
        severity: null,
        company: null,
        truck: null,
        serial: null,
        role: "ELD",
        location1: null,
        location2: null,
        city: null,
        time: null,
        color: "",
      };

      render(
        <AlertCardItem item={emptyItem} isSelected={false} onSelect={mockOnSelect} />,
      );

      fireEvent.click(screen.getByTestId("alert-card"));
      expect(mockOnSelect).toHaveBeenCalledWith(emptyItem);
    });
  });
});
