import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import RoleManagement from "./RoleManagement";



import {

  fetchRolesApi,

  fetchRoleByIdApi,

  saveRoleApi,

} from "./RolePermissionsApi";



const mockFetchApi = jest.fn();

const mockCreateApi = jest.fn();

const mockRefreshPermissions = jest.fn();

const mockSetLoading = jest.fn();



jest.mock("../../../services/services", () => ({

  useServices: () => ({

    fetchApi: mockFetchApi,

    createApi: mockCreateApi,

  }),

}));



jest.mock("@src/hooks/usePermissions", () => ({

  usePermissions: () => ({

    checkPermission: jest.fn(() => true),

  }),

}));



jest.mock("@src/hooks/usePermissionRefresh", () => ({

  usePermissionRefresh: () => ({

    refreshPermissions: mockRefreshPermissions,

  }),

}));



jest.mock("./RolePermissionsApi", () => ({

  fetchRolesApi: jest.fn(),

  fetchRoleByIdApi: jest.fn(),

  saveRoleApi: jest.fn(),

}));



jest.mock("@mui/material/styles", () => ({

  ...jest.requireActual("@mui/material/styles"),

  useTheme: () => ({

    palette: {

      brand: {

        main: "#1976d2",

      },

    },

  }),

}));



jest.mock("./RoleManagement.styled", () => ({

  Header: ({ children }) => <div>{children}</div>,

  Title: ({ children }) => <div>{children}</div>,

  Subtitle: ({ children }) => <div>{children}</div>,

  AddButton: ({ children, ...props }) => <button {...props}>{children}</button>,

  CancelEditButton: ({ children, ...props }) => (

    <button {...props}>{children}</button>

  ),

  FormEditButton: ({ children, ...props }) => (

    <button {...props}>{children}</button>

  ),

}));



jest.mock("../../../common/PageContainer", () => ({

  PageContainer: ({ children }) => <div>{children}</div>,

}));



jest.mock("./RoleCard", () => (props) => (

  <div data-testid={`role-card-${props.role.id}`}>

    <div>{props.role.title}</div>



    <button onClick={() => props.onEdit(props.role)}>Edit</button>



    <button onClick={() => props.onOpenAuditLog(props.role)}>Audit Log</button>

  </div>

));



jest.mock("./RoleManagementForm", () => (props) => (

  <div data-testid="role-form">

    <button

      onClick={() =>

        props.onSubmit({

          title: "Admin",

          description: "Admin Role",

          status: 1,

        })

      }

    >

      Submit Form

    </button>

  </div>

));



jest.mock(

  "./AuditLogModal",

  () => (props) =>

    props.open ? <div data-testid="audit-modal">Audit Modal</div> : null,

);



jest.mock(

  "../../../common/CommonDialogForm",

  () =>

    function MockDialog({ open, title, content }) {

      if (!open) return null;



      return (

        <div data-testid="dialog">

          <div>{title}</div>

          {content}

        </div>

      );

    },

);



jest.mock(

  "../../../common/CommonSnackbar",

  () =>

    function MockSnackbar(props) {

      if (!props.open) return null;



      return <div data-testid="snackbar">{props.message}</div>;

    },

);



jest.mock("../../../common/CommonLoading", () => () => ({

  setLoading: mockSetLoading,

  LoadingContainer: () => <div data-testid="loading" />,

}));



jest.mock(

  "../../../common/AccessControl",

  () =>

    function AccessControl({ children }) {

      return <>{children}</>;

    },

);



const store = configureStore({

  reducer: {

    loginSlice: () => ({

      loginDetails: {},

    }),

  },

});



const renderComponent = () =>

  render(

    <Provider store={store}>

      <RoleManagement />

    </Provider>,

  );



describe("RoleManagement", () => {

  beforeEach(() => {

    jest.clearAllMocks();

  });



  test("renders Roles Overview", async () => {

    fetchRolesApi.mockResolvedValue([]);



    renderComponent();



    expect(screen.getByText("Roles Overview")).toBeInTheDocument();

  });



  test("fetches roles on mount", async () => {

    fetchRolesApi.mockResolvedValue([

      {

        id: 1,

        name: "Admin",

        description: "Admin Role",

        user_count: 2,

        status: 1,

      },

    ]);



    renderComponent();



    await waitFor(() => {

      expect(fetchRolesApi).toHaveBeenCalled();

    });



    expect(screen.getByText("Admin")).toBeInTheDocument();

  });



  test("calls refresh permissions", async () => {

    fetchRolesApi.mockResolvedValue([]);



    renderComponent();



    await waitFor(() => {

      expect(mockRefreshPermissions).toHaveBeenCalled();

    });

  });



  test("opens Add Role dialog", async () => {

    fetchRolesApi.mockResolvedValue([]);



    renderComponent();



    fireEvent.click(

      screen.getByRole("button", {

        name: /add role/i,

      }),

    );



    expect(screen.getByTestId("dialog")).toBeInTheDocument();

  });



  test("loads role details on edit", async () => {

    fetchRolesApi.mockResolvedValue([

      {

        id: 1,

        name: "Admin",

        description: "Admin",

        user_count: 1,

        status: 1,

      },

    ]);



    fetchRoleByIdApi.mockResolvedValue({

      id: 1,

      name: "Admin",

      description: "Admin",

      status: 1,

    });



    renderComponent();



    await waitFor(() => expect(screen.getByText("Admin")).toBeInTheDocument());



    fireEvent.click(screen.getByText("Edit"));



    await waitFor(() => {

      expect(fetchRoleByIdApi).toHaveBeenCalled();

    });

  });



  test("creates role successfully", async () => {

    fetchRolesApi.mockResolvedValue([]);



    saveRoleApi.mockResolvedValue({

      statusCode: 201,

    });



    renderComponent();



    fireEvent.click(

      screen.getByRole("button", {

        name: /add role/i,

      }),

    );



    fireEvent.click(screen.getByText("Submit Form"));



    await waitFor(() => {

      expect(saveRoleApi).toHaveBeenCalled();

    });

  });



  test("shows warning on failed save", async () => {

    fetchRolesApi.mockResolvedValue([]);



    saveRoleApi.mockResolvedValue({

      statusCode: 400,

      body: {

        message: "Role already exists",

      },

    });



    renderComponent();



    fireEvent.click(

      screen.getByRole("button", {

        name: /add role/i,

      }),

    );



    fireEvent.click(screen.getByText("Submit Form"));



    await waitFor(() => {

      expect(screen.getByTestId("snackbar")).toBeInTheDocument();

    });

  });



  test("shows snackbar when roles API fails", async () => {

    fetchRolesApi.mockRejectedValue(new Error("API Error"));



    renderComponent();



    await waitFor(() => {

      expect(screen.getByTestId("snackbar")).toBeInTheDocument();

    });

  });



  test("opens audit log modal", async () => {

    fetchRolesApi.mockResolvedValue([

      {

        id: 1,

        name: "Admin",

        description: "Admin",

        user_count: 1,

        status: 1,

      },

    ]);



    mockFetchApi.mockResolvedValue({

      statusCode: 200,

      body: {

        audit_logs: [

          {

            created_by: "Emil Watson",

            created_at: "2026-06-18T05:50:46-05:00",

            description: "Role Updated",

          },

        ],

        pagination: {

          total_records: 1,

          total_pages: 1,

          current_page: 1,

          limit: 10,

        },

      },

    });



    renderComponent();



    await waitFor(() => expect(screen.getByText("Admin")).toBeInTheDocument());



    fireEvent.click(screen.getByText("Audit Log"));



    await waitFor(() => {

      expect(screen.getByTestId("audit-modal")).toBeInTheDocument();

    });

  });



  test("handles audit log API failure", async () => {

    fetchRolesApi.mockResolvedValue([

      {

        id: 1,

        name: "Admin",

        description: "Admin",

        user_count: 1,

        status: 1,

      },

    ]);



    mockFetchApi.mockRejectedValue(new Error("Audit Error"));



    renderComponent();



    await waitFor(() => expect(screen.getByText("Admin")).toBeInTheDocument());



    fireEvent.click(screen.getByText("Audit Log"));



    await waitFor(() => {

      expect(screen.getByTestId("audit-modal")).toBeInTheDocument();

    });

  });

});

