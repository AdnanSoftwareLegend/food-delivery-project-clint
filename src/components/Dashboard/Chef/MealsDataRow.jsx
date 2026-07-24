const MealsDataRow = ({ meal }) => {
  const {
    foodImage,
    foodName,
    category,
    price,
    quantity,
  } = meal;

  return (
    <tr className="hover:bg-orange-50 transition-all duration-300">
      {/* Image */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white">
        <img
          src={foodImage}
          alt={foodName}
          className="w-14 h-14 rounded-xl object-cover border border-gray-200"
        />
      </td>

      {/* Name */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-black font-medium">
        {foodName}
      </td>

      {/* Category */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-black">
        {category}
      </td>

      {/* Price */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-black font-semibold">
        ${price}
      </td>

      {/* Quantity */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-black">
        {quantity}
      </td>

      {/* Delete */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white">
        <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300">
          Delete
        </button>
      </td>

      {/* Update */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white">
        <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-300">
          Update
        </button>
      </td>
    </tr>
  );
};

export default MealsDataRow;