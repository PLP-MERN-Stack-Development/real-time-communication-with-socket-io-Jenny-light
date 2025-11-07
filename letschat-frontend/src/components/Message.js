import React from 'react';

const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${isOwn ? 'own-message' : 'other-message'}`}>
      {!isOwn && (
        <div className="message-sender">
          {message.sender.username}
        </div>
      )}
      <div className="message-content">
        <p>{message.content}</p>
        <span className="message-time">
          {formatTime(message.createdAt)}
          {isOwn && message.isRead && (
            <span className="read-receipt"> ✓✓</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Message;