import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        
        {/* Summary Section */}
        <div className="w-full mb-6 p-4 bg-slate-100 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800">Transaction Summary:</h2>
          <p className="text-sm text-gray-700 mt-2">Order Number: <strong>#123456</strong></p>
          <p className="text-sm text-gray-700">Total Amount Paid: <strong>{amount}$</strong></p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Link to="/">
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 font-semibold">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
