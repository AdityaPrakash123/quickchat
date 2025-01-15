import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className='px-2 py-1 rounded-lg m-1 mb-2 bg-purple-500 text-white text-xs cursor-pointer inline-flex items-center'
      onClick={handleFunction}
    >
      {user.name}
      <CloseOutlined className='pl-1' />
    </div>
  );
};

export default UserBadgeItem;
