import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { socket } = useSocket();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on('newMessage', (message) => {
        if (message.sender._id === selectedUser?._id) {
          setMessages(prev => [...prev, message]);
          // Mark as read
          socket.emit('markAsRead', { 
            messageId: message._id, 
            userId: message.sender._id 
          });
        }
      });

      socket.on('messageSent', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('userTyping', (data) => {
        // Handle typing indicators
        console.log('User typing:', data);
      });

      return () => {
        socket.off('newMessage');
        socket.off('messageSent');
        socket.off('userTyping');
      };
    }
  }, [socket, selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`/api/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = (content) => {
    if (socket && selectedUser && content.trim()) {
      socket.emit('sendMessage', {
        senderId: user.id,
        receiverId: selectedUser._id,
        content: content.trim()
      });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket && selectedUser) {
      if (isTyping) {
        socket.emit('typingStart', {
          senderId: user.id,
          receiverId: selectedUser._id
        });
        
        // Clear existing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        
        // Set new timeout to stop typing indicator
        typingTimeoutRef.current = setTimeout(() => {
          socket.emit('typingStop', {
            senderId: user.id,
            receiverId: selectedUser._id
          });
        }, 1000);
      } else {
        socket.emit('typingStop', {
          senderId: user.id,
          receiverId: selectedUser._id
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
         <div className="app-brand">
            <Logo showText={true} size="small" />
         </div>
          <h2>LetsChat</h2>
          <div className="user-profile">
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
        <UserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          currentUser={user}
        />
      </div>
      
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <div className={`status-dot ${selectedUser.isOnline ? 'online' : 'offline'}`} />
                <span>{selectedUser.username}</span>
              </div>
            </div>
            
            <MessageList messages={messages} currentUser={user} />
            
            <MessageInput 
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              disabled={!selectedUser}
            />
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Select a user to start chatting</h3>
            <p>Choose from the online users list to begin your conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;