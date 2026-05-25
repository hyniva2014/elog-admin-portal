// AlertDetailsPanel.test.jsx

import { render, screen } from "@testing-library/react";
import AlertDetailsPanel from "./AlertDetailsPanel";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("./AlertCenterScreenCard.styles.jsx", () => ({
  AlertDetailItem: jest.fn(({ children }) => (
    <div data-testid="alert-detail-item">{children}</div>
  )),
  AlertIcon: jest.fn(({ alt }) => <img data-testid={`icon-${alt}`} alt={alt} />),
  DetailAlertIcon: jest.fn(({ alt }) => (
    <img data-testid="detail-alert-icon" alt={alt} />
  )),
  AlertCardContainer: jest.fn(({ children }) => (
    <div data-testid="alert-card-container">{children}</div>
  )),
  DetailHeader: jest.fn(({ children }) => (
    <div data-testid="detail-header">{children}</div>
  )),
  DetailTitleWrapper: jest.fn(({ children }) => (
    <div data-testid="detail-title-wrapper">{children}</div>
  )),
  DetailTitle: jest.fn(({ children }) => (
    <h2 data-testid="detail-title">{children}</h2>
  )),
  DetailSubTitle: jest.fn(({ children }) => (
    <p data-testid="detail-subtitle">{children}</p>
  )),
  InfoSection: jest.fn(({ children }) => (
    <div data-testid="info-section">{children}</div>
  )),
  SectionTitle: jest.fn(({ children }) => (
    <h3 data-testid="section-title">{children}</h3>
  )),
  TriggerSectionTitle: jest.fn(({ children }) => (
    <h3 data-testid="trigger-section-title">{children}</h3>
  )),
  InfoGrid: jest.fn(({ children }) => (
    <div data-testid="info-grid">{children}</div>
  )),
  TriggerInfoGrid: jest.fn(({ children }) => (
    <div data-testid="trigger-info-grid">{children}</div>
  )),
  InfoCard: jest.fn(({ children }) => (
    <div data-testid="info-card">{children}</div>
  )),
  InfoLabel: jest.fn(({ children }) => (
    <span data-testid="info-label">{children}</span>
  )),
  InfoValue: jest.fn(({ children }) => (
    <span data-testid="info-value">{children}</span>
  )),
  StatusBadge: jest.fn(({ children }) => (
    <span data-testid="status-badge">{children}</span>
  )),
  LocationItem: jest.fn(({ children }) => (
    <div data-testid="location-item">{children}</div>
  )),
  CoordinateBadge: jest.fn(({ children }) => (
    <span data-testid="coordinate-badge">{children}</span>
  )),
  TriggerSection: jest.fn(({ children }) => (
    <div data-testid="trigger-section">{children}</div>
  )),
  TriggerInfoCard: jest.fn(({ children }) => (
    <div data-testid="trigger-info-card">{children}</div>
  )),
  ActionSection: jest.fn(({ children }) => (
    <div data-testid="action-section">{children}</div>
  )),
  ActionButton: jest.fn(({ children, onClick }) => (
    <button data-testid="action-button" onClick={onClick}>
      {children}
    </button>
  )),
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const fullAlert = {
  title: "Device Offline Issue",
  message: null,
  severity: "Critical",
  subTitle: null,
  company: "Swift Transportation",
  truck: "TRK-256",
  location1: "30.250661",
  location2: "-97.735925",
  city: null,
};

const cityOnlyAlert = {
  title: "ELD Connection Lost",
  message: null,
  severity: "warning",
  company: "Schneider National",
  truck: "TRK-109",
  location1: null,
  location2: null,
  city: "Dallas, TX.",
};

const messageFallbackAlert = {
  title: null,
  message: "Fallback message text",
  severity: "Critical",
  company: "ACME Corp",
  truck: "TRK-001",
  location1: null,
  location2: null,
  city: null,
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("AlertDetailsPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Null guard ─────────────────────────────────────────────────────────────

  describe("null guard", () => {
    test("renders nothing when selectedAlert is null", () => {
      const { container } = render(<AlertDetailsPanel selectedAlert={null} />);
      expect(container).toBeEmptyDOMElement();
    });

    test("renders nothing when selectedAlert is undefined", () => {
      const { container } = render(
        <AlertDetailsPanel selectedAlert={undefined} />,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe("rendering", () => {
    test("renders the main container when selectedAlert is provided", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("alert-card-container")).toBeInTheDocument();
    });

    test("renders the detail header section", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("detail-header")).toBeInTheDocument();
    });

    test("renders the alert type icon", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("detail-alert-icon")).toBeInTheDocument();
    });

    test("renders the info section", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("info-section")).toBeInTheDocument();
    });

    test("renders the trigger section", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("trigger-section")).toBeInTheDocument();
    });

    test("renders the action section with all 4 buttons", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);

      const buttons = screen.getAllByTestId("action-button");
      expect(buttons).toHaveLength(4);

      const labels = buttons.map((b) => b.textContent);
      expect(labels).toEqual([
        "Acknowledge",
        "Assign Operator",
        "Escalate",
        "Resolve",
      ]);
    });
  });

  // ── Title & subtitle ───────────────────────────────────────────────────────

  describe("title and subtitle", () => {
    test("renders the alert title", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("detail-title")).toHaveTextContent(
        "Device Offline Issue",
      );
    });

    test("falls back to message when title is null", () => {
      render(<AlertDetailsPanel selectedAlert={messageFallbackAlert} />);
      expect(screen.getByTestId("detail-title")).toHaveTextContent(
        "Fallback message text",
      );
    });

    test("renders severity as subtitle", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("detail-subtitle")).toHaveTextContent(
        "Critical",
      );
    });

    test('falls back to "Critical" when severity is null', () => {
      const noSeverityAlert = { ...fullAlert, severity: null };
      render(<AlertDetailsPanel selectedAlert={noSeverityAlert} />);
      expect(screen.getByTestId("detail-subtitle")).toHaveTextContent(
        "Critical",
      );
    });
  });

  // ── Driver & device info ───────────────────────────────────────────────────

  describe("driver and device information", () => {
    test("renders the section title", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("section-title")).toBeInTheDocument();
    });

    test("renders the carrier name from selectedAlert", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("Swift Transportation")).toBeInTheDocument();
    });

    test("renders the truck number from selectedAlert", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("TRK-256")).toBeInTheDocument();
    });

    test("renders static driver name placeholder", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    });

    test("renders static device ID placeholder", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("DEV-8921")).toBeInTheDocument();
    });

    test("renders the active status badge", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("status-badge")).toHaveTextContent("Active");
    });
  });

  // ── Location display ───────────────────────────────────────────────────────

  describe("location display", () => {
    test("renders location1 coordinate when present", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      const badges = screen.getAllByTestId("coordinate-badge");
      expect(badges[0]).toHaveTextContent("30.250661");
    });

    test("renders location2 coordinate when present", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      const badges = screen.getAllByTestId("coordinate-badge");
      expect(badges[1]).toHaveTextContent("-97.735925");
    });

    test("falls back to city when location1 is null", () => {
      render(<AlertDetailsPanel selectedAlert={cityOnlyAlert} />);
      const badges = screen.getAllByTestId("coordinate-badge");
      expect(badges[0]).toHaveTextContent("Dallas, TX.");
    });

    test("does not render second coordinate badge when location2 is null", () => {
      render(<AlertDetailsPanel selectedAlert={cityOnlyAlert} />);
      const badges = screen.getAllByTestId("coordinate-badge");
      expect(badges).toHaveLength(1);
    });
  });

  // ── Trigger information ────────────────────────────────────────────────────

  describe("trigger information", () => {
    test("renders the trigger section title", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByTestId("trigger-section-title")).toHaveTextContent(
        "Trigger Information",
      );
    });

    test("renders static Alert Source value", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("ELD Device")).toBeInTheDocument();
    });

    test("renders static Trigger Event value", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getByText("Device Connection Lost")).toBeInTheDocument();
    });

    test("renders two trigger info cards", () => {
      render(<AlertDetailsPanel selectedAlert={fullAlert} />);
      expect(screen.getAllByTestId("trigger-info-card")).toHaveLength(2);
    });
  });

  // ── Edge & negative cases ──────────────────────────────────────────────────

  describe("edge and negative cases", () => {
    test("renders without crashing when company is null", () => {
      const noCompanyAlert = { ...fullAlert, company: null };
      render(<AlertDetailsPanel selectedAlert={noCompanyAlert} />);
      expect(screen.getByTestId("alert-card-container")).toBeInTheDocument();
    });

    test("renders without crashing when truck is null", () => {
      const noTruckAlert = { ...fullAlert, truck: null };
      render(<AlertDetailsPanel selectedAlert={noTruckAlert} />);
      expect(screen.getByTestId("alert-card-container")).toBeInTheDocument();
    });

    test("renders without crashing when all location fields are null", () => {
      const noLocationAlert = {
        ...fullAlert,
        location1: null,
        location2: null,
        city: null,
      };
      render(<AlertDetailsPanel selectedAlert={noLocationAlert} />);
      expect(screen.getByTestId("location-item")).toBeInTheDocument();
    });

    test("renders without crashing for a minimal alert object", () => {
      const minimalAlert = { title: "Min", severity: null };
      render(<AlertDetailsPanel selectedAlert={minimalAlert} />);
      expect(screen.getByTestId("alert-card-container")).toBeInTheDocument();
    });
  });
});
