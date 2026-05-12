# Current Architecture Documentation

## 1. Folder Structure

The project follows a React application structure with clear separation of concerns. The main directories within `src/` are organized as follows:

- **`assets/`**: Static assets including images, icons, and media files.
- **`common/`**: Shared utility components and common UI elements reused across features. Contains 62+ components including `CommonDataGrid.jsx`, `CommonAutocompleteDropdown.jsx`, `CommonTextField.jsx`, and their respective styled files.
- **`components/`**: Feature-specific components organized by domain. Major directories include `FleetManagements/` (with subdirectories like `DriverManagement/`, `TruckManagement/`, `TrailerManagement/`), `LogScreens/`, `NewDashboard/`, `RoleManagement/`, etc. Also contains `Components.styled.jsx` for shared styled components.
- **`helpers/`**: Pure utility functions for data manipulation and calculations.
- **`hooks/`**: Custom React hooks for extracting business logic. Contains 14+ hooks including `useLocalStorage.js`, `useDrawerToggle.js`, `useDomoEmbed.js`, etc.
- **`layouts/`**: Layout components defining overall page structure and UI wrappers.
- **`pages/`**: Page-level components organized by route categories. Contains `auth/`, `dashboard/`, `apps/`, `charts/`, `forms/`, `maps/`, etc.
- **`routes/`**: Route definitions and routing logic.
- **`services/`**: API layer with service files. Contains `services.js`, `commonServices.js`, `serviceClient.js`, and utility files for network requests.
- **`states/`**: React Context providers for state management. Contains `useAuthContext.jsx` and `useLayoutContext.jsx`.
- **`store/`**: Redux store configuration and slices using Redux Toolkit.
- **`theme/`**: MUI theme configuration with `palette.js`, `typography.js`, `shadow.js`, `grid.js`, and component overrides.
- **`types/`**: TypeScript type definitions.
- **`utils/`**: General utility functions and helpers.

Example of the `src/` structure:
```
src/
├── assets/
├── common/
│   ├── CommonDataGrid.jsx
│   ├── CommonAutocompleteDropdown.jsx
│   ├── CommonTextField.jsx
│   ├── CommonFleetLiveView.styled.jsx
│   └── ...
├── components/
│   ├── FleetManagements/
│   │   ├── DriverManagement/
│   │   ├── TruckManagement/
│   │   └── TrailerManagement/
│   ├── LogScreens/
│   ├── NewDashboard/
│   ├── Components.styled.jsx
│   └── ...
├── hooks/
│   ├── useLocalStorage.js
│   ├── useDrawerToggle.js
│   ├── useDomoEmbed.js
│   └── ...
├── services/
│   ├── services.js
│   ├── commonServices.js
│   └── ...
├── states/
│   ├── useAuthContext.jsx
│   └── useLayoutContext.jsx
├── store/
│   ├── reduxSlice.js
│   └── ...
├── theme/
│   ├── index.js
│   ├── palette.js
│   ├── typography.js
│   ├── shadow.js
│   └── components/
└── ...
```

## 2. Component Architecture

Components are organized into shared/common components and feature-specific components, with a clear separation between UI logic and presentation.

### Shared Components (`src/common/`)
These are reusable UI components used across multiple features. Key examples include:
- `CommonDataGrid.jsx`: Standardized data grid component (currently commented out, being refactored)
- `CommonAutocompleteDropdown.jsx`: Reusable autocomplete dropdown with loading states
- `CommonTextField.jsx`: Standardized text input component
- `CommonFleetLiveView.jsx`: Fleet tracking component with associated styled file
- `CommonDialogForm.jsx`: Standardized dialog form component
- `CommonFileUpload.jsx`: File upload component

Many common components have corresponding `.styled.jsx` files for their styling (e.g., `CommonFleetLiveView.styled.jsx`, `CommonTextField.styles.jsx`).

### Feature-Specific Components (`src/components/`)
Each major feature domain has its own directory:
- **`FleetManagements/`**: Contains subdirectories for `DriverManagement/`, `TruckManagement/`, `TrailerManagement/`, `Accidents/`, `Assignments/`, etc.
- **`LogScreens/`**: Components related to electronic logging functionality
- **`NewDashboard/`**: Dashboard-specific components and widgets
- **`RoleManagement/`**: User role and permission management components
- **`InspectionDVIRReports/`**: DVIR inspection and reporting components

The architecture follows a pattern where feature components contain both business logic and UI elements, with complex components having separate styled files.

Example from `CommonAutocompleteDropdown.jsx`:
```javascript
const CommonAutocompleteDropdown = ({
  label = "",
  value = "",
  options = [],
  onChange,
  setData,
  dataKey = "",
  minWidth = 180,
  size = "small",
  error = false,
  helperText = "",
  required = false,
  loading = false,
  disabled = false,
}) => {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <Autocomplete
      fullWidth
      size={size}
      options={options}
      value={selectedOption}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      // ... additional props
    />
  );
};
```

## 3. Styling Strategy

The project uses Material-UI (MUI) as the primary UI library with Emotion Styled Components for custom styling. The styling approach combines MUI's theming system with component-level styled components.

### MUI Theme Configuration (`src/theme/`)
The MUI theme is centrally configured with modular files:
- `index.js`: Main theme creation and configuration
- `palette.js`: Color definitions with light/dark mode support using `getColorVariants()` utility
- `typography.js`: Font styles and sizes
- `shadow.js`: Shadow definitions
- `grid.js`: Breakpoint configuration
- `components/`: Component-specific MUI overrides

Example from `src/theme/index.js`:
```javascript
const createTheme = theme => {
  const themeOption = {
    palette: paletteTheme(theme),
    typography: typographyTheme(),
    breakpoints: gridTheme(),
    shape: {
      borderRadius: 4
    },
    spacing: 8,
    shadows: shadowTheme(theme),
    zIndex: {
      appBar: 1100,
      drawer: 1200
    }
  };
  return muiCreateTheme({
    ...themeOption,
    components: componentOverrides(themeOption)
  });
};
```

### Styled Components Usage
Styled Components are used extensively for component-specific styling:
- **Common Components**: Many have corresponding `.styled.jsx` files (e.g., `CommonFleetLiveView.styled.jsx`)
- **Shared Styled Components**: `Components.styled.jsx` contains globally shared styled components
- **Theme Integration**: Styled components access theme values through the `theme` parameter

Example from `CommonFleetLiveView.styled.jsx`:
```javascript
export const FleetLiveViewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  flexGrow: 1,
  minHeight: 370,
  display: "flex",
  flexDirection: "column",
}));

export const LiveTrackingBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  background: "#fff",
  px: 2,
  py: 1,
  borderRadius: 5,
  display: "flex",
  alignItems: "center",
  gap: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  zIndex: 10,
}));
```

Example from `Components.styled.jsx`:
```javascript
export const PageContainer = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    backgroundColor: isDark
      ? theme.palette.grey[100]
      : theme.palette.common.white,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  };
});
```

### Styling Patterns and Boundaries
- **MUI Theme Updates**: Global theme properties (colors, typography, shadows) are updated in `src/theme/` files
- **Component-Level Styling**: Custom styles use Styled Components, often extending MUI components or creating new styled elements
- **Theme Access**: Styled components access theme values through the `theme` parameter, enabling consistent theming
- **File Organization**: Styled components are co-located with their components (e.g., `ComponentName.styled.jsx`) or shared globally (`Components.styled.jsx`)
- **Dark Mode Support**: Theme configuration includes complete dark/light mode palette variants

## 4. API Layer

API calls are centralized in the `src/services/` directory, providing a clean separation between network logic and UI components.

### Directory Structure (`src/services/`)
- `services.js`: Main API service functions with common HTTP methods
- `commonServices.js`: Shared service utilities and common API patterns
- `serviceClient.js`: Axios configuration and client setup
- `serviceUtils.js`: Utility constants and helper functions (e.g., `ELOG_API_GATEWAY_URL`)
- `domoService.js`: Specialized service for Domo integrations

### API Service Architecture
The API layer uses Axios with centralized configuration:
- **Base Configuration**: Common axios config with credentials, response types, and status validation
- **Headers**: Standardized headers including CSRF token and content-type
- **Error Handling**: Consistent error handling across all API calls
- **Gateway URL**: Centralized API gateway URL configuration

Example from `src/services/services.js`:
```javascript
const axioConfig = {
  withCredentials: true,
  responseType: "json",
  validateStatus: function (status) {
    return status < 500;
  },
};

const commonHeaders = {
  "X-CSRF-TOKEN": "",
  "content-type": "application/json",
};

export const getApi = async (params) => {
  const { endUrl } = params;
  const responseJson = await axios
    .get(`${ELOG_API_GATEWAY_URL}${endUrl}`, {
      ...axioConfig,
      headers: {
        ...commonHeaders,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e;
    });
  const data = await responseJson.data;
  return data === undefined ? null : data;
};
```

### Naming Conventions and Patterns
- **GET Operations**: `getApi()`, `fetchApi()`, `fetchTokenApi()`
- **Consistent Structure**: All API functions follow similar patterns for error handling and response processing
- **URL Management**: API endpoints are constructed using a base gateway URL with specific endpoint paths
- **Token Handling**: Specialized functions for token-based authentication

### Integration Patterns
API services are imported and used within:
- **Custom Hooks**: Business logic hooks that encapsulate API calls
- **Components**: Direct usage in components for simple data fetching
- **Redux Actions**: For global state management with API integration

The services layer maintains clean separation from UI logic, making testing and maintenance easier.

## 5. Hooks & State

Custom hooks are centralized in `src/hooks/` for business logic extraction, while state management uses both React Context and Redux.

### Custom Hooks (`src/hooks/`)
Contains 14+ custom hooks following the `use[Functionality]` naming convention:
- `useLocalStorage.js`: Local storage management with cross-tab sync
- `useDrawerToggle.js`: Drawer state management
- `useDomoEmbed.js`: Domo embedding functionality
- `useDropdownMenu.js`: Dropdown menu state management
- `useListSelectItem.js`: List item selection logic
- `useProgressValue.js`: Progress tracking
- `useScrollEvent.js`: Scroll event handling
- `useTabsChange.js`: Tab switching logic
- `useTask.js` & `useTaskList.js`: Task management
- `useToggle.js`: Generic toggle state
- `useViewPort.js`: Viewport detection

Example from `useLocalStorage.js`:
```javascript
export default function useLocalStorage(key, initialValue) {
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (key) {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      }
    }, false);
  }, []);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      let item = null;
      if (key) {
        item = window.localStorage.getItem(key);
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (key) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### React Context State (`src/states/`)
Context providers for application-wide state:
- `useAuthContext.jsx`: Authentication state with cookie-based session management
- `useLayoutContext.jsx`: Layout-related state management

Example from `useAuthContext.jsx`:
```javascript
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const saveSession = user => {
    setCookie(authSessionKey, JSON.stringify(user));
    setUser(user);
  };
  const removeSession = () => {
    deleteCookie(authSessionKey);
    setUser(undefined);
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: hasCookie(authSessionKey),
    saveSession,
    removeSession
  }}>
      {children}
    </AuthContext.Provider>;
}
```

### Redux State (`src/store/`)
Redux Toolkit implementation for global state:
- `reduxSlice.js`: Redux slice definitions
- `reducer.js`: Root reducer configuration
- `elogLoads.js`: Specific domain state (e.g., E-Log loads)

### State Management Patterns
- **Local State**: useState for component-specific state
- **Shared State**: React Context for feature-wide state (auth, layout)
- **Global State**: Redux for application-wide state management
- **Persistent State**: Custom hooks with localStorage integration
- **Server State**: API services integrated with hooks or Redux actions

The architecture provides clear separation between UI logic, business logic, and state management, promoting maintainability and testability.
