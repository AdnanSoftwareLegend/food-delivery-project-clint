import "react";

const CustomerOrderDataRow = ({ order }) => {
  if (!order) return null;

  const { image, name, category, price, quantity, status } = order;

  return (
    <tr className="hover:bg-gray-50">
      {/* Image */}
      <td className="px-5 py-3 border-b">
        {image ? (
          <img
            src={image}
            alt={name || "order"}
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </td>

      {/* Name */}
      <td className="px-5 py-3 border-b">{name || "N/A"}</td>

      {/* Category */}
      <td className="px-5 py-3 border-b">{category || "N/A"}</td>

      {/* Price */}
      <td className="px-5 py-3 border-b">{price ? `$${price}` : "0"}</td>

      {/* Quantity */}
      <td className="px-5 py-3 border-b">{quantity ?? 0}</td>

      {/* Status */}
      <td className="px-5 py-3 border-b">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {status || "unknown"}
        </span>
      </td>

      {/* Action
      <td className="px-5 py-3 border-b">
        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm">
          Delete
        </button>
      </td> */}
    </tr>
  );
};

export default CustomerOrderDataRow;
