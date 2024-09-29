import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Profile from './pages/Profile';
import EditProduct from './pages/EditProduct';
import Payment from './pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route element={<PrivateRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/edit-product/:productId' element={<EditProduct />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}
