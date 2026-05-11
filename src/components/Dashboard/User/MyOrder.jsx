import "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CustomerOrderDataRow from "./CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const MyOrder = () => {
  const { user } = useAuth(); // ✅ FIXED
  const email = user?.email;

  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", email],
    enabled: !!email, // only runs when email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <CustomerOrderDataRow key={order._id} order={order} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
