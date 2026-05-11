const MealsDataRow = ({ meal }) => {
  const {
    foodImage,
    foodName,
    category,
    price,
    quantity,
  } = meal;

  return (
    <tr>
      <td className="px-5 py-5 border-b bg-white text-sm">
        <img
          src={foodImage}
          alt={foodName}
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        {foodName}
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        {category}
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        ${price}
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        {quantity}
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        <button className="bg-red-500 text-white px-4 py-1 rounded">
          Delete
        </button>
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        <button className="bg-green-500 text-white px-4 py-1 rounded">
          Update
        </button>
      </td>
    </tr>
  );
};

export default MealsDataRow;