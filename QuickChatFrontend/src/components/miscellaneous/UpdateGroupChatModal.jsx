import React, { useState } from 'react';
import { Modal, Button, Form, Input, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { chatState } from '../../context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = chatState();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleRemove = async (userToRemove) => {
  //   if (
  //     selectedChat.groupAdmin._id !== user.id &&
  //     userToRemove._id !== user.id
  //   ) {
  //     toast.error('Only group admins can remove someone!');
  //     return;
  //   }
  //   try {
  //     setLoading(true);

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     };
  //     const url = 'http://localhost:3000';
  //     const { data } = await axios.put(
  //       `${url}/api/chat/groupremove`,
  //       {
  //         chatId: selectedChat._id,
  //         userId: userToRemove._id,
  //       },
  //       config
  //     );

  //     userToRemove._id === user.id ? setSelectedChat() : setSelectedChat(data);
  //     setFetchAgain(!fetchAgain);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Error Occured!');
  //     setLoading(false);
  //   }
  // };
  const handleRemove = async (userToRemove) => {
    // Handle "Leave Group" scenario for the current user
    const isCurrentUser =
      userToRemove._id === user.id || userToRemove.id === user.id;

    // Ensure only group admins or the user themselves can perform this action
    if (!isCurrentUser && selectedChat.groupAdmin._id !== user.id) {
      toast.error('Only group admins can remove someone!');
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.put(
        `${url}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id || userToRemove.id, // Handle both _id and id
        },
        config
      );

      // If the current user leaves, clear the selected chat
      if (isCurrentUser) {
        setSelectedChat(null);
      } else {
        setSelectedChat(data); // Update the group after removing another user
      }

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
      toast.success(
        isCurrentUser
          ? 'You have left the group.'
          : 'User removed successfully.'
      );
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error Occurred!');
      setLoading(false);
    }
  };

  // const handleAdd = async (usersToAdd) => {
  //   if (selectedChat.users.find((u) => u._id === usersToAdd._id)) {
  //     toast.error('User already added');
  //     return;
  //   }

  //   if (
  //     selectedChat.groupAdmin._id !== user._id ||
  //     selectedChat.groupAdmin._id !== user.id
  //   ) {
  //     toast.error('Only group admins can add someone!');
  //     return;
  //   }
  //   try {
  //     setLoading(true);

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     };
  //     const url = 'http://localhost:3000';
  //     const { data } = await axios.put(
  //       `${url}/api/chat/groupadd`,
  //       {
  //         chatId: selectedChat._id,
  //         userId: usersToAdd._id,
  //       },
  //       config
  //     );

  //     setSelectedChat(data);
  //     setFetchAgain(!fetchAgain);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'User Already in group!');
  //   }
  // };
  const handleAdd = async (usersToAdd) => {
    if (selectedChat.users.find((u) => u._id === usersToAdd._id)) {
      toast.error('User already added');
      return;
    }

    if (selectedChat.groupAdmin._id !== user.id) {
      toast.error('Only group admins can add someone!');
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.put(
        `${url}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: usersToAdd._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'User Already in group!');
    }
  };

  const HandleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.put(
        `${url}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error Occured');
      setRenameLoading(false);
    }
    setGroupChatName('');
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResult([]); // Clear results if the input is empty
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.get(
        `${url}/api/user?search=${encodeURIComponent(query.trim())}`,
        config
      );

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || 'Failed to load search results'
      );
    }
  };
  const debouncedSearch = debounce(handleSearch, 500);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query); // Update the search state
    debouncedSearch(query); // Call debounced search function
  };

  return (
    <>
      <Button icon={<EyeOutlined />} onClick={openModal} />
      <Modal
        title={<div className='text-center'>{selectedChat.chatName}</div>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key='close' onClick={() => handleRemove({ id: user.id })}>
            Leave Group
          </Button>,
        ]}
      >
        {selectedChat.users.map((u) => (
          <UserBadgeItem
            key={user._id}
            user={u}
            handleFunction={() => handleRemove(u)}
          />
        ))}
        <Form layout='vertical'>
          <Form.Item>
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Chat Name'
                value={groupChatName}
                className='mb-3 flex-1'
                onChange={(e) => setGroupChatName(e.target.value)}
              ></Input>
              <Button
                type='primary'
                loading={renameLoading}
                onClick={HandleRename}
                className='bg-teal-500 hover:bg-teal-600 text-white ml-1 px-4 py-2 rounded'
              >
                Update
              </Button>
            </div>
          </Form.Item>

          <Form.Item label='Add Users (e.g., John, Jane)'>
            <Input
              placeholder='Search users to add'
              value={search}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
        {loading ? (
          <Spin tip='Loading users...' size='small' />
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAdd(user)}
              />
            ))
        )}
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
