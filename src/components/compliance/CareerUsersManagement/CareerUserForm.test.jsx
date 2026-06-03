import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { useForm } from "react-hook-form";

import CareerUserForm from "./CareerUserForm";

const mockSetEditMode = jest.fn();

const createStore = (state) => ({
  getState: () => state,
  subscribe: jest.fn(() => jest.fn()),
  dispatch: jest.fn(),
});
const mockOnSubmit = jest.fn();
const mockHandleBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../services/services", () => ({
  useServices: () => ({
    fetchApi: jest.fn(),
  }),
}));

jest.mock("./HeaderComponents/UserPageHeader", () => {
  return function MockHeader() {
    return <div data-testid="user-page-header" />;
  };
});

jest.mock("./CareerUserFormFields", () => {
  const React = require("react");

  const MockComponent = (props) => (
    <div data-testid="career-user-form-fields">
      <button
        type="button"
        onClick={() =>
          props.setValue("first_name", "John")
        }
      >
        Set Value
      </button>
    </div>
  );

  return {
    __esModule: true,
    default: MockComponent,
    userManagementValidationSchema: {},
    geocodeAddress: jest.fn(),
  };
});

const renderComponent = (props = {}) => {
  const store = createStore({
    loginSlice: {
      loginDetails: {
        body: {
          data: {
            userdetails: {
              company_id: 1,
            },
          },
        },
      },
    },
    userFilterSlice: {
      roles: [
        {
          label: "Admin",
          value: 1,
        },
      ],
    },
  });

  return render(
    <Provider store={store}>
      <CareerUserForm
        formData={{}}
        onSubmit={mockOnSubmit}
        mode="add"
        editMode={true}
        setEditMode={mockSetEditMode}
        handleBack={mockHandleBack}
        breadcrumbs={[]}
        canUpdate={true}
        {...props}
      />
    </Provider>,
  );
};

describe("CareerUserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields component", () => {
    renderComponent();

    expect(
      screen.getByTestId(
        "career-user-form-fields",
      ),
    ).toBeInTheDocument();
  });

  test("renders add button in add mode", () => {
    renderComponent({
      mode: "add",
    });

    expect(
      screen.getByRole("button", {
        name: /add career user/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders update button in edit mode", () => {
    renderComponent({
      mode: "edit",
    });

    expect(
      screen.getByRole("button", {
        name: /update career user/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls setEditMode on cancel click", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    expect(
      mockSetEditMode,
    ).toHaveBeenCalled();
  });

  test("renders header only mode", () => {
    renderComponent({
      headerOnly: true,
    });

    expect(
      screen.getByTestId(
        "user-page-header",
      ),
    ).toBeInTheDocument();
  });

  test("does not render form fields in headerOnly mode", () => {
    renderComponent({
      headerOnly: true,
    });

    expect(
      screen.queryByTestId(
        "career-user-form-fields",
      ),
    ).not.toBeInTheDocument();
  });

  test("submit button is disabled when canUpdate is false", () => {
    renderComponent({
      canUpdate: false,
    });

    expect(
      screen.getByRole("button", {
        name: /add career user/i,
      }),
    ).toBeDisabled();
  });

  test("submit button is enabled when canUpdate is true", () => {
    renderComponent({
      canUpdate: true,
    });

    expect(
      screen.getByRole("button", {
        name: /add career user/i,
      }),
    ).toBeEnabled();
  });

  test("renders without crashing when formData exists", () => {
    renderComponent({
      mode: "edit",
      formData: {
        user_id: 1,
        first_name: "John",
        last_name: "Doe",
      },
    });

    expect(
      screen.getByTestId(
        "career-user-form-fields",
      ),
    ).toBeInTheDocument();
  });

  test("handles empty formData", () => {
    renderComponent({
      formData: {},
    });

    expect(
      screen.getByTestId(
        "career-user-form-fields",
      ),
    ).toBeInTheDocument();
  });

  test("renders form element", () => {
    const { container } =
      renderComponent();

    expect(
      container.querySelector("form"),
    ).toBeInTheDocument();
  });
});