import "react";
import useRole from "../../hooks/useRole";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
const Statistics = () => {
  const [role] = useRole();
  return (
    <>
    
      {/* Seller */}
      {role === "seller" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview Seller
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here’s your activity summary.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Users</h2>
              <p className="text-2xl font-bold">1,245</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold">320</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-2xl font-bold">$12,540</p>
            </div>
          </div>
        </div>
      )}

      {/* Customer */}
      {role === "customer" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview of Customer
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here’s your activity summary.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Users</h2>
              <p className="text-2xl font-bold">1,245</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold">320</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-2xl font-bold">$12,540</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin */}
      {role === "admin" && (
        <div>
          <div className="mt-12">
            {/* small cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
              {/* Sales Card */}
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                >
                  <FaDollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Revenue
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    $120
                  </h4>
                </div>
              </div>
              {/* Total Orders */}
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                >
                  <BsFillHouseDoorFill className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Orders
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    120
                  </h4>
                </div>
              </div>
              {/* Total Plants */}
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
                >
                  <BsFillHouseDoorFill className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Plants
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    120
                  </h4>
                </div>
              </div>
              {/* Users Card */}
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
                >
                  <FaUserAlt className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total User
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    10
                  </h4>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {/*Sales Bar Chart */}
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                {/* Chart goes here.. */}
              </div>
              {/* Calender */}
              <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                {/* Calender */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
