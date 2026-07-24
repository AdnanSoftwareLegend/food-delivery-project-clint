import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import MealsDataRow from "./MealsDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["inventory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/my-inventory/${user?.email}`
      );

      return result.data;
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
            My Inventory
          </h2>

          <p className="text-gray-600 mt-2">
            Manage all your meals from one place.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">

              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-5 py-4 text-left">
                    Image
                  </th>

                  <th className="px-5 py-4 text-left">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left">
                    Quantity
                  </th>

                  <th className="px-5 py-4 text-left">
                    Delete
                  </th>

                  <th className="px-5 py-4 text-left">
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {meals.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500"
                    >
                      No meals found.
                    </td>
                  </tr>
                ) : (
                  meals.map((meal) => (
                    <MealsDataRow
                      key={meal._id}
                      meal={meal}
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

export default MyInventory;