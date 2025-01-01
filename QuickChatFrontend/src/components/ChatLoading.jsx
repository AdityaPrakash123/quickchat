// import React from 'react';
// import { Skeleton, Space } from 'antd';

// const ChatLoading = () => {
//   return (
//     <Space direction='vertical' size='middle' style={{ width: '100%' }}>
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//       <Skeleton.Input active />
//     </Space>
//   );
// };

// export default ChatLoading;

import React from 'react';
import { Skeleton, Space } from 'antd';

const ChatLoading = () => {
  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className='flex items-center gap-4'>
          <Skeleton.Avatar active size='large' />
          <Skeleton.Input active size='small' style={{ width: '200px' }} />
        </div>
      ))}
    </Space>
  );
};

export default ChatLoading;
