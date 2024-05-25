import React from 'react';
import { useLogoutMutation } from '../../redux/features/api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { logout } from '../../redux/features/slice/authSlice';

const Header: React.FC = () => {
    const [logoutApi] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
   async function logoutHandler(){
      try{
        const res = await logoutApi({}).unwrap();
        if (res) {
          toast.info("logout successfully");
            dispatch(logout());
          navigate('/login');
        }
      }catch(err){
        toast.info("something went wrong")
      }

    }
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Password Generator</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
          onClick={logoutHandler}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Header;
