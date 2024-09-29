import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if(data.success === false){
          setError(data.message);
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
      } catch(err){
        console.error(err);
        setLoading(false);
        setError('Failed to load product');
      }
    }
    fetchProduct();

    const fetchCartItems = async () => {
      try {
        const res = await fetch('/api/cart/');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        const productInCart = data.some(item => item.productId._id === productId);
        setAddedToCart(productInCart)
      } catch (err) {
        console.error(err);
      }
    };

    fetchCartItems();
  }, [productId]);

  const addToCart = async () => {
    if(!currentUser){
      navigate('/signin');
    }
    try {
      const res = await fetch(`/api/cart/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        }),
      })
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
      }
      setAddedToCart(true)
    } catch(err){
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col lg:flex-row w-full sm:px-10 md:px-20 lg:px-40 p-6 lg:p-10 gap-8 lg:gap-10'>
      {loading && 
        <p className='text-xl text-slate-700 text-center'>
          Loading...
        </p>
      }

      {error &&
        <p className='text-red-700 text-xl text-center'>
          {error}
        </p>
      }
      {!loading && !error && product && 
      <div className='w-full max-w-[416px] flex-1'>
        <img 
          src={product.image} 
          alt='product-image'
          className='w-[416px] h-[416px] object-cover'
        />
        <div className='flex justify-between mt-5'>
          {addedToCart ?
          <Link to={'/cart'} className='bg-yellow-600 uppercase p-3 text-white font-semibold rounded-lg hover:bg-yellow-500'>
          Go to Cart
          </Link> 
            :
          <button 
          className='bg-yellow-600 uppercase p-3 text-white font-semibold hover:bg-yellow-500 rounded-lg'
          onClick={addToCart}
          >Add to cart </button>
          }
          <Link to={`/payment?amount=${product.price}`}>
          <button className='uppercase p-3 text-white font-semibold bg-green-700 hover:bg-green-600 rounded-lg'>Buy now</button>
          </Link>
        </div>
      </div>}
      {!loading && !error && product &&
      <div className='flex flex-col gap-2 flex-1'>
        <h1 className='text-xl font-semibold'>
          {product.name}
        </h1>
        <p className='text-sm text-gray-500'>{product.description}</p>
        <p className='bg-green-500 inline-block px-2 py-1 text-white rounded max-w-fit'>{product.rating} *</p>
        <p className='font-bold text-2xl'>{product.price} $</p>
      </div>
      }
    </div>
  )
}

export default Product