import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SellerOrderDataRow from "./SellerOrderDataRow";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage-orders/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-[#eaeff5] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-3xl font-bold text-black">
            Manage Orders
          </h2>

          <p className="text-gray-600 mt-2">
            View and manage all customer orders.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-5 py-4 text-left">Name</th>
                  <th className="px-5 py-4 text-left">Customer</th>
                  <th className="px-5 py-4 text-left">Price</th>
                  <th className="px-5 py-4 text-left">Quantity</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="text-black">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <SellerOrderDataRow
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
    </div>
  );
};

export default ManageOrders;