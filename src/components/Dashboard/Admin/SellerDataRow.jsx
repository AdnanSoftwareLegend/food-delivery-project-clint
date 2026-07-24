const AdminDataRow = ({ order }) => {
  const { email, role, status } = order;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* Email */}
      <td className="px-5 py-3 text-black">
        {email}
      </td>

      {/* Role */}
      <td className="px-5 py-3 text-black capitalize">
        {role}
      </td>

      {/* Status */}
      <td className="px-5 py-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
            status === "approved"
              ? "bg-green-500"
              : status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-3">
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition">
            Approve
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminDataRow;