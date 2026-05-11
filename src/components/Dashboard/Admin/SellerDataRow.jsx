const AdminDataRow = ({ order }) => {
  const { email, role, status } = order

  return (
    <tr className="border-b">
      {/* Email */}
      <td className="px-5 py-3">
        {email}
      </td>

      {/* Role */}
      <td className="px-5 py-3">
        {role}
      </td>

      {/* Status */}
      <td className="px-5 py-3">
        <span className={`px-2 py-1 rounded text-white ${
          status === 'approved' ? 'bg-green-500' : 
          status === 'pending' ? 'bg-yellow-500' : 
          'bg-red-500'
        }`}>
          {status}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-3">
        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Approve
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default AdminDataRow