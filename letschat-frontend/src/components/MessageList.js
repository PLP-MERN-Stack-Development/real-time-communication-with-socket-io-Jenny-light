import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message 
          key={message._id} 
          message={message} 
          isOwn={message.sender._id === currentUser.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;