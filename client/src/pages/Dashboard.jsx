import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashProducts from '../components/DashProducts';
import DashUsers from '../components/DashUsers';
import { useLocation } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';

export default function Dashboard() {
  const [tab, setTab] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setTab(tab);
    }
  }, [location.search]);
  console.log(tab);


  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <div className='flex-1 items-center'>
        {tab === 'products' && <DashProducts/>}
        {tab === 'users' && <DashUsers/>}
        {tab === 'create-product' && <CreateProduct/>}
        {tab === 'edit-product' && <EditProduct/>}
      </div>
    </div>
  )
}
