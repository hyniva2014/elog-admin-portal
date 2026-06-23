import {
  MessageContainer,
  CurrentUserBubble,
  OtherUserBubble,
  CurrentChatTimestamp,
} from "./AlertCenterScreenCard.styles.jsx";

const ChatMessageItem = ({ messageItem }) => {
  const {
    message,
    fileName,
    fileUrl,
    time,
    isCurrentUser,
  } = messageItem;
  

  const content = (
    <>
      {message && <div>{message}</div>}

      {fileUrl && (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "underline",
            wordBreak: "break-word",
          }}
        >
          {fileName}
        </a>
      )}
    </>
  );

  if (isCurrentUser) {
    return (
      <MessageContainer $isCurrentUser>
        <CurrentUserBubble>
          {content}
        </CurrentUserBubble>

        <CurrentChatTimestamp $isCurrentUser>
          {time}
        </CurrentChatTimestamp>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer $isCurrentUser={false}>
      <OtherUserBubble>
        {content}
      </OtherUserBubble>

      <CurrentChatTimestamp>
        {time}
      </CurrentChatTimestamp>
    </MessageContainer>
  );
};

export default ChatMessageItem;