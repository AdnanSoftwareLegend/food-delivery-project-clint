import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import CustomerOrderDataRow from './CustomerOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const MyOrder = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get('/my-orders');
      return res.data;
    },
  });

  // Loading
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[60vh] bg-[#eaeff5]'>
        <LoadingSpinner />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className='flex items-center justify-center h-[60vh] bg-[#eaeff5]'>
        <p className='text-red-500 font-semibold'>
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#eaeff5] p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='mb-6'>
          <h2 className='text-3xl font-bold text-black'>
            My Orders
          </h2>

          <p className='mt-1 text-gray-700'>
            Total Orders:{' '}
            <span className='font-semibold'>{orders.length}</span>
          </p>
        </div>

        {/* Table */}
        <div className='overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md'>
          <table className='table w-full'>
            <thead className='bg-orange-500 text-white'>
              <tr>
                <th className='px-5 py-3 text-left'>Image</th>
                <th className='px-5 py-3 text-left'>Name</th>
                <th className='px-5 py-3 text-left'>Category</th>
                <th className='px-5 py-3 text-left'>Price</th>
                <th className='px-5 py-3 text-left'>Quantity</th>
                <th className='px-5 py-3 text-left'>Status</th>
              </tr>
            </thead>

            <tbody className='text-black'>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan='6'
                    className='py-8 text-center text-black'
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <CustomerOrderDataRow
                    key={order._id}
                    order={order}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;