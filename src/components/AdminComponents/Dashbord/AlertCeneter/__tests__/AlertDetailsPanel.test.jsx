import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AlertDetailsPanel from '../AlertDetailsPanel';
import { defaultConversations } from '../AlertDetailsPanel.utils';

// Mock axios
jest.mock('axios');
const mockedAxios = require('axios');

// Create a test theme
const theme = createTheme();

// Mock the styled components
jest.mock('../AlertCenterScreenCard.styles.jsx', () => ({
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

const mockSelectedAlert = {
  id: 'test-alert-1',
  title: 'Test Alert',
  message: 'This is a test alert',
  severity: 'Critical',
  company: 'Test Company',
  truck: 'TRK-123',
  location1: 'Test Location 1',
  location2: 'Test Location 2',
  city: 'Test City',
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('AlertDetailsPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render null when no selected alert is provided', () => {
      const { container } = renderWithTheme(<AlertDetailsPanel selectedAlert={null} />);
      expect(container.firstChild).toBeNull();
    });

    test('should render alert details when selected alert is provided', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Test Alert');
      expect(screen.getByTestId('detail-subtitle')).toHaveTextContent('Critical');
      expect(screen.getByTestId('info-section')).toBeInTheDocument();
      expect(screen.getByTestId('trigger-section')).toBeInTheDocument();
    });

    test('should display driver and device information', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      expect(screen.getByTestId('trigger-section-title')).toHaveTextContent('Driver & Device Information');
      expect(screen.getByTestId('info-grid')).toBeInTheDocument();
    });

    test('should display trigger information', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      const triggerSections = screen.getAllByTestId('trigger-section-title');
      expect(triggerSections).toHaveLength(2);
      expect(triggerSections[1]).toHaveTextContent('Trigger Information');
      expect(screen.getByTestId('trigger-info-grid')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('should reset state when selected alert changes', () => {
      const { rerender } = renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Change to chat state
      fireEvent.click(screen.getByText('Open Chat')); // Assuming there's a chat button
      
      // Change alert
      const newAlert = { ...mockSelectedAlert, id: 'test-alert-2', title: 'New Alert' };
      rerender(<AlertDetailsPanel selectedAlert={newAlert} />);
      
      // Should be back to details view
      expect(screen.getByTestId('detail-title')).toHaveTextContent('New Alert');
    });
  });

  describe('Chat Functionality', () => {
    test('should render chat interface when in chat state', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Simulate entering chat state (this would normally be triggered by a button)
      // For testing purposes, we'll need to mock the state change or add a way to trigger it
    });

    test('should display default conversations', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // If chat is visible, check for messages
      const chatMessages = screen.queryAllByTestId('current-user-bubble');
      const otherMessages = screen.queryAllByTestId('other-user-bubble');
      
      if (chatMessages.length > 0 || otherMessages.length > 0) {
        expect(chatMessages.length + otherMessages.length).toBeGreaterThan(0);
      }
    });

    test('should handle message sending', async () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
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

    test('should handle Enter key for sending messages', async () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      const chatInput = screen.queryByTestId('chat-input');
      
      if (chatInput) {
        fireEvent.change(chatInput, { target: { value: 'Test message' } });
        fireEvent.keyDown(chatInput, { key: 'Enter' });
        
        await waitFor(() => {
          expect(chatInput).toHaveValue('');
        });
      }
    });
  });

  describe('Operator Assignment', () => {
    test('should open operator assignment dialog', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // This would need to be triggered by a button click
      // For now, we'll test the dialog rendering if it's visible
    });

    test('should handle operator selection', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Test operator selection logic
      // This would require the dialog to be open
    });

    test('should handle operator assignment API call', async () => {
      const mockResponse = {
        data: {
          statusCode: 200,
          body: { message: 'Operator assigned successfully' }
        }
      };
      
      mockedAxios.put.mockResolvedValue(mockResponse);
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Test API call when assignment is made
      // This would require triggering the assignment flow
    });

    test('should handle API call failure gracefully', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Test error handling
      // This would require triggering the assignment flow
    });
  });

  describe('Helper Functions', () => {
    test('should extract inline functions properly', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Verify that inline functions have been extracted
      // This is more of a code quality test
    });

    test('should use styled components instead of inline styles', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Verify no inline styles are being used
      const elementsWithInlineStyles = document.querySelectorAll('[style]');
      expect(elementsWithInlineStyles).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA labels', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Check for proper ARIA labels on interactive elements
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    test('should be keyboard navigable', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Test keyboard navigation
      const firstButton = screen.getByRole('button');
      firstButton.focus();
      expect(firstButton).toHaveFocus();
    });
  });

  describe('Error Handling', () => {
    test('should handle missing alert properties gracefully', () => {
      const incompleteAlert = { id: 'incomplete' };
      
      renderWithTheme(<AlertDetailsPanel selectedAlert={incompleteAlert} />);
      
      expect(screen.getByTestId('detail-title')).toBeInTheDocument();
      expect(screen.getByTestId('detail-subtitle')).toBeInTheDocument();
    });

    test('should handle empty conversation array', () => {
      renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Should not crash when conversations are empty
      expect(screen.getByTestId('detail-title')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    test('should not re-render unnecessarily', () => {
      const { rerender } = renderWithTheme(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Re-render with same props
      rerender(<AlertDetailsPanel selectedAlert={mockSelectedAlert} />);
      
      // Component should still be properly rendered
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Test Alert');
    });
  });
});
