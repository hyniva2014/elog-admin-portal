import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import all styled components for testing
import {
  AlertContainer,
  ChartHeader,
  AlertTitle,
  ViewAllText,
  AlertList,
  AlertCard,
  AlertAccentBar,
  AlertContent,
  AlertDetails,
  AlertCardTitle,
  AlertDetailRow,
  AlertDetailItem,
  AlertTime,
  AlertIcon,
  HeaderContainer,
  HeaderLeft,
  ComplianceTitle,
  HeaderSubtitle,
  DateRangeText,
} from '../AlertCenter.styles';

// Create a test theme
const theme = createTheme();

const renderWithTheme = (Component) => {
  return render(
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  );
};

describe('AlertCenter.styles', () => {
  describe('Main Container Components', () => {
    test('AlertContainer should render correctly', () => {
      renderWithTheme(() => (
        <AlertContainer elevation={0}>
          <div data-testid="test-content">Alert Content</div>
        </AlertContainer>
      ));
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    test('ChartHeader should render header content', () => {
      renderWithTheme(() => (
        <ChartHeader>
          <AlertTitle>Alert Center</AlertTitle>
          <ViewAllText>View All</ViewAllText>
        </ChartHeader>
      ));
      
      expect(screen.getByText('Alert Center')).toBeInTheDocument();
      expect(screen.getByText('View All')).toBeInTheDocument();
    });

    test('AlertList should render list of alerts', () => {
      renderWithTheme(() => (
        <AlertList>
          <div data-testid="alert-item">Alert Item 1</div>
          <div data-testid="alert-item">Alert Item 2</div>
        </AlertList>
      ));
      
      const alertItems = screen.getAllByTestId('alert-item');
      expect(alertItems).toHaveLength(2);
      expect(alertItems[0]).toHaveTextContent('Alert Item 1');
      expect(alertItems[1]).toHaveTextContent('Alert Item 2');
    });
  });

  describe('Typography Components', () => {
    test('AlertTitle should render title text', () => {
      renderWithTheme(() => <AlertTitle>Alert Center</AlertTitle>);
      
      const title = screen.getByText('Alert Center');
      expect(title).toBeInTheDocument();
    });

    test('ViewAllText should render view all text', () => {
      renderWithTheme(() => <ViewAllText>View All Alerts</ViewAllText>);
      
      const viewAllText = screen.getByText('View All Alerts');
      expect(viewAllText).toBeInTheDocument();
    });

    test('AlertCardTitle should render card title', () => {
      renderWithTheme(() => <AlertCardTitle>Critical Alert</AlertCardTitle>);
      
      const cardTitle = screen.getByText('Critical Alert');
      expect(cardTitle).toBeInTheDocument();
    });

    test('AlertTime should render time information', () => {
      renderWithTheme(() => <AlertTime>10:30 AM</AlertTime>);
      
      const time = screen.getByText('10:30 AM');
      expect(time).toBeInTheDocument();
    });
  });

  describe('Card Components', () => {
    test('AlertCard should render card content', () => {
      renderWithTheme(() => (
        <AlertCard>
          <AlertContent>
            <AlertDetails>
              <AlertCardTitle>Test Alert</AlertCardTitle>
              <AlertDetailRow>
                <AlertDetailItem>
                  <AlertIcon src="/test-icon.png" alt="Test" />
                  Test Detail
                </AlertDetailItem>
              </AlertDetailRow>
              <AlertTime>10:30 AM</AlertTime>
            </AlertDetails>
          </AlertContent>
        </AlertCard>
      ));
      
      expect(screen.getByText('Test Alert')).toBeInTheDocument();
      expect(screen.getByText('Test Detail')).toBeInTheDocument();
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
      
      const icon = screen.getByAltText('Test');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/test-icon.png');
    });

    test('AlertAccentBar should render accent bar', () => {
      renderWithTheme(() => <AlertAccentBar accentcolor="#ff0000" />);
      
      const accentBar = screen.getByRole('none'); // div elements have no role by default
      expect(accentBar).toBeInTheDocument();
    });

    test('AlertContent should render content', () => {
      renderWithTheme(() => (
        <AlertContent>
          <div data-testid="content">Card Content</div>
        </AlertContent>
      ));
      
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    test('AlertDetails should render details', () => {
      renderWithTheme(() => (
        <AlertDetails>
          <div data-testid="details">Alert Details</div>
        </AlertDetails>
      ));
      
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });
  });

  describe('Detail Components', () => {
    test('AlertDetailRow should render detail row', () => {
      renderWithTheme(() => (
        <AlertDetailRow>
          <AlertDetailItem>Detail 1</AlertDetailItem>
          <AlertDetailItem>Detail 2</AlertDetailItem>
        </AlertDetailRow>
      ));
      
      expect(screen.getByText('Detail 1')).toBeInTheDocument();
      expect(screen.getByText('Detail 2')).toBeInTheDocument();
    });

    test('AlertDetailItem should render detail item', () => {
      renderWithTheme(() => (
        <AlertDetailItem>
          <AlertIcon src="/icon.png" alt="Icon" />
          Detail Text
        </AlertDetailItem>
      ));
      
      expect(screen.getByText('Detail Text')).toBeInTheDocument();
      expect(screen.getByAltText('Icon')).toBeInTheDocument();
    });

    test('AlertIcon should render icon with correct attributes', () => {
      renderWithTheme(() => <AlertIcon src="/test-icon.png" alt="Test Icon" />);
      
      const icon = screen.getByAltText('Test Icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/test-icon.png');
      expect(icon).toHaveAttribute('alt', 'Test Icon');
    });
  });

  describe('Header Components', () => {
    test('HeaderContainer should render header layout', () => {
      renderWithTheme(() => (
        <HeaderContainer>
          <HeaderLeft>
            <ComplianceTitle>Compliance Dashboard</ComplianceTitle>
            <HeaderSubtitle>Monitor your fleet compliance</HeaderSubtitle>
          </HeaderLeft>
          <DateRangeText>Jan 1 - Jan 31, 2024</DateRangeText>
        </HeaderContainer>
      ));
      
      expect(screen.getByText('Compliance Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Monitor your fleet compliance')).toBeInTheDocument();
      expect(screen.getByText('Jan 1 - Jan 31, 2024')).toBeInTheDocument();
    });

    test('HeaderLeft should render left header content', () => {
      renderWithTheme(() => (
        <HeaderLeft>
          <ComplianceTitle>Title</ComplianceTitle>
          <HeaderSubtitle>Subtitle</HeaderSubtitle>
        </HeaderLeft>
      ));
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    test('ComplianceTitle should render compliance title', () => {
      renderWithTheme(() => <ComplianceTitle>Fleet Compliance</ComplianceTitle>);
      
      expect(screen.getByText('Fleet Compliance')).toBeInTheDocument();
    });

    test('HeaderSubtitle should render header subtitle', () => {
      renderWithTheme(() => <HeaderSubtitle>Manage your alerts</HeaderSubtitle>);
      
      expect(screen.getByText('Manage your alerts')).toBeInTheDocument();
    });

    test('DateRangeText should render date range', () => {
      renderWithTheme(() => <DateRangeText>January 1-31, 2024</DateRangeText>);
      
      expect(screen.getByText('January 1-31, 2024')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    test('should work together in complete alert card', () => {
      renderWithTheme(() => (
        <AlertCard>
          <AlertAccentBar accentcolor="#ff0000" />
          <AlertContent>
            <AlertDetails>
              <AlertCardTitle>Device Offline Alert</AlertCardTitle>
              <AlertDetailRow>
                <AlertDetailItem>
                  <AlertIcon src="/truck-icon.png" alt="Truck" />
                  TRK-123
                </AlertDetailItem>
                <AlertDetailItem>
                  <AlertIcon src="/location-icon.png" alt="Location" />
                  New York, NY
                </AlertDetailItem>
              </AlertDetailRow>
              <AlertDetailRow>
                <AlertDetailItem>
                  <AlertIcon src="/device-icon.png" alt="Device" />
                  DEV-456
                </AlertDetailItem>
                <AlertDetailItem>
                  <AlertIcon src="/id-icon.png" alt="ID" />
                  ID-789
                </AlertDetailItem>
              </AlertDetailRow>
              <AlertTime>10:30 AM</AlertTime>
            </AlertDetails>
          </AlertContent>
        </AlertCard>
      ));
      
      expect(screen.getByText('Device Offline Alert')).toBeInTheDocument();
      expect(screen.getByText('TRK-123')).toBeInTheDocument();
      expect(screen.getByText('New York, NY')).toBeInTheDocument();
      expect(screen.getByText('DEV-456')).toBeInTheDocument();
      expect(screen.getByText('ID-789')).toBeInTheDocument();
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
      
      // Check all icons are rendered
      expect(screen.getByAltText('Truck')).toBeInTheDocument();
      expect(screen.getByAltText('Location')).toBeInTheDocument();
      expect(screen.getByAltText('Device')).toBeInTheDocument();
      expect(screen.getByAltText('ID')).toBeInTheDocument();
    });

    test('should work together in complete alert center', () => {
      renderWithTheme(() => (
        <AlertContainer elevation={0}>
          <ChartHeader>
            <AlertTitle>Alert Center</AlertTitle>
            <ViewAllText>View All</ViewAllText>
          </ChartHeader>
          <AlertList>
            <AlertCard>
              <AlertAccentBar accentcolor="#ff0000" />
              <AlertContent>
                <AlertDetails>
                  <AlertCardTitle>Critical Alert</AlertCardTitle>
                  <AlertDetailRow>
                    <AlertDetailItem>
                      <AlertIcon src="/company-icon.png" alt="Company" />
                      Company A
                    </AlertDetailItem>
                  </AlertDetailRow>
                  <AlertTime>10:30 AM</AlertTime>
                </AlertDetails>
              </AlertContent>
            </AlertCard>
            <AlertCard>
              <AlertAccentBar accentcolor="#ffaa00" />
              <AlertContent>
                <AlertDetails>
                  <AlertCardTitle>Warning Alert</AlertCardTitle>
                  <AlertDetailRow>
                    <AlertDetailItem>
                      <AlertIcon src="/company-icon.png" alt="Company" />
                      Company B
                    </AlertDetailItem>
                  </AlertDetailRow>
                  <AlertTime>11:45 AM</AlertTime>
                </AlertDetails>
              </AlertContent>
            </AlertCard>
          </AlertList>
        </AlertContainer>
      ));
      
      expect(screen.getByText('Alert Center')).toBeInTheDocument();
      expect(screen.getByText('View All')).toBeInTheDocument();
      expect(screen.getByText('Critical Alert')).toBeInTheDocument();
      expect(screen.getByText('Warning Alert')).toBeInTheDocument();
      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('Company B')).toBeInTheDocument();
      expect(screen.getAllByText('10:30 AM')).toHaveLength(1);
      expect(screen.getByText('11:45 AM')).toBeInTheDocument();
    });

    test('should work together in complete header', () => {
      renderWithTheme(() => (
        <HeaderContainer>
          <HeaderLeft>
            <ComplianceTitle>Fleet Management Dashboard</ComplianceTitle>
            <HeaderSubtitle>Real-time monitoring and alerts</HeaderSubtitle>
          </HeaderLeft>
          <DateRangeText>Last 30 days</DateRangeText>
        </HeaderContainer>
      ));
      
      expect(screen.getByText('Fleet Management Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Real-time monitoring and alerts')).toBeInTheDocument();
      expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    });
  });

  describe('Export Validation', () => {
    test('should export all styled components', () => {
      // Test that all components are properly exported and are functions
      expect(typeof AlertContainer).toBe('function');
      expect(typeof ChartHeader).toBe('function');
      expect(typeof AlertTitle).toBe('function');
      expect(typeof ViewAllText).toBe('function');
      expect(typeof AlertList).toBe('function');
      expect(typeof AlertCard).toBe('function');
      expect(typeof AlertAccentBar).toBe('function');
      expect(typeof AlertContent).toBe('function');
      expect(typeof AlertDetails).toBe('function');
      expect(typeof AlertCardTitle).toBe('function');
      expect(typeof AlertDetailRow).toBe('function');
      expect(typeof AlertDetailItem).toBe('function');
      expect(typeof AlertTime).toBe('function');
      expect(typeof AlertIcon).toBe('function');
      expect(typeof HeaderContainer).toBe('function');
      expect(typeof HeaderLeft).toBe('function');
      expect(typeof ComplianceTitle).toBe('function');
      expect(typeof HeaderSubtitle).toBe('function');
      expect(typeof DateRangeText).toBe('function');
    });
  });

  describe('Props Handling', () => {
    test('should handle elevation prop on AlertContainer', () => {
      renderWithTheme(() => (
        <AlertContainer elevation={3}>
          <div data-testid="content">Content</div>
        </AlertContainer>
      ));
      
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    test('should handle accentcolor prop on AlertAccentBar', () => {
      renderWithTheme(() => <AlertAccentBar accentcolor="#00ff00" />);
      
      const accentBar = screen.getByRole('none');
      expect(accentBar).toBeInTheDocument();
    });

    test('should handle isLoading prop on ViewAllText', () => {
      renderWithTheme(() => <ViewAllText isLoading={true}>View All</ViewAllText>);
      
      expect(screen.getByText('View All')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      renderWithTheme(() => (
        <AlertContainer>
          <ChartHeader>
            <AlertTitle>Alert Center</AlertTitle>
            <ViewAllText>View All</ViewAllText>
          </ChartHeader>
          <AlertList>
            <AlertCard>
              <AlertContent>
                <AlertDetails>
                  <AlertCardTitle>Test Alert</AlertCardTitle>
                  <AlertTime>10:30 AM</AlertTime>
                </AlertDetails>
              </AlertContent>
            </AlertCard>
          </AlertList>
        </AlertContainer>
      ));
      
      // Check for proper heading structure
      expect(screen.getByRole('heading', { name: 'Alert Center' })).toBeInTheDocument();
      
      // Check for interactive elements
      const viewAllText = screen.getByText('View All');
      expect(viewAllText).toBeInTheDocument();
    });

    test('should have proper alt text for icons', () => {
      renderWithTheme(() => (
        <AlertCard>
          <AlertContent>
            <AlertDetails>
              <AlertDetailRow>
                <AlertDetailItem>
                  <AlertIcon src="/test-icon.png" alt="Test Icon" />
                  Test Content
                </AlertDetailItem>
              </AlertDetailRow>
            </AlertDetails>
          </AlertContent>
        </AlertCard>
      ));
      
      const icon = screen.getByAltText('Test Icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('alt', 'Test Icon');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing props gracefully', () => {
      renderWithTheme(() => (
        <AlertCard>
          <AlertContent>
            <AlertDetails>
              <AlertCardTitle />
              <AlertTime />
            </AlertDetails>
          </AlertContent>
        </AlertCard>
      ));
      
      // Should not crash with empty props
      expect(screen.getByRole('none')).toBeInTheDocument(); // AlertCard
    });

    test('should handle null/undefined children', () => {
      renderWithTheme(() => (
        <AlertContainer>
          {null}
          {undefined}
          <div data-testid="valid-child">Valid Child</div>
        </AlertContainer>
      ));
      
      expect(screen.getByTestId('valid-child')).toBeInTheDocument();
    });
  });
});
