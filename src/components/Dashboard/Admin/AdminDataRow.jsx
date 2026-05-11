import { useState } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const AdminDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const { email, role } = order

  const [isOpen, setIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(role)

  // open/close modal
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  // update role
  const handleUpdate = async () => {
  try {
    await axiosSecure.patch('/update-role', {
      email,
      role: selectedRole,
    })

    toast.success('Role updated successfully!')
    refetch()
    setIsOpen(false) // ✅ close modal after success

  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message || 'Something went wrong')
  }
}
  return (
    <>
      <tr className="border-b">
        {/* Email */}
        <td className="px-5 py-3">{email}</td>

        {/* Role */}
        <td className="px-5 py-3">{role}</td>

        {/* Action */}
        <td className="px-5 py-3">
          <button
            onClick={openModal}
            className="bg-orange-400 text-white px-3 py-1 rounded"
          >
            Update Role
          </button>
        </td>
      </tr>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-lg">

            <h2 className="text-lg font-semibold mb-4">
              Select Role
            </h2>

            {/* Role Options */}
            <div className="flex flex-col gap-2 mb-5">

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={selectedRole === 'customer'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />{' '}
                Customer
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={selectedRole === 'seller'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />{' '}
                Seller
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === 'admin'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />{' '}
                Admin
              </label>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default AdminDataRow