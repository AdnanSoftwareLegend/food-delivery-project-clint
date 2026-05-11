import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const SellerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure()   

  if (!order) return null

  const { email } = order

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email,
        role: 'seller',
      })

      toast.success('Role updated successfully!')
      refetch()
    } catch (err) {
      console.log(err)
      // toast.error(err?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <tr className='border-b'>
      <td className='px-5 py-3'>{email}</td>

      <td className='px-5 py-3'>
        <button
          onClick={handleRoleUpdate}
          className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Make Seller
        </button>
      </td>
    </tr>
  )
}

export default SellerOrderDataRow