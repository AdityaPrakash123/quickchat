// import React, { useState } from 'react';
// import { Modal, Avatar, Typography, Button, Spin } from 'antd';
// import { EyeOutlined } from '@ant-design/icons';

// const { Text } = Typography;

// const ProfileModal = ({ user, children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   const showModal = () => {
//     setIsModalOpen(true);

//     // Simulate an API call or delay (remove this in production)
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false after data is "fetched"
//     }, 1000); // Simulate a delay of 1 second
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setIsLoading(true); // Reset loading state for the next open
//   };

//   return (
//     <>
//       {/* Trigger: Either children or EyeOutlined icon */}
//       {children ? (
//         <span onClick={showModal}>{children}</span>
//       ) : (
//         <Button icon={<EyeOutlined />} type='text' onClick={showModal} />
//       )}

//       {/* Modal */}
//       <Modal
//         title={`${user?.name || 'User'}'s Profile`}
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={[
//           <Button key='close' onClick={handleCancel}>
//             Close
//           </Button>,
//         ]}
//       >
//         {/* Loading Spinner */}
//         {isLoading ? (
//           <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//             <Spin tip='Loading profile...' size='large' />
//           </div>
//         ) : (
//           <div style={{ textAlign: 'center' }}>
//             {/* Profile Picture */}
//             <Avatar size={100} src={user?.profilePic || undefined}>
//               {!user?.profilePic &&
//                 user?.name
//                   ?.split(' ')
//                   .map((part) => part.charAt(0).toUpperCase())
//                   .join('')}
//             </Avatar>

//             {/* User Details */}
//             <div style={{ marginTop: '1rem' }}>
//               <Text strong>Name:</Text> {user?.name || 'N/A'}
//             </div>
//             <div style={{ marginTop: '0.5rem' }}>
//               <Text strong>Email:</Text> {user?.email || 'N/A'}
//             </div>
//             <div style={{ marginTop: '0.5rem' }}>
//               <Text strong>Status:</Text> {user?.info?.status || 'Offline'}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default ProfileModal;

import React, { useState } from 'react';
import { Modal, Avatar, Typography, Button, Spin, Badge } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProfileModal = ({ user, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Trigger: Either children or EyeOutlined icon */}
      {children ? (
        <span onClick={showModal}>{children}</span>
      ) : (
        <Button icon={<EyeOutlined />} type='text' onClick={showModal} />
      )}

      {/* Modal */}
      <Modal
        title={`${user?.name || 'User'}'s Profile`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='close' onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {/* Show loading spinner if `user` data is not available */}
        {!user ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Spin tip='Loading profile...' size='large' />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {/* Profile Picture */}
            <Avatar size={100} src={user?.profilePic || undefined}>
              {!user?.profilePic &&
                user?.name
                  ?.split(' ')
                  .map((part) => part.charAt(0).toUpperCase())
                  .join('')}
            </Avatar>

            {/* User Details */}
            <div style={{ marginTop: '1rem' }}>
              <Text strong>Name:</Text> {user?.name || 'N/A'}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <Text strong>Email:</Text> {user?.email || 'N/A'}
            </div>
            <div
              style={{
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text strong>Status:</Text>
              <Badge
                status={user?.info?.status === 'online' ? 'success' : 'error'}
                text={user?.info?.status === 'online' ? 'Online' : 'Offline'}
                style={{ marginLeft: '0.5rem' }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProfileModal;
