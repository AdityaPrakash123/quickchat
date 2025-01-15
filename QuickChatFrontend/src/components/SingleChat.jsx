import React, { useEffect, useState } from 'react';
import { chatState } from '../context/ChatProvider';
import { Button, Typography, Spin, Form, Input } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { getSender, getSenderFullInfo } from '../config/ChatLogic';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import toast from 'react-hot-toast';

const { Text } = Typography;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = chatState();

  // const sendMessage = async (event) => {
  //   if (event.key === 'Enter' && newMessage) {
  //     try {
  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${user?.token}`,
  //         },
  //       };
  //       setNewMessage('');
  //       const url = 'http://localhost:3000';
  //       const { data } = await axios.post(
  //         `${url}/api/message`,
  //         {
  //           content: newMessage,
  //           chatId: selectedChat._id,
  //         },
  //         config
  //       );

  //       setMessages([...messages, data]);
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || 'Error Occured!');
  //     }
  //   }
  // };
  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const url = 'http://localhost:3000';
        const { data } = await axios.post(
          `${url}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages((prevMessages) => [...prevMessages, data]); // Append the new message to the existing state
        setNewMessage('');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send message');
      }
    }
  };

  // const fetchMessages = async () => {
  //   if (!selectedChat) return;
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     };
  //     setLoading(true);
  //     const url = 'http://localhost:3000';
  //     const { data } = await axios.get(
  //       `${url}/api/message/${selectedChat._id}`,
  //       config
  //     );
  //     console.log('Fetched Messages:', data); // Debug here
  //     setMessages(data);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Error Occured!');
  //   }
  // };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      setLoading(true);
      const url = 'http://localhost:3000';
      const { data } = await axios.get(
        `${url}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data); // Update messages with the latest fetched data
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing indicator logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text className='text-[28px] md:text-[30px] pb-3 px-2 w-full flex justify-between items-center font-[Work-sans]'>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedChat('')}
              className='flex md:hidden'
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFullInfo(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <div className='flex flex-col justify-end p-3 bg-[#E8E8E8] w-full h-full rounded-lg overflow-y-hidden'>
            {loading ? (
              <Spin size='large' />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'scroll',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Form>
              <Form.Item>
                <div className='flex'>
                  <Input
                    onPressEnter={sendMessage}
                    placeholder='Enter a message..'
                    onChange={typingHandler}
                    value={newMessage}
                  ></Input>
                  <Button icon={<SendOutlined />} onClick={sendMessage} />
                </div>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <Text className='text-3xl pb-3 font-sans'>
            Click on user to start chatting
          </Text>
        </div>
      )}
    </>
  );
};

export default SingleChat;
