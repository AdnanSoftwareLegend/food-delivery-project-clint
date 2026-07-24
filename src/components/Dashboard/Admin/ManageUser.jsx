import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminDataRow from "./AdminDataRow";

const ManageUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#eaeff5] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-black">
            Manage Users
          </h2>

          <p className="text-gray-700 mt-1">
            Total Users:{" "}
            <span className="font-semibold">{orders.length}</span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
          <table className="table w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-black">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-black"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <AdminDataRow
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

export default ManageUser;