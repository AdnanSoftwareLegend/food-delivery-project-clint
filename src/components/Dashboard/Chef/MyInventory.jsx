import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import MealsDataRow from "./MealsDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyInventory = () => {
  const { user } = useAuth(); // FIXED
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["inventory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `/my-inventory/${user?.email}`
      );

      return result.data;
    },
  });

  // console.log(meals);
  
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Image
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Name
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Category
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Price
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Quantity
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Delete
                  </th>

                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase">
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {meals.map((meal) => (
                  <MealsDataRow
                    key={meal._id}
                    meal={meal}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInventory;