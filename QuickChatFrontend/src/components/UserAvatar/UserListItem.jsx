// import React from 'react';
// import { Avatar, Typography } from 'antd';

// const { Text } = Typography;

// const UserListItem = ({ user, handleFunction }) => {
//   return (
//     <div
//       onClick={handleFunction}
//       className='cursor-pointer bg-[#E8E8E8] hover:bg-[#38B2AC] hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg'
//     >
//       <Avatar size='small' src={user?.profilePic || undefined}>
//         {/* Fallback to initials if profilePic is null */}
//         {user?.profilePic
//           ? null
//           : user?.name
//               ?.split(' ')
//               .map((part) => part.charAt(0).toUpperCase())
//               .join('')}
//       </Avatar>
//       <div>
//         <Text>{user.name}</Text>
//         <Text>
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default UserListItem;

import React from 'react';
import { Avatar, Typography } from 'antd';

const { Text } = Typography;

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className='cursor-pointer flex items-center gap-4 bg-gray-100 hover:bg-blue-500 hover:text-white p-3 rounded-md transition'
    >
      <Avatar size='large' src={user?.profilePic || undefined}>
        {!user?.profilePic &&
          user?.name
            ?.split(' ')
            .map((part) => part.charAt(0).toUpperCase())
            .join('')}
      </Avatar>
      <div>
        <Text strong>{user?.name}</Text>
        <br />
        <Text type='secondary'>{user?.email}</Text>
      </div>
    </div>
  );
};

export default UserListItem;
