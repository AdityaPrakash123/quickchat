import asyncHandler from 'express-async-handler';
import Message from '../server/models/message.js';
import User from '../server/models/user.js';
import Chat from '../server/models/chatStructure.js';

// route to send messages, group and one on one
export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  // Check for invalid data
  if (!content || !chatId) {
    return res
      .status(400)
      .json({ message: 'Invalid data passed into request' });
  }

  try {
    // Create the new message object
    let newMessage = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    // Find the newly created message and populate the necessary fields
    newMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name pic')
      .populate('chat');

    // Populate the users in the chat field
    const message = await User.populate(newMessage, {
      path: 'chat.users',
      select: 'name pic email',
    });

    // Update the chat's latest message
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    // Return the newly created message
    return res.status(201).json(message);
  } catch (error) {
    // Handle errors appropriately
    return res
      .status(500)
      .json({ message: 'Failed to send message', error: error.message });
  }
});

// route to get all the messages for a particular chat
export const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    throw new Error(error.message);
  }
});
