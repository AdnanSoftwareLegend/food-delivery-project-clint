import "react";

const CustomerOrderDataRow = ({ order }) => {
  if (!order) return null;

  const { image, name, category, price, quantity, status } = order;

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Image */}
      <td className="px-5 py-3 border-b border-gray-200">
        {image ? (
          <img
            src={image}
            alt={name || "order"}
            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
          />
        ) : (
          <span className="text-black">No Image</span>
        )}
      </td>

      {/* Name */}
      <td className="px-5 py-3 border-b border-gray-200 text-black font-medium">
        {name || "N/A"}
      </td>

      {/* Category */}
      <td className="px-5 py-3 border-b border-gray-200 text-black">
        {category || "N/A"}
      </td>

      {/* Price */}
      <td className="px-5 py-3 border-b border-gray-200 text-black font-semibold">
        ${price || 0}
      </td>

      {/* Quantity */}
      <td className="px-5 py-3 border-b border-gray-200 text-black">
        {quantity ?? 0}
      </td>

      {/* Status */}
      <td className="px-5 py-3 border-b border-gray-200">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status || "Unknown"}
        </span>
      </td>

      {/* Action */}
      {/*
      <td className="px-5 py-3 border-b border-gray-200">
        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
          Delete
        </button>
      </td>
      */}
    </tr>
  );
};

export default CustomerOrderDataRow;