import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className='border-2 border-slate-300'>
      <ul className='w-full h-full md:w-56 bg-slate-200 flex flex-col gap-4 items-center p-3'>
        {currentUser?.isAdmin &&
          <>
            <Link to={'/dashboard?tab=products'}>
              <li 
                className='bg-slate-400 p-3 rounded-lg font-semibold'
              >Products
              </li>
            </Link>

            <Link to={'/dashboard?tab=users'}>
              <li 
                className='bg-slate-400 p-3 rounded-lg font-semibold'
              >Users
              </li>
            </Link>
          </>
        }
      </ul>
    </div>
  )
}
