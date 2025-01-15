import React, { useEffect, useState } from 'react';
import { chatState } from '../context/ChatProvider';
import axios from 'axios';
import Sidedrawer from '../components/miscellaneous/Sidedrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';

const Chatpage = () => {
  const { user } = chatState();
  const [fetchAgain, setFetchAgain] = useState(false);

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
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chatpage;
