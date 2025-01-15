import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Spin } from 'antd';
import toast from 'react-hot-toast';
import { chatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const { Title } = Typography;

const GroupChatModal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = chatState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setGroupChatName('');
    setSearch('');
    setSelectedUsers([]);
    setSearchResult([]);
  };

  // Debounce utility to limit API calls
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

  // Debounced version of `handleSearch`
  const debouncedSearch = debounce(handleSearch, 500);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query); // Update the search state
    debouncedSearch(query); // Call debounced search function
  };

  const handleGroup = (usersToAdd) => {
    if (selectedUsers.find((u) => u._id === usersToAdd._id)) {
      toast.error('User already added');
      return;
    }

    setSelectedUsers([...selectedUsers, usersToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.post(
        `${url}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsModalOpen(false);
      toast.success('New Group Chat Created!');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to Create the Chat!'
      );
    }
  };

  return (
    <>
      {/* Trigger */}
      <div
        onClick={showModal}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {children}
      </div>

      {/* Modal */}
      <Modal
        title={<Title level={4}>Create Group Chat</Title>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='create' type='primary' onClick={handleSubmit}>
            Create Group Chat
          </Button>,
        ]}
      >
        <Form layout='vertical'>
          {/* Group Chat Name Input */}
          <Form.Item
            label='Group Chat Name'
            rules={[
              { required: true, message: 'Please enter a group chat name' },
            ]}
          >
            <Input
              placeholder='Enter group chat name'
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </Form.Item>

          {/* Search Users Input */}
          <Form.Item label='Add Users (e.g., John, Jane)'>
            <Input
              placeholder='Search users to add'
              value={search}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
        <div className='w-full flex flex-wrap'>
          {selectedUsers.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>

        {/* Render Search Results */}
        {loading ? (
          <Spin tip='Loading users...' size='small' />
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
        )}
      </Modal>
    </>
  );
};

export default GroupChatModal;
