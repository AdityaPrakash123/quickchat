import React from 'react';
import { chatState } from '../context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = chatState();

  return (
    <div
      className={`${
        selectedChat ? 'flex' : 'hidden'
      } md:flex items-center flex-col p-3 bg-white w-full md:w-[68%] rounded-lg border`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
