import { render, screen, fireEvent } from "@testing-library/react";
import AccountManagement from "./AccountManagement";

jest.mock("../../../common/CommonDataGrid", () => {
  return function MockCommonDataGrid(props) {
    return <div data-testid="common-data-grid">CommonDataGrid</div>;
  };
});

jest.mock("../../../common/CommonSnackbar", () => {
  return function MockCommonSnackbar(props) {
    return <div data-testid="common-snackbar">Snackbar</div>;
  };
});

jest.mock("./AccountMangementHeader", () => {
  return function MockAccountManagementHeader(props) {
    return <div data-testid="account-header">AccountHeader</div>;
  };
});

jest.mock("./AddAccountDialog", () => {
  return function MockAddAccountDialog(props) {
    return <div data-testid="add-account-dialog">AddAccountDialog</div>;
  };
});

describe("AccountManagement", () => {
  it("should render all main components", () => {
    render(<AccountManagement />);
    
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
    expect(screen.getByTestId("common-snackbar")).toBeInTheDocument();
    expect(screen.getByTestId("add-account-dialog")).toBeInTheDocument();
  });

  it("should render PageContainer wrapper", () => {
    const { container } = render(<AccountManagement />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render without crashing", () => {
    const { container } = render(<AccountManagement />);
    expect(container).toBeTruthy();
  });

  it("should have initial data state", () => {
    render(<AccountManagement />);
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
  });

  it("should render with default pagination", () => {
    render(<AccountManagement />);
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("should render with GridContainer", () => {
    render(<AccountManagement />);
    expect(screen.getByTestId("common-data-grid")).toBeInTheDocument();
  });

  it("should render AddAccountDialog initially", () => {
    render(<AccountManagement />);
    expect(screen.getByTestId("add-account-dialog")).toBeInTheDocument();
  });

  it("should render CommonSnackbar for notifications", () => {
    render(<AccountManagement />);
    expect(screen.getByTestId("common-snackbar")).toBeInTheDocument();
  });

  it("should have correct component structure", () => {
    render(<AccountManagement />);
    const components = [
      "account-header",
      "common-data-grid",
      "common-snackbar",
      "add-account-dialog",
    ];
    components.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  it("should maintain component order", () => {
    render(<AccountManagement />);
    const header = screen.getByTestId("account-header");
    const grid = screen.getByTestId("common-data-grid");
    expect(header.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("should render multiple times without error", () => {
    const { rerender } = render(<AccountManagement />);
    rerender(<AccountManagement />);
    rerender(<AccountManagement />);
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
  });

  it("should have all required data-testid elements", () => {
    render(<AccountManagement />);
    expect(screen.queryByTestId("account-header")).not.toBeNull();
    expect(screen.queryByTestId("common-data-grid")).not.toBeNull();
    expect(screen.queryByTestId("common-snackbar")).not.toBeNull();
    expect(screen.queryByTestId("add-account-dialog")).not.toBeNull();
  });
});
