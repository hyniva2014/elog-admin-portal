import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import all styled components for testing
import {
  AlertsContainer,
  AlertCardContainer,
  AlertList,
  AlertCard,
  AlertContent,
  AlertDetails,
  DetailSection,
  AlertIdBadge,
  AlertAdminRole,
  BreadcrumbRow,
  BreadcrumbItem,
  BreadcrumbSeparator,
  AlertDescription,
  DetailHeader,
  DetailTitleWrapper,
  DetailTitle,
  DetailSubTitle,
  BadgeContainer,
  Badge,
  InfoSection,
  TriggerSection,
  SectionTitle,
  TriggerSectionTitle,
  InfoGrid,
  TriggerInfoGrid,
  InfoCard,
  TriggerInfoCard,
  InfoLabel,
  InfoValue,
  StatusBadge,
  AlertCardTitle,
  AlertDetailItem,
  AlertDetailRow,
  AlertIcon,
  DetailAlertIcon,
  AlertTime,
  ActionSection,
  ActionButton,
  LocationItem,
  CoordinateBadge,
  AlertTopRow,
  AlertRight,
  AlertStatus,
  AlertOpen,
  ELDTag,
  LocationRow,
  AlertScreenHeaderContainer,
  AlertSummaryCardBox,
  DateSection,
  DateText,
  DividerLine,
  MessageHeader,
  ConversationContainer,
  ConversationMessage,
  AvatarCircle,
  MessageBubble,
  MessageContent,
  Timestamp,
  RightAvatar,
  MessageText,
  ChatContainer,
  ChatHeader,
  ChatMessages,
  CurrentUserBubble,
  OtherUserBubble,
  ChatTimestamp,
  ChatInputRow,
  ChatInput,
  ChatSendButton,
} from '../AlertCenterScreenCard.styles';

// Create a test theme
const theme = createTheme();

const renderWithTheme = (Component) => {
  return render(
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  );
};

describe('AlertCenterScreenCard.styles', () => {
  describe('Container Components', () => {
    test('AlertsContainer should render correctly', () => {
      renderWithTheme(() => (
        <AlertsContainer>
          <div data-testid="test-content">Test Content</div>
        </AlertsContainer>
      ));
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    test('AlertCardContainer should render with props', () => {
      renderWithTheme(() => (
        <AlertCardContainer detailsPanel chatPanel>
          <div data-testid="card-content">Card Content</div>
        </AlertCardContainer>
      ));
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    test('AlertList should render children', () => {
      renderWithTheme(() => (
        <AlertList>
          <div data-testid="alert-item">Alert Item</div>
        </AlertList>
      ));
      
      expect(screen.getByTestId('alert-item')).toBeInTheDocument();
    });
  });

  describe('Card Components', () => {
    test('AlertCard should render with active prop', () => {
      renderWithTheme(() => (
        <AlertCard active>
          <div data-testid="card-content">Active Card</div>
        </AlertCard>
      ));
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    test('AlertContent should render children', () => {
      renderWithTheme(() => (
        <AlertContent>
          <div data-testid="content">Alert Content</div>
        </AlertContent>
      ));
      
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    test('AlertDetails should render children', () => {
      renderWithTheme(() => (
        <AlertDetails>
          <div data-testid="details">Alert Details</div>
        </AlertDetails>
      ));
      
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });
  });

  describe('Typography Components', () => {
    test('DetailTitle should render text', () => {
      renderWithTheme(() => (
        <DetailTitle>Alert Title</DetailTitle>
      ));
      
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    test('DetailSubTitle should render with severity prop', () => {
      renderWithTheme(() => (
        <DetailSubTitle severity="Critical">Critical Alert</DetailSubTitle>
      ));
      
      expect(screen.getByText('Critical Alert')).toBeInTheDocument();
    });

    test('AlertCardTitle should render title', () => {
      renderWithTheme(() => (
        <AlertCardTitle>Card Title</AlertCardTitle>
      ));
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    test('AlertTime should render time', () => {
      renderWithTheme(() => (
        <AlertTime>10:30 AM</AlertTime>
      ));
      
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    });

    test('InfoLabel should render label', () => {
      renderWithTheme(() => (
        <InfoLabel>Driver Name:</InfoLabel>
      ));
      
      expect(screen.getByText('Driver Name:')).toBeInTheDocument();
    });

    test('InfoValue should render value', () => {
      renderWithTheme(() => (
        <InfoValue>John Doe</InfoValue>
      ));
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('TriggerSectionTitle should render section title', () => {
      renderWithTheme(() => (
        <TriggerSectionTitle>Trigger Information</TriggerSectionTitle>
      ));
      
      expect(screen.getByText('Trigger Information')).toBeInTheDocument();
    });
  });

  describe('Badge and Status Components', () => {
    test('AlertIdBadge should render badge content', () => {
      renderWithTheme(() => (
        <AlertIdBadge>ALERT-001</AlertIdBadge>
      ));
      
      expect(screen.getByText('ALERT-001')).toBeInTheDocument();
    });

    test('StatusBadge should render status', () => {
      renderWithTheme(() => (
        <StatusBadge>Active</StatusBadge>
      ));
      
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    test('Badge should render with variant prop', () => {
      renderWithTheme(() => (
        <Badge variant="critical">Critical</Badge>
      ));
      
      expect(screen.getByText('Critical')).toBeInTheDocument();
    });

    test('ELDTag should render tag content', () => {
      renderWithTheme(() => (
        <ELDTag>ELD Device</ELDTag>
      ));
      
      expect(screen.getByText('ELD Device')).toBeInTheDocument();
    });
  });

  describe('Grid Components', () => {
    test('InfoGrid should render grid items', () => {
      renderWithTheme(() => (
        <InfoGrid>
          <InfoCard>
            <InfoLabel>Label 1</InfoLabel>
            <InfoValue>Value 1</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Label 2</InfoLabel>
            <InfoValue>Value 2</InfoValue>
          </InfoCard>
        </InfoGrid>
      ));
      
      expect(screen.getAllByText(/Label \d/)).toHaveLength(2);
      expect(screen.getAllByText(/Value \d/)).toHaveLength(2);
    });

    test('TriggerInfoGrid should render trigger items', () => {
      renderWithTheme(() => (
        <TriggerInfoGrid>
          <TriggerInfoCard>
            <InfoLabel>Source</InfoLabel>
            <InfoValue>ELD Device</InfoValue>
          </TriggerInfoCard>
        </TriggerInfoGrid>
      ));
      
      expect(screen.getByText('Source')).toBeInTheDocument();
      expect(screen.getByText('ELD Device')).toBeInTheDocument();
    });
  });

  describe('Action Components', () => {
    test('ActionButton should render with different variants', () => {
      renderWithTheme(() => (
        <div>
          <ActionButton isResolve>Resolve</ActionButton>
          <ActionButton isOpenChat>Open Chat</ActionButton>
          <ActionButton isAssignOperator>Assign</ActionButton>
          <ActionButton>Acknowledge</ActionButton>
        </div>
      ));
      
      expect(screen.getByText('Resolve')).toBeInTheDocument();
      expect(screen.getByText('Open Chat')).toBeInTheDocument();
      expect(screen.getByText('Assign')).toBeInTheDocument();
      expect(screen.getByText('Acknowledge')).toBeInTheDocument();
    });
  });

  describe('Location Components', () => {
    test('LocationItem should render location content', () => {
      renderWithTheme(() => (
        <LocationItem>
          <CoordinateBadge>40.7128° N, 74.0060° W</CoordinateBadge>
        </LocationItem>
      ));
      
      expect(screen.getByText('40.7128° N, 74.0060° W')).toBeInTheDocument();
    });

    test('CoordinateBadge should render coordinates', () => {
      renderWithTheme(() => (
        <CoordinateBadge>40.7128° N, 74.0060° W</CoordinateBadge>
      ));
      
      expect(screen.getByText('40.7128° N, 74.0060° W')).toBeInTheDocument();
    });
  });

  describe('Icon Components', () => {
    test('AlertIcon should render with src', () => {
      renderWithTheme(() => (
        <AlertIcon src="/test-icon.png" alt="Test Icon" />
      ));
      
      const icon = screen.getByAltText('Test Icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/test-icon.png');
    });

    test('DetailAlertIcon should render with src', () => {
      renderWithTheme(() => (
        <DetailAlertIcon src="/detail-icon.png" alt="Detail Icon" />
      ));
      
      const icon = screen.getByAltText('Detail Icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/detail-icon.png');
    });
  });

  describe('Chat Components', () => {
    test('ChatContainer should render chat interface', () => {
      renderWithTheme(() => (
        <ChatContainer>
          <ChatHeader>Live Chat</ChatHeader>
          <ChatMessages>
            <CurrentUserBubble>Hello</CurrentUserBubble>
            <OtherUserBubble>Hi there!</OtherUserBubble>
          </ChatMessages>
          <ChatInputRow>
            <ChatInput placeholder="Type a message..." />
            <ChatSendButton>Send</ChatSendButton>
          </ChatInputRow>
        </ChatContainer>
      ));
      
      expect(screen.getByText('Live Chat')).toBeInTheDocument();
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
      expect(screen.getByText('Send')).toBeInTheDocument();
    });

    test('ChatInput should render with placeholder', () => {
      renderWithTheme(() => (
        <ChatInput placeholder="Type your message..." />
      ));
      
      const input = screen.getByPlaceholderText('Type your message...');
      expect(input).toBeInTheDocument();
    });

    test('ChatTimestamp should render timestamp', () => {
      renderWithTheme(() => (
        <ChatTimestamp>10:30 AM</ChatTimestamp>
      ));
      
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    });
  });

  describe('Message Components', () => {
    test('CurrentUserBubble should render message', () => {
      renderWithTheme(() => (
        <CurrentUserBubble>This is my message</CurrentUserBubble>
      ));
      
      expect(screen.getByText('This is my message')).toBeInTheDocument();
    });

    test('OtherUserBubble should render message', () => {
      renderWithTheme(() => (
        <OtherUserBubble>This is their message</OtherUserBubble>
      ));
      
      expect(screen.getByText('This is their message')).toBeInTheDocument();
    });
  });

  describe('Section Components', () => {
    test('InfoSection should render section content', () => {
      renderWithTheme(() => (
        <InfoSection>
          <TriggerSectionTitle>Information</TriggerSectionTitle>
          <InfoGrid>
            <InfoCard>
              <InfoLabel>Test Label</InfoLabel>
              <InfoValue>Test Value</InfoValue>
            </InfoCard>
          </InfoGrid>
        </InfoSection>
      ));
      
      expect(screen.getByText('Information')).toBeInTheDocument();
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    test('TriggerSection should render trigger content', () => {
      renderWithTheme(() => (
        <TriggerSection>
          <TriggerSectionTitle>Trigger Details</TriggerSectionTitle>
          <TriggerInfoGrid>
            <TriggerInfoCard>
              <InfoLabel>Event</InfoLabel>
              <InfoValue>Device Offline</InfoValue>
            </TriggerInfoCard>
          </TriggerInfoGrid>
        </TriggerSection>
      ));
      
      expect(screen.getByText('Trigger Details')).toBeInTheDocument();
      expect(screen.getByText('Event')).toBeInTheDocument();
      expect(screen.getByText('Device Offline')).toBeInTheDocument();
    });
  });

  describe('Utility Components', () => {
    test('DividerLine should render divider', () => {
      renderWithTheme(() => <DividerLine />);
      
      const divider = screen.getByRole('none'); // div elements have no role by default
      expect(divider).toBeInTheDocument();
    });

    test('DateSection should render date content', () => {
      renderWithTheme(() => (
        <DateSection>
          <DateText>January 1, 2024</DateText>
        </DateSection>
      ));
      
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
    });
  });

  describe('Breadcrumb Components', () => {
    test('BreadcrumbRow should render breadcrumb items', () => {
      renderWithTheme(() => (
        <BreadcrumbRow>
          <BreadcrumbItem isActive>Home</BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>Alerts</BreadcrumbItem>
        </BreadcrumbRow>
      ));
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('/')).toBeInTheDocument();
      expect(screen.getByText('Alerts')).toBeInTheDocument();
    });
  });

  describe('Export Validation', () => {
    test('should export all styled components', () => {
      // Test that all components are properly exported
      expect(typeof AlertsContainer).toBe('function');
      expect(typeof AlertCardContainer).toBe('function');
      expect(typeof AlertList).toBe('function');
      expect(typeof AlertCard).toBe('function');
      expect(typeof AlertContent).toBe('function');
      expect(typeof AlertDetails).toBe('function');
      expect(typeof DetailSection).toBe('function');
      expect(typeof AlertIdBadge).toBe('function');
      expect(typeof AlertAdminRole).toBe('function');
      expect(typeof BreadcrumbRow).toBe('function');
      expect(typeof BreadcrumbItem).toBe('function');
      expect(typeof BreadcrumbSeparator).toBe('function');
      expect(typeof AlertDescription).toBe('function');
      expect(typeof DetailHeader).toBe('function');
      expect(typeof DetailTitleWrapper).toBe('function');
      expect(typeof DetailTitle).toBe('function');
      expect(typeof DetailSubTitle).toBe('function');
      expect(typeof BadgeContainer).toBe('function');
      expect(typeof Badge).toBe('function');
      expect(typeof InfoSection).toBe('function');
      expect(typeof TriggerSection).toBe('function');
      expect(typeof SectionTitle).toBe('function');
      expect(typeof TriggerSectionTitle).toBe('function');
      expect(typeof InfoGrid).toBe('function');
      expect(typeof TriggerInfoGrid).toBe('function');
      expect(typeof InfoCard).toBe('function');
      expect(typeof TriggerInfoCard).toBe('function');
      expect(typeof InfoLabel).toBe('function');
      expect(typeof InfoValue).toBe('function');
      expect(typeof StatusBadge).toBe('function');
      expect(typeof AlertCardTitle).toBe('function');
      expect(typeof AlertDetailItem).toBe('function');
      expect(typeof AlertDetailRow).toBe('function');
      expect(typeof AlertIcon).toBe('function');
      expect(typeof DetailAlertIcon).toBe('function');
      expect(typeof AlertTime).toBe('function');
      expect(typeof ActionSection).toBe('function');
      expect(typeof ActionButton).toBe('function');
      expect(typeof LocationItem).toBe('function');
      expect(typeof CoordinateBadge).toBe('function');
      expect(typeof AlertTopRow).toBe('function');
      expect(typeof AlertRight).toBe('function');
      expect(typeof AlertStatus).toBe('function');
      expect(typeof AlertOpen).toBe('function');
      expect(typeof ELDTag).toBe('function');
      expect(typeof LocationRow).toBe('function');
      expect(typeof AlertScreenHeaderContainer).toBe('function');
      expect(typeof AlertSummaryCardBox).toBe('function');
      expect(typeof DateSection).toBe('function');
      expect(typeof DateText).toBe('function');
      expect(typeof DividerLine).toBe('function');
      expect(typeof MessageHeader).toBe('function');
      expect(typeof ConversationContainer).toBe('function');
      expect(typeof ConversationMessage).toBe('function');
      expect(typeof AvatarCircle).toBe('function');
      expect(typeof MessageBubble).toBe('function');
      expect(typeof MessageContent).toBe('function');
      expect(typeof Timestamp).toBe('function');
      expect(typeof RightAvatar).toBe('function');
      expect(typeof MessageText).toBe('function');
      expect(typeof ChatContainer).toBe('function');
      expect(typeof ChatHeader).toBe('function');
      expect(typeof ChatMessages).toBe('function');
      expect(typeof CurrentUserBubble).toBe('function');
      expect(typeof OtherUserBubble).toBe('function');
      expect(typeof ChatTimestamp).toBe('function');
      expect(typeof ChatInputRow).toBe('function');
      expect(typeof ChatInput).toBe('function');
      expect(typeof ChatSendButton).toBe('function');
    });
  });

  describe('Component Integration', () => {
    test('should work together in complex layouts', () => {
      renderWithTheme(() => (
        <AlertCardContainer detailsPanel>
          <DetailHeader>
            <DetailTitleWrapper>
              <DetailTitle>Test Alert</DetailTitle>
              <DetailSubTitle severity="Critical">Critical</DetailSubTitle>
            </DetailTitleWrapper>
          </DetailHeader>
          <InfoSection>
            <TriggerSectionTitle>Information</TriggerSectionTitle>
            <InfoGrid>
              <InfoCard>
                <InfoLabel>Driver</InfoLabel>
                <InfoValue>John Doe</InfoValue>
              </InfoCard>
            </InfoGrid>
          </InfoSection>
          <TriggerSection>
            <TriggerSectionTitle>Trigger Details</TriggerSectionTitle>
            <TriggerInfoGrid>
              <TriggerInfoCard>
                <InfoLabel>Event</InfoLabel>
                <InfoValue>Device Offline</InfoValue>
              </TriggerInfoCard>
            </TriggerInfoGrid>
          </TriggerSection>
        </AlertCardContainer>
      ));
      
      expect(screen.getByText('Test Alert')).toBeInTheDocument();
      expect(screen.getByText('Critical')).toBeInTheDocument();
      expect(screen.getByText('Information')).toBeInTheDocument();
      expect(screen.getByText('Driver')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Trigger Details')).toBeInTheDocument();
      expect(screen.getByText('Event')).toBeInTheDocument();
      expect(screen.getByText('Device Offline')).toBeInTheDocument();
    });
  });
});
