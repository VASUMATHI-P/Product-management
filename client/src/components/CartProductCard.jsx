import { Link } from 'react-router-dom';

export default function CartProductCard({ cart, onDelete }) {
  const product = cart.productId;
  const handleDeleteProduct = async () => {
    onDelete(cart._id);
  }
  return (
    <div className='group relative w-full border border-slate-300 hover:border-2 h-[200px] overflow-hidden rounded-lg sm:w-[430px] transition-all p-4 flex gap-4'>
      <Link to={`/product/${product?._id}`}>
        <img
          src={product.image}
          alt='product cover'
          className='h-[120px] w-[120px] object-cover rounded-md'
        />
      </Link>
      <div className='flex-1 flex flex-col justify-between gap-2'>
        <div>
          <p className='text-lg font-semibold line-clamp-2'>{product.name}</p>
          <p className='text-gray-600'>${product.price}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>Quantity: {cart.quantity}</p>
          <Link
            to={`/product/${product._id}`}
            className='bg-slate-600 text-white px-3 py-1 rounded-md hover:bg-slate-500 transition-all'
          >
            View Product
          </Link>
          <button 
            className='bg-slate-500 p-1'
            onClick={handleDeleteProduct}
          >
            🗑️
          </button>
        </div>
        <Link to={'/payment'}>
        <button className='bg-green-700 font-semibold text-white p-2 rounded-lg'>Buy now!</button>
        </Link>
      </div>
    </div>
  );
}
