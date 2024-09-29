import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className='group relative w-full border border-slate-300 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[330px] transition-all'>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt='product cover'
          className='h-[200px] w-full  object-cover group-hover:h-[160px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{product.name}</p>
        <Link
          to={`/product/${product._id}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-slate-300 border-slate-300 border-slate-300 hover:text-black transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
