
import {FaSearch} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';
import { signOutFailure, signOutStart, signOutSuccess } from '../../redux/user/userSlice';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if(data.success === false){
        return
      }
      dispatch(signOutSuccess());
    } catch(err){
      console.log(err);
    }
  }
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={'/'}>
          <h1 className='text-sm sm:text-xl font-bold'>
            <span className='text-slate-700'>ABC</span>
            <span className='text-slate-900'>Product</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input 
            type="search" 
            placeholder="Search..." 
            className='bg-transparent  focus:outline-none w-24 sm:w-64'
          />
          <FaSearch/>
        </form>

        <ul className='flex gap-4 items-center justify-center'>
          <Link to={'/'}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>

          {/* <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>

          <Link to={'/dashboard'}>
            {currentUser?.isAdmin ? (
              <li className=' text-slate-700 hover:underline'> Dashboard </li>
            ) : <></>}
          </Link> */}

          {currentUser ? (
            <div className="flex items-center justify-center">
            <Dropdown
              className='w-40 bg-slate-300 text-slate-900 m-0 p-2 self-center'
              arrowIcon={false}
              inline
              label={
                <Avatar className='w-6 h-6' alt='user' img={currentUser.profilePicture} rounded /> 
              }
            >
              <Dropdown.Header>
                <span className='block text-xs'>@{currentUser.username}</span>
                <span className='block text-xs font-medium truncate'>
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              {/* <Link to={'/profile'}>
                <Dropdown.Item className="text-sm">Profile</Dropdown.Item> 
              </Link> */}
              {currentUser?.isAdmin && (
                <Link to={'/dashboard'}>
                  <Dropdown.Item className="text-sm">Dashboard</Dropdown.Item> 
                </Link>
              )}
              <Dropdown.Divider />
              <Dropdown.Item className="text-sm" onClick={handleSignOut}>Sign out</Dropdown.Item> 
              </Dropdown>
              </div>
          ) : (
            <Link to='/signin' className='text-slate-700'>
                Sign In
            </Link>
          )}


          <Link to={'/cart'}>
            <img
              src='https://up.yimg.com/ib/th?id=OIP.LtyHaOKKagzUfiWC8ndhywHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121'
              alt='Cart'
              className='w-8 h-8'
            />
          </Link>
        </ul>
      </div>
    </header>
  )
}