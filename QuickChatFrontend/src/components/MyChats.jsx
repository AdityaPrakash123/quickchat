import React, { useEffect } from 'react';
import { chatState } from '../context/ChatProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { getSender } from '../config/ChatLogic';

const { Text } = Typography;

const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const url = 'http://localhost:3000';
      const { data } = await axios.get(`${url}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to Load the chats');
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      className={`${
        selectedChat ? 'hidden md:flex' : 'flex'
      } flex-col items-center p-3 bg-white border border-gray-300 rounded-lg w-full md:w-1/3`}
    >
      <div className='flex w-full justify-between items-center pb-3 px-3 text-2xl md:text-3xl font-sans'>
        My Chats
        <GroupChatModal>
          <Button
            icon={<PlusOutlined />}
            style={{
              display: 'flex',
              fontSize: '17px',
            }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </div>
      <div className='flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-y-hidden'>
        {chats ? (
          <Space direction='vertical' className='w-full'>
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`${
                  selectedChat === chat
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-black'
                } px-3 py-2 rounded-lg cursor-pointer`}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
              </div>
            ))}
          </Space>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
