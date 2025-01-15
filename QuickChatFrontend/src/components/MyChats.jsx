import React, { useEffect, useState } from 'react';
import { chatState } from '../context/ChatProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { getSender } from '../config/ChatLogic';

const { Text } = Typography;

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();
  const [loading, setLoading] = useState(true); // Added state to track loading

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
      setLoading(false); // Mark loading as complete
    } catch (error) {
      setLoading(false); // Ensure loading stops on error
      toast.error(error.response?.data?.message || 'Failed to Load the chats');
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

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
        {loading ? ( // Show ChatLoading if still fetching
          <ChatLoading />
        ) : chats?.length > 0 ? ( // Ensure chats is not empty or undefined
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
          <div className='text-center text-gray-500'>No chats available</div> // Display fallback for empty chats
        )}
      </div>
    </div>
  );
};

export default MyChats;
