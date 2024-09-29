import  { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(true);
  console.log(page);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?page=${page}`) ; 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if(data.length < 6){
          setNext(false);
        }else{
          setNext(true);
        }
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {products && products.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent products</h2>
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        <div className='flex justify-between'>
          <button disabled={page<=1} className='border p-3 max-w-20 self-center bg-slate-600 text-white rounded-lg font-semibold disabled:bg-slate-400' onClick={() => {setPage(page-1)}}>Previous</button>

          {next && <button className='border p-3 max-w-20 self-center bg-slate-600 text-white rounded-lg font-semibold' onClick={() => {setPage(page+1)}}>Next</button>}
        </div>
      </div>
  );
}
