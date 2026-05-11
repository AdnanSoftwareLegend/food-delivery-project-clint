import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import SellerOrderDataRow from './SellerOrderDataRow'

const ManageOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manage-orders/${user?.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8 overflow-x-auto'>
        <div className='shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 text-left'>Name</th>
                <th className='px-5 py-3 text-left'>Customer</th>
                <th className='px-5 py-3 text-left'>Price</th>
                <th className='px-5 py-3 text-left'>Quantity</th>
                <th className='px-5 py-3 text-left'>Status</th>
                <th className='px-5 py-3 text-left'>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <SellerOrderDataRow
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
  )
}

export default ManageOrders