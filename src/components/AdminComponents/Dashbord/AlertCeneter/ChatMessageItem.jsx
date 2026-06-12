import {
  MessageContainer,
  CurrentUserBubble,
  OtherUserBubble,
  CurrentChatTimestamp,
} from "./AlertCenterScreenCard.styles.jsx";

const ChatMessageItem = ({ messageItem }) => {
  const { message: msg, time, isCurrentUser } = messageItem;

  if (isCurrentUser) {
    return (
      <MessageContainer $isCurrentUser={isCurrentUser}>
        <CurrentUserBubble>{msg}</CurrentUserBubble>
        <CurrentChatTimestamp $isCurrentUser>{time}</CurrentChatTimestamp>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer $isCurrentUser={isCurrentUser}>
      <OtherUserBubble>{msg}</OtherUserBubble>
      <CurrentChatTimestamp>{time}</CurrentChatTimestamp>
    </MessageContainer>
  );
};

export default ChatMessageItem;
