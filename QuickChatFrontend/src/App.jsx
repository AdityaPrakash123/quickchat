import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Authpage from './pages/auth/Authpage';
import Chatpage from './pages/Chatpage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <div className='bg-red-50 w-full'>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Authpage />} exact />
        <Route path='/chats' element={<Chatpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
