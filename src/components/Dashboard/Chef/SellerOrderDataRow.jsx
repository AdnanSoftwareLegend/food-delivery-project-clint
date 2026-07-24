import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  if (!order) return null;

  const { email } = order;

  const handleRoleUpdate = async () => {
    try {
      setLoading(true);

      await axiosSecure.patch("/update-role", {
        email,
        role: "seller",
      });

      toast.success("Role updated successfully!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-orange-50 transition duration-300">

      {/* Email */}
      <td className="px-5 py-4 text-black font-medium">
        {email}
      </td>

      {/* Action */}
      <td className="px-5 py-4">
        <button
          onClick={handleRoleUpdate}
          disabled={loading}
          className="
            px-5
            py-2
            rounded-lg
            bg-gradient-to-r
            from-green-500
            to-emerald-500
            hover:from-green-600
            hover:to-emerald-600
            text-white
            font-medium
            shadow-md
            hover:shadow-lg
            transition-all
            duration-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Updating..." : "Make Seller"}
        </button>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;



