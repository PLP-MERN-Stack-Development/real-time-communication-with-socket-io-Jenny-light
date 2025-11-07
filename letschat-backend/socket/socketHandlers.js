const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (io, socket) => {
  console.log('User connected:', socket.id);

  // Join user to their personal room
  socket.on('join', async (userId) => {
    socket.join(userId);
    
    // Update user online status
    await User.findByIdAndUpdate(userId, { 
      isOnline: true,
      lastSeen: new Date()
    });
    
    // Notify all users about online status
    io.emit('userOnline', userId);
    
    console.log(`User ${userId} joined the chat`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    try {
      const { senderId, receiverId, content } = data;
      
      // Save message to database
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content
      });
      
      await message.save();
      
      // Populate sender info
      await message.populate('sender', 'username avatar');
      
      // Send to receiver
      io.to(receiverId).emit('newMessage', message);
      
      // Send back to sender for confirmation
      socket.emit('messageSent', message);
      
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('messageError', { error: 'Failed to send message' });
    }
  });

  // Handle typing indicators
  socket.on('typingStart', (data) => {
    socket.to(data.receiverId).emit('userTyping', {
      userId: data.senderId,
      isTyping: true
    });
  });

  socket.on('typingStop', (data) => {
    socket.to(data.receiverId).emit('userTyping', {
      userId: data.senderId,
      isTyping: false
    });
  });

  // Handle message read receipts
  socket.on('markAsRead', async (data) => {
    try {
      const { messageId, userId } = data;
      
      await Message.findByIdAndUpdate(messageId, {
        isRead: true,
        readAt: new Date()
      });
      
      // Notify sender that message was read
      io.to(userId).emit('messageRead', messageId);
      
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    
    // Note: In production, you'd want a more robust way to track online status
  });
};