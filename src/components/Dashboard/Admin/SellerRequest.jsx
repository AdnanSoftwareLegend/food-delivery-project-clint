import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import SellerOrderDataRow from "../Chef/SellerOrderDataRow";

const SellerRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-requests");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#eaeff5] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-black">
            Seller Requests
          </h2>

          <p className="mt-1 text-gray-700">
            Total Requests:{" "}
            <span className="font-semibold">
              {orders.length}
            </span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
          <table className="table w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-black">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-black"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <SellerOrderDataRow
                    key={order._id}
                    order={order}
                    refetch={refetch}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;