import { useEffect, useState } from 'react'
import CartProductCard from '../components/CartProductCard';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/cart`) ; 
        if (!response.ok) {
          throw new Error('Failed to fetch cartItems');
        }
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [])

  const onDelete = async (cartId) => {
    try {
      const res = await fetch(`/api/cart/delete/${cartId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartId));
      }
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <div>
      {loading ? 'Loading ...' : ''}
      {error ? <p>{error}</p> : ''}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {!loading && cartItems && cartItems.length > 0 ? (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Cart Products</h2>
            <div className='flex flex-wrap gap-4'>
              {cartItems.map((cart) => (
                <CartProductCard key={cart._id} cart={cart} onDelete={onDelete}/>
              ))}
            </div>
          </div>
        ) : 
          <p>Your cart is Empty !</p>
        }
      </div>
    </div>
  )
}
