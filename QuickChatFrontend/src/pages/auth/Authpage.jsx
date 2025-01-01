// import React, { useState } from 'react';
// import Login from './Login';
// import Signup from './Signup';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

//   const toggleForm = () => setIsLogin((prev) => !prev);

//   return (
//     <div className='h-screen bg-gray-50 flex items-center justify-center'>
//       <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
//         <h2 className='text-2xl font-bold text-gray-800 text-center mb-4'>
//           {isLogin ? 'Welcome Back' : 'Create an Account'}
//         </h2>
//         <p className='text-sm text-gray-600 text-center mb-6'>
//           {isLogin
//             ? 'Log in to access your account.'
//             : 'Sign up to create a new account.'}
//         </p>
//         {isLogin ? <Login /> : <Signup />}
//         <div className='text-sm text-center mt-6'>
//           {isLogin ? (
//             <>
//               Don't have an account?{' '}
//               <button
//                 onClick={toggleForm}
//                 className='text-blue-600 underline focus:outline-none'
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button
//                 onClick={toggleForm}
//                 className='text-blue-600 underline focus:outline-none'
//               >
//                 Log in
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

//-------------------------------------------//

// import React, { useState } from 'react';
// import Login from './Login';
// import Signup from './Signup';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

//   return (
//     <div className='h-screen flex justify-center items-center bg-gray-50'>
//       <div className='flex flex-col items-center'>
//         {isLogin ? (
//           <>
//             <Login />
//             <p className='text-center text-sm mt-4'>
//               Don&apos;t have an account?{' '}
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className='text-blue-600 underline'
//               >
//                 Sign up
//               </button>
//             </p>
//           </>
//         ) : (
//           <>
//             <Signup />
//             <p className='text-center text-sm mt-4'>
//               Already have an account?{' '}
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className='text-blue-600 underline'
//               >
//                 Log in
//               </button>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

//-------------------------------------------//

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='w-[28rem] bg-white p-6 shadow-lg rounded-lg'>
        {isLogin ? (
          <>
            <Login />
            <p className='text-center text-sm mt-4'>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className='text-blue-600 underline font-medium hover:text-blue-800'
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup />
            <p className='text-center text-sm mt-4'>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className='text-blue-600 underline font-medium hover:text-blue-800'
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
