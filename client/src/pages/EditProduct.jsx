import { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function EditProduct() {
  const query = useQuery();
  const productId = query.get('productId');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setFormData(data);
        console.log(formData)
      }catch(err){
        setError(err.message);
      }
    }
    fetchProduct();
  },[])

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/products/update/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        return;
      }
      setSuccess('Product is edited successfully');
      console.log(success);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  

  return (
    <div className="p-6 max-w-xl mt-7 mx-auto bg-white rounded-md shadow-lg">

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm font-medium text-gray-700'>Product Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter product name'
            className='border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='price' className='text-sm font-medium text-gray-700'>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Enter product price'
            className='border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='quantity' className='text-sm font-medium text-gray-700'>Quantity</label>
          <input
            type='number'
            id='quantity'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            placeholder='Enter product quantity'
            className='border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm font-medium text-gray-700'>Product Name</label>
          <textarea
            type='text'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter description'
            className='border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='image' className='text-sm font-medium text-gray-700'>Image URL</label>
          <input
            type='text'
            id='image'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='Enter product image URL'
            className='border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500'>
          Edit Product
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
      </form>
    </div>
  );
}

