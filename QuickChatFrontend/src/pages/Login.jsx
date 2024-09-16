import React from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';

const Login = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='h-[27rem] w-[23rem] p-6 border-[.0625rem] rounded-xl flex flex-col'>
        <div>
          <h1 className='text-2xl font-semibold'>Login</h1>
          <p className='text-[#71717A] mt-[.375rem] mb-6'>
            Enter your email below to login your account
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label
              htmlFor='email'
              className='text-sm text-[#09090B] font-medium'
            >
              Email
            </label>
            <input
              className='h-10 border-[.0625rem] mt-2 px-3 py-2 rounded-[.5rem] text-[#71717A] text-sm'
              type='email'
              id='email'
              name='email'
              placeholder='m@example.com'
              required
            />
          </div>

          <div>
            <div className='flex justify-between'>
              <label
                htmlFor='password'
                className='text-sm text-[#09090B] font-medium'
              >
                Password
              </label>
              <a href='#' className='text-sm text-[#09090B] underline'>
                Forgot your password?
              </a>
            </div>
            <input
              className='h-10 border-[.0625rem] px-3 py-2 w-full mt-2 rounded-[.5rem]'
              type='password'
              id='password'
              name='password'
            />
          </div>
          <button className='border-[.0625rem] h-10 bg-[#18181B] text-white px-[1rem] py-[.5rem] rounded-[.5rem] text-sm font-medium'>
            Login
          </button>
          <button className='border-[.0625rem] h-10 bg-white text-[#09090B] px-[1rem] py-[.5rem] rounded-[.5rem] text-sm font-medium'>
            Login With Google
          </button>
        </div>

        <p className='text-center text-sm mt-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
