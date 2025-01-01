import React, { useEffect } from 'react';
import { chatState } from '../context/ChatProvider';
import axios from 'axios';
import Sidedrawer from '../components/miscellaneous/Sidedrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';

const Chatpage = () => {
  const { user } = chatState();

  return (
    <div style={{ width: '100%' }}>
      {user && <Sidedrawer />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '91.5vh',
          padding: '1rem',
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default Chatpage;
