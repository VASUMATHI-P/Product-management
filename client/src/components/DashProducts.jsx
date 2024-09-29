import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DashProducts() {
  const [products, setProducts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      if (data.length < 6) {
        setShowMore(false);
      }
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setProducts((prevItems) =>
        prevItems.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowMore = async () => {
    const length = products.length;
    try {
      const res = await fetch(`/api/products?page=${(length / 6) + 1}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      if (data.length > 0) {
        setProducts([...products, ...data]);
      }
      if (data.length < 6) {
        setShowMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className='p-6 mx-auto justify-self-center w-4/5'>
        {/* Adjusted width */}
        <Link to={'/dashboard?tab=create-product'}>
          <button className='p-3 bg-slate-400 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg mb-4'>
            Add new Product
          </button>
        </Link>
        <table className='shadow-md bg-slate-200 text-slate-800 w-full'>
          <thead className='border-b border-slate-500 shadow-md'>
            <tr>
              <th className='px-6 py-4'>S.No</th>
              <th className='px-6 py-4'>Image</th>
              <th className='px-6 py-4'>Name</th>
              <th className='px-6 py-4'>Price</th>
              <th className='px-6 py-4'>Quantity</th>
              <th className='px-6 py-4'>Edit</th>
              <th className='px-6 py-4'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className='hover:bg-slate-200'>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      className='w-20 h-12 object-cover bg-gray-500 hover:shadow-lg transition-all'
                      alt={product.name}
                    />
                  </Link>
                </td>
                <td className='hover:underline cursor-pointer px-6 py-4'>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td className='px-6 py-4'>{product.price} $</td>
                <td className='px-6 py-4'>{product.quantity || 1}</td>
                <td className='px-6 py-4'>
                  <Link to={`/dashboard?tab=edit-product&productId=${product._id}`}>
                    <button className='text-green-900 p-2 bg-green-800 text-white rounded-lg hover:bg-green-600 px-3'>
                      Edit
                    </button>
                  </Link>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className='p-2 px-3 rounded-lg bg-red-800 hover:bg-red-600 text-white'
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showMore && (
          <p onClick={handleShowMore} className='underline text-slate-700 cursor-pointer mt-4 text-center'>
            Show More
          </p>
        )}
      </div>
    </div>
  );
}
