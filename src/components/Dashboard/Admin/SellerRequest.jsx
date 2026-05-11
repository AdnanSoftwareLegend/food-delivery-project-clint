


import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import SellerOrderDataRow from '../Chef/SellerOrderDataRow'



const SellerRequest = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading,refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-requests`)
      return res.data
    },
  })

//   console.log(orders);
  
  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8 overflow-x-auto'>
        <div className='shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 text-left'>Email</th>
                
                <th className='px-5 py-3 text-left'>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <SellerOrderDataRow
                  refetch={refetch}
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

export default SellerRequest