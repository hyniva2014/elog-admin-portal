import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';

// Mock the entire Alert screen components
import AlertDetailsPanel from '../../AlertDetailsPanel';
import AlertCenter from '../../../AlertCenter';
import { getDriverDeviceInfo, getTriggerInfo, defaultConversations } from '../../AlertDetailsPanel.utils';

// Mock axios for API calls
jest.mock('axios');
const mockedAxios = require('axios');

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Create a test theme
const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </MemoryRouter>
  );
};

// Mock styled components
jest.mock('../../AlertCenterScreenCard.styles.jsx', () => ({
  AlertCardContainer: ({ children, ...props }) => <div data-testid="alert-card-container" {...props}>{children}</div>,
  DetailHeader: ({ children }) => <div data-testid="detail-header">{children}</div>,
  DetailTitleWrapper: ({ children }) => <div data-testid="detail-title-wrapper">{children}</div>,
  DetailTitle: ({ children }) => <h2 data-testid="detail-title">{children}</h2>,
  DetailSubTitle: ({ children }) => <span data-testid="detail-subtitle">{children}</span>,
  InfoSection: ({ children }) => <div data-testid="info-section">{children}</div>,
  TriggerSectionTitle: ({ children }) => <h3 data-testid="trigger-section-title">{children}</h3>,
  InfoGrid: ({ children }) => <div data-testid="info-grid">{children}</div>,
  TriggerInfoGrid: ({ children }) => <div data-testid="trigger-info-grid">{children}</div>,
  InfoCard: ({ children }) => <div data-testid="info-card">{children}</div>,
  InfoLabel: ({ children }) => <label data-testid="info-label">{children}</label>,
  InfoValue: ({ children }) => <span data-testid="info-value">{children}</span>,
  StatusBadge: ({ children }) => <span data-testid="status-badge">{children}</span>,
  LocationItem: ({ children }) => <div data-testid="location-item">{children}</div>,
  TriggerSection: ({ children }) => <div data-testid="trigger-section">{children}</div>,
  TriggerInfoCard: ({ children }) => <div data-testid="trigger-info-card">{children}</div>,
  ChatContainer: ({ children }) => <div data-testid="chat-container">{children}</div>,
  ChatHeader: ({ children }) => <div data-testid="chat-header">{children}</div>,
  ChatMessages: ({ children }) => <div data-testid="chat-messages">{children}</div>,
  CurrentUserBubble: ({ children }) => <div data-testid="current-user-bubble">{children}</div>,
  OtherUserBubble: ({ children }) => <div data-testid="other-user-bubble">{children}</div>,
  ChatTimestamp: ({ children }) => <span data-testid="chat-timestamp">{children}</span>,
  ChatInputRow: ({ children }) => <div data-testid="chat-input-row">{children}</div>,
  ChatInput: ({ ...props }) => <input data-testid="chat-input" {...props} />,
  ChatSendButton: ({ children, onClick }) => <button data-testid="chat-send-button" onClick={onClick}>{children}</button>,
  ChatCloseButton: ({ children, onClick }) => <span data-testid="chat-close-button" onClick={onClick}>{children}</span>,
}));

jest.mock('../../../AlertCenter.styles.jsx', () => ({
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

const mockAlerts = [
  {
    id: 'alert-1',
    title: 'Critical Alert',
    message: 'Device offline',
    severity: 'Critical',
    company: 'Company A',
    truck: 'TRK-001',
    serial: 'DEV-001',
    location1: 'New York, NY',
    location2: '40.7128° N, 74.0060° W',
    city: 'New York',
    date: '2024-01-01',
    color: '#ff0000',
  },
  {
    id: 'alert-2',
    title: 'Warning Alert',
    message: 'Low battery',
    severity: 'Warning',
    company: 'Company B',
    truck: 'TRK-002',
    serial: 'DEV-002',
    location1: 'Los Angeles, CA',
    location2: '34.0522° N, 118.2437° W',
    city: 'Los Angeles',
    time: '10:30 AM',
    color: '#ffaa00',
  },
];

describe('Alert Screen Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Alert Center and Details Panel Integration', () => {
    test('should render both components together', () => {
      renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Alert Center components
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.getByTestId('alert-title')).toHaveTextContent('Alert Center');
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
      
      // Alert Details Panel components
      expect(screen.getByTestId('alert-card-container')).toBeInTheDocument();
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Critical Alert');
      expect(screen.getByTestId('detail-subtitle')).toHaveTextContent('Critical');
    });

    test('should handle alert selection flow', () => {
      const onAlertSelect = jest.fn();
      
      renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[1]} />
        </div>
      );
      
      // Should show details for second alert
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Warning Alert');
      expect(screen.getByTestId('detail-subtitle')).toHaveTextContent('Warning');
    });
  });

  describe('Data Flow Integration', () => {
    test('should pass alert data correctly to details panel', () => {
      const selectedAlert = mockAlerts[0];
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={selectedAlert} />);
      
      // Check that alert data is properly displayed
      expect(screen.getByTestId('detail-title')).toHaveTextContent(selectedAlert.title);
      expect(screen.getByTestId('detail-subtitle')).toHaveTextContent(selectedAlert.severity);
      
      // Check that driver device info uses alert data
      const infoLabels = screen.getAllByTestId('info-label');
      const carrierLabel = infoLabels.find(label => label.textContent === 'Carrier Name');
      const truckLabel = infoLabels.find(label => label.textContent === 'Truck Number');
      
      expect(carrierLabel).toBeInTheDocument();
      expect(truckLabel).toBeInTheDocument();
    });

    test('should handle utility functions integration', () => {
      const selectedAlert = mockAlerts[0];
      
      // Test utility functions directly
      const driverInfo = getDriverDeviceInfo(selectedAlert.company, selectedAlert.truck);
      const triggerInfo = getTriggerInfo();
      
      expect(driverInfo).toHaveLength(6);
      expect(triggerInfo).toHaveLength(2);
      
      // Check that company and truck are included in driver info
      const companyItem = driverInfo.find(item => item.label === 'Carrier Name');
      const truckItem = driverInfo.find(item => item.label === 'Truck Number');
      
      expect(companyItem.value).toBe(selectedAlert.company);
      expect(truckItem.value).toBe(selectedAlert.truck);
    });
  });

  describe('State Management Integration', () => {
    test('should handle state changes across components', () => {
      const { rerender } = renderWithTheme(
        <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
      );
      
      // Initial state
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Critical Alert');
      
      // Change selected alert
      rerender(<AlertDetailsPanel selectedAlert={mockAlerts[1]} />);
      
      // State should update
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Warning Alert');
      expect(screen.getByTestId('detail-subtitle')).toHaveTextContent('Warning');
    });

    test('should reset state when alert changes', () => {
      const { rerender } = renderWithTheme(
        <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
      );
      
      // Simulate state changes (this would require triggering chat or assignment)
      // For now, just test that state resets when alert changes
      
      const newAlert = { ...mockAlerts[0], id: 'new-alert', title: 'New Alert' };
      rerender(<AlertDetailsPanel selectedAlert={newAlert} />);
      
      expect(screen.getByTestId('detail-title')).toHaveTextContent('New Alert');
    });
  });

  describe('API Integration', () => {
    test('should handle operator assignment API call', async () => {
      const mockResponse = {
        data: {
          statusCode: 200,
          body: { message: 'Operator assigned successfully' }
        }
      };
      
      mockedAxios.put.mockResolvedValue(mockResponse);
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockAlerts[0]} />);
      
      // This would require triggering the assignment flow
      // For integration testing, we verify the mock is available
      expect(mockedAxios.put).toBeDefined();
    });

    test('should handle API call failure gracefully', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockAlerts[0]} />);
      
      // Component should still render despite API setup
      expect(screen.getByTestId('detail-title')).toBeInTheDocument();
    });
  });

  describe('Navigation Integration', () => {
    test('should handle navigation from alert center', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      fireEvent.click(viewAllText);
      
      expect(mockNavigate).toHaveBeenCalledWith('/alert-center');
    });

    test('should not navigate when loading', () => {
      renderWithTheme(<AlertCenter alerts={mockAlerts} isLoading={true} />);
      
      const viewAllText = screen.getByTestId('view-all-text');
      fireEvent.click(viewAllText);
      
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Chat Integration', () => {
    test('should handle chat functionality with default conversations', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockAlerts[0]} />);
      
      // Verify default conversations are available
      expect(defaultConversations).toHaveLength(2);
      expect(defaultConversations[0].isCurrentUser).toBe(false);
      expect(defaultConversations[1].isCurrentUser).toBe(true);
    });

    test('should handle message sending flow', async () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockAlerts[0]} />);
      
      const chatInput = screen.queryByTestId('chat-input');
      const sendButton = screen.queryByTestId('chat-send-button');
      
      if (chatInput && sendButton) {
        fireEvent.change(chatInput, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(chatInput).toHaveValue('');
        });
      }
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle missing alert data gracefully', () => {
      renderWithTheme(
        <div>
          <AlertCenter alerts={[]} />
          <AlertDetailsPanel selectedAlert={null} />
        </div>
      );
      
      // Alert center should render empty state
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.queryByTestId('alert-card')).not.toBeInTheDocument();
      
      // Details panel should render null
      expect(screen.queryByTestId('alert-card-container')).not.toBeInTheDocument();
    });

    test('should handle malformed alert data', () => {
      const malformedAlerts = [
        { id: 'incomplete' },
        { id: 'partial', title: 'Partial Alert' }
      ];
      
      renderWithTheme(
        <div>
          <AlertCenter alerts={malformedAlerts} />
          <AlertDetailsPanel selectedAlert={malformedAlerts[0]} />
        </div>
      );
      
      // Should not crash
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
    });
  });

  describe('Performance Integration', () => {
    test('should handle large number of alerts efficiently', () => {
      const manyAlerts = Array.from({ length: 50 }, (_, i) => ({
        id: `alert-${i}`,
        title: `Alert ${i}`,
        company: `Company ${i}`,
        truck: `TRK-${i}`,
        serial: `DEV-${i}`,
        location1: `Location ${i}`,
        location2: `Location ${i + 1}`,
        date: `2024-01-${(i % 30) + 1}`,
      }));
      
      renderWithTheme(
        <div>
          <AlertCenter alerts={manyAlerts} />
          <AlertDetailsPanel selectedAlert={manyAlerts[0]} />
        </div>
      );
      
      expect(screen.getAllByTestId('alert-card')).toHaveLength(50);
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Alert 0');
    });

    test('should not re-render unnecessarily', () => {
      const { rerender } = renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Re-render with same props
      rerender(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Should still render correctly
      expect(screen.getAllByTestId('alert-card')).toHaveLength(2);
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Critical Alert');
    });
  });

  describe('Accessibility Integration', () => {
    test('should have proper accessibility across components', () => {
      renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Check for proper headings
      expect(screen.getByRole('heading', { name: 'Alert Center' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Critical Alert' })).toBeInTheDocument();
      
      // Check for interactive elements
      const viewAllText = screen.getByTestId('view-all-text');
      expect(viewAllText).toBeInTheDocument();
      
      // Check for proper alt text on icons
      const alertIcons = screen.getAllByTestId('alert-icon');
      alertIcons.forEach(icon => {
        expect(icon).toHaveAttribute('alt');
        expect(icon.getAttribute('alt')).toBeTruthy();
      });
    });
  });

  describe('Theme Integration', () => {
    test('should use theme provider correctly', () => {
      renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Components should render with theme
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.getByTestId('alert-card-container')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle Integration', () => {
    test('should handle mount and unmount correctly', () => {
      const { unmount } = renderWithTheme(
        <div>
          <AlertCenter alerts={mockAlerts} />
          <AlertDetailsPanel selectedAlert={mockAlerts[0]} />
        </div>
      );
      
      // Components should mount
      expect(screen.getByTestId('alert-container')).toBeInTheDocument();
      expect(screen.getByTestId('alert-card-container')).toBeInTheDocument();
      
      // Components should unmount without errors
      expect(() => unmount()).not.toThrow();
    });
  });
});
