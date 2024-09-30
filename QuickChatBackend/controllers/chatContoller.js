import asyncHandler from 'express-async-handler';
import Chat from '../server/models/chatStructure.js';
import User from '../server/models/user.js';

export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('UserId param not sent with request');
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name profilePic email',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }
  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users',
      '-password'
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Function to fetch chat data for a logged-in user
export const fetchCatchs = asyncHandler(async (req, res) => {
  try {
    // Find all chats where the current user is a participant (matched by user ID)
    // Populate the 'users' field without the password, as well as 'groupAdmin' and 'latestMessage'
    // Sort chats by the 'updatedAt' field in descending order (most recent first)
    let results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password') // Populate users, excluding the password field
      .populate('groupAdmin', '-password') // Populate groupAdmin, excluding the password field
      .populate('latestMessage') // Populate the latestMessage object
      .sort({ updatedAt: -1 }); // Sort by updatedAt, descending

    // Further populate the 'latestMessage.sender' field with the sender's name, profile picture, and email
    results = await User.populate(results, {
      path: 'latestMessage.sender', // Populate the sender of the latest message
      select: 'name pic email', // Only include the name, profile picture, and email of the sender
    });

    // Send the populated chat results back to the client
    res.status(200).send(results);
  } catch (error) {
    // Handle any errors by sending a 400 status and throwing the error message
    res.status(400);
    throw new Error(error.message);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  const { users, name } = req.body; // Destructure request body to get 'users' and 'name'

  // Check if 'users' and 'name' fields are provided
  if (!users || !name) {
    return res.status(400).json({ message: 'Please fill all the fields' }); // Send an error if fields are missing
  }

  // Parse users from the request body (assuming it's sent as a JSON string)
  const parsedUsers = JSON.parse(users);

  // Ensure the group has at least 2 users
  if (parsedUsers.length < 2) {
    return res
      .status(400)
      .json({ message: 'More than 2 users are required to form a group chat' }); // Send an error if not enough users
  }

  // Add the requesting user to the group
  parsedUsers.push(req.user);

  try {
    // Create a new group chat with the provided details
    const groupChat = await Chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user, // Set the group admin as the user making the request
    });

    // Populate the group chat with user details and admin (excluding passwords)
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password') // Populate 'users' excluding their passwords
      .populate('groupAdmin', '-password'); // Populate 'groupAdmin' excluding their password

    // Send the fully populated group chat as the response
    res.status(200).json(fullGroupChat);
  } catch (error) {
    // Return an error response with the message if something goes wrong
    res.status(400).json({ message: error.message });
  }
});

export const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName, // this can also be represented as {chatName: chatName}, but is one because they are the same
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) {
    res.status(404);
    throw new Error('Chat Not Found');
  } else {
    res.json(updatedChat);
  }
});

// only group admins can make this request
export const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // find the chat
  const chat = await Chat.findById(chatId);

  // Check if the user making the request is the group admin
  if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only group admins can add users' });
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!removed) {
    res.status(404);
    throw new Error('Chat Not Found');
  } else {
    res.json(removed);
  }
});

// only group admins can make this request
export const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // find the chat
  const chat = await Chat.findById(chatId);

  // Check if the user making the request is the group admin
  if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only group admins can add users' });
  }

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!added) {
    res.status(404);
    throw new Error('Chat Not Found');
  } else {
    res.json(added);
  }
});
