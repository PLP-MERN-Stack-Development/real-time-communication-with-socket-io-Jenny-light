import React from 'react';
import { useSocket } from '../context/SocketContext';

const UserList = ({ users, selectedUser, onSelectUser, currentUser }) => {
  const { onlineUsers } = useSocket();

  return (
    <div className="user-list">
      <h3>Online Users ({onlineUsers.length})</h3>
      {users
        .filter(user => user._id !== currentUser.id)
        .map(user => (
          <div
            key={user._id}
            className={`user-item ${selectedUser?._id === user._id ? 'selected' : ''} ${
              onlineUsers.includes(user._id) ? 'online' : 'offline'
            }`}
            onClick={() => onSelectUser(user)}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <div className="avatar-placeholder">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`status-dot ${onlineUsers.includes(user._id) ? 'online' : 'offline'}`} />
            </div>
            <div className="user-info">
              <span className="username">{user.username}</span>
              <span className="user-status">
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserList;