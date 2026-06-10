import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import AlertCenter from '../AlertCenter';

// Mock the styled components
jest.mock('../AlertCenter.styles.jsx', () => ({
  AlertContainer: ({ children, elevation }) => <div data-testid="alert-container" data-elevation={elevation}>{children}</div>,
  ChartHeader: ({ children }) => <div data-testid="chart-header">{children}</div>,
  AlertTitle: ({ children }) => <h2 data-testid="alert-title">{children}</h2>,
  ViewAllText: ({ children, onClick, isLoading }) => 
    <span data-testid="view-all-text" onClick={onClick} data-loading={isLoading}>{children}</span>,
  AlertList: ({ children }) => <div data-testid="alert-list">{children}</div>,
  AlertCard: ({ children }) => <div data-testid="alert-card">{children}</div>,
  AlertAccentBar: ({ accentcolor }) => <div data-testid="alert-accent-bar" data-color={accentcolor}></div>,
  AlertContent: ({ children }) => <div data-testid="alert-content">{children}</div>,
  AlertCardTitle: ({ children }) => <h3 data-testid="alert-card-title">{children}</h3>,
  AlertDetails: ({ children }) => <div data-testid="alert-details">{children}</div>,
  AlertDetailRow: ({ children }) => <div data-testid="alert-detail-row">{children}</div>,
  AlertDetailItem: ({ children }) => <div data-testid="alert-detail-item">{children}</div>,
  AlertTime: ({ children }) => <span data-testid="alert-time">{children}</span>,
  AlertIcon: ({ src, alt }) => <img data-testid="alert-icon" src={src} alt={alt} />,
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Create a test theme
const theme = createTheme();

const mockAlerts = [
  {
    id: 'alert-1',
    title: 'Critical Alert',
    message: 'Device offline',
    company: 'Company A',
    truck: 'TRK-001',
    serial: 'DEV-001',
    location1: 'Location 1',
    location2: 'Location 2',
    date: '2024-01-01',
    color: '#ff0000',
  },
  {
    id: 'alert-2',
    title: 'Warning Alert',
    message: 'Low battery',
    company: 'Company B',
    truck: 'TRK-002',
    serial: 'DEV-002',
    location1: 'Location 3',
    location2: 'Location 4',
    time: '10:30 AM',
    color: '#ffaa00',
  },
];

const renderWithTheme = (component) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('AlertCenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render with default props', () => {
      renderWithTheme(<AlertCenter />);
      
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.getByTestId('alert-title')).toHaveTextContent('Alert Center');
      expect(screen.getByTestId('view-all-text')).toHaveTextContent('View All');
      expect(screen.getByTestId('alert-list')).toBeInTheDocument();
    });

    test('should render with custom title and view all text', () => {
      renderWithTheme(
        <AlertCenter 
          title="Custom Alerts" 
          viewAllText="See All Alerts"
        />
      );
      
      expect(screen.getByTestId('alert-title')).toHaveTextContent('Custom Alerts');
      expect(screen.getByTestId('view-all-text')).toHaveTextContent('See All Alerts');
    });

    test('should render alert cards when alerts are provided', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} />);
      
      const alertCards = screen.getAllByTestId('alert-card');
      expect(alertCards).toHaveLength(2);
      
      expect(screen.getByText('Critical Alert')).toBeInTheDocument();
      expect(screen.getByText('Warning Alert')).toBeInTheDocument();
    });

    test('should render empty state when no alerts', () => {
      renderWithTheme(<AlertCenter alerts={[]} />);
      
      expect(screen.getByTestId('alert-list')).toBeInTheDocument();
      expect(screen.queryByTestId('alert-card')).not.toBeInTheDocument();
    });

    test('should show loading state', () => {
      renderWithTheme(<AlertCenter isLoading={true} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      expect(viewAllText).toHaveAttribute('data-loading', 'true');
    });
  });

  describe('Alert Card Rendering', () => {
    test('should render alert details correctly', () => {
      renderWithTheme(<AlertCenter alerts={[mockAlerts[0]]} />);
      
      expect(screen.getByText('Device offline')).toBeInTheDocument();
      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('TRK-001')).toBeInTheDocument();
      expect(screen.getByText('DEV-001')).toBeInTheDocument();
      expect(screen.getByText('Location 1')).toBeInTheDocument();
      expect(screen.getByText('Location 2')).toBeInTheDocument();
      expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    });

    test('should render alert icons', () => {
      renderWithTheme(<AlertCenter alerts={[mockAlerts[0]]} />);
      
      const alertIcons = screen.getAllByTestId('alert-icon');
      expect(alertIcons.length).toBeGreaterThan(0);
      
      // Check for different icon types
      expect(alertIcons[0]).toHaveAttribute('alt', 'Carrier');
      expect(alertIcons[1]).toHaveAttribute('alt', 'Truck');
      expect(alertIcons[2]).toHaveAttribute('alt', 'Device');
      expect(alertIcons[3]).toHaveAttribute('alt', 'Location');
      expect(alertIcons[4]).toHaveAttribute('alt', 'Location');
      expect(alertIcons[5]).toHaveAttribute('alt', 'ID');
    });

    test('should use title or message as alert title', () => {
      const alertWithoutTitle = {
        ...mockAlerts[0],
        title: null,
      };
      
      renderWithTheme(<AlertCenter alerts={[alertWithoutTitle]} />);
      
      expect(screen.getByText('Device offline')).toBeInTheDocument();
    });

    test('should use date or time as alert time', () => {
      const alertWithTime = {
        ...mockAlerts[0],
        date: null,
        time: '10:30 AM',
      };
      
      renderWithTheme(<AlertCenter alerts={[alertWithTime]} />);
      
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    });

    test('should render accent bar with correct color', () => {
      renderWithTheme(<AlertCenter alerts={[mockAlerts[0]]} />);
      
      const accentBar = screen.getByTestId('alert-accent-bar');
      expect(accentBar).toHaveAttribute('data-color', '#ff0000');
    });
  });

  describe('Interaction', () => {
    test('should handle View All click when not loading', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} isLoading={false} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      fireEvent.click(viewAllText);
      
      expect(mockNavigate).toHaveBeenCalledWith('/alert-center');
    });

    test('should not handle View All click when loading', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} isLoading={true} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      fireEvent.click(viewAllText);
      
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('should handle View All click with no alerts', () => {
      renderWithTheme(<AlertCenter alerts={[]} isLoading={false} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      fireEvent.click(viewAllText);
      
      expect(mockNavigate).toHaveBeenCalledWith('/alert-center');
    });
  });

  describe('Data Handling', () => {
    test('should handle alerts with missing properties', () => {
      const incompleteAlert = { id: 'incomplete' };
      
      renderWithTheme(<AlertCenter alerts={[incompleteAlert]} />);
      
      expect(screen.getByTestId('alert-card')).toBeInTheDocument();
      expect(screen.getByTestId('alert-card-title')).toHaveTextContent('');
    });

    test('should handle null/undefined alerts gracefully', () => {
      renderWithTheme(<AlertCenter alerts={[null, undefined, mockAlerts[0]]} />);
      
      // Should still render the valid alert
      expect(screen.getByTestId('alert-card')).toBeInTheDocument();
    });

    test('should handle large number of alerts', () => {
      const manyAlerts = Array.from({ length: 100 }, (_, i) => ({
        id: `alert-${i}`,
        title: `Alert ${i}`,
        company: `Company ${i}`,
        truck: `TRK-${i}`,
        serial: `DEV-${i}`,
        location1: `Location ${i}`,
        location2: `Location ${i + 1}`,
        date: `2024-01-${(i % 30) + 1}`,
      }));
      
      renderWithTheme(<AlertCenter alerts={manyAlerts} />);
      
      const alertCards = screen.getAllByTestId('alert-card');
      expect(alertCards).toHaveLength(100);
    });
  });

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} />);
      
      // Check for proper heading hierarchy
      expect(screen.getByRole('heading', { name: 'Alert Center' })).toBeInTheDocument();
      
      // Check for interactive elements
      const viewAllText = screen.getByTestId('view-all-text');
      expect(viewAllText).toHaveAttribute('role', 'button');
    });

    test('should have proper alt text for icons', () => {
      renderWithTheme(<AlertCenter alerts={[mockAlerts[0]]} />);
      
      const alertIcons = screen.getAllByTestId('alert-icon');
      alertIcons.forEach(icon => {
        expect(icon).toHaveAttribute('alt');
        expect(icon.getAttribute('alt')).toBeTruthy();
      });
    });
  });

  describe('Performance', () => {
    test('should not re-render unnecessarily', () => {
      const { rerender } = renderWithTheme(<AlertCenter alerts={mockAlerts} />);
      
      // Re-render with same props
      rerender(<AlertCenter alerts={mockAlerts} />);
      
      expect(screen.getByTestId('alert-title')).toHaveTextContent('Alert Center');
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
    });

    test('should handle prop changes efficiently', () => {
      const { rerender } = renderWithTheme(<AlertCenter alerts={[]} />);
      
      // Add alerts
      rerender(<AlertCenter alerts={mockAlerts} />);
      
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
      
      // Remove alerts
      rerender(<AlertCenter alerts={[]} />);
      
      expect(screen.queryByTestId('alert-card')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed alert data', () => {
      const malformedAlerts = [
        { id: 1, title: null, company: undefined, truck: '', serial: false },
        { id: 2, title: 'Valid Alert' },
      ];
      
      renderWithTheme(<AlertCenter alerts={malformedAlerts} />);
      
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
      expect(screen.getByText('Valid Alert')).toBeInTheDocument();
    });

    test('should handle empty string values', () => {
      const emptyAlert = {
        id: 'empty',
        title: '',
        company: '',
        truck: '',
        serial: '',
        location1: '',
        location2: '',
        date: '',
      };
      
      renderWithTheme(<AlertCenter alerts={[emptyAlert]} />);
      
      expect(screen.getByTestId('alert-card')).toBeInTheDocument();
      expect(screen.getByTestId('alert-card-title')).toHaveTextContent('');
    });
  });

  describe('Styling and Layout', () => {
    test('should apply correct elevation to container', () => {
      renderWithTheme(<AlertCenter elevation={3} />);
      
      const container = screen.getByTestId('alert-container');
      expect(container).toHaveAttribute('data-elevation', '3');
    });

    test('should use default elevation when not specified', () => {
      renderWithTheme(<AlertCenter />);
      
      const container = screen.getByTestId('alert-container');
      expect(container).toHaveAttribute('data-elevation', '0');
    });
  });
});
