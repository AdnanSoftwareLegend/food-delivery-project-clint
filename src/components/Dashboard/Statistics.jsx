import "react";
import useRole from "../../hooks/useRole";
import {
  FaDollarSign,
  FaUserAlt,
  FaClipboardList,
} from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

const Statistics = () => {
  const [role] = useRole();

  return (
    <>
      {/* ================= SELLER ================= */}
      {role === "seller" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-black">
              Seller Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back! Here's your activity summary.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Meals */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <FaClipboardList className="text-2xl text-orange-500" />
              </div>

              <h2 className="text-gray-600">Total Meals</h2>

              <p className="text-3xl font-bold text-black mt-2">
                120
              </p>
            </div>

            {/* Orders */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BsFillHouseDoorFill className="text-2xl text-blue-500" />
              </div>

              <h2 className="text-gray-600">
                Total Orders
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                320
              </p>
            </div>

            {/* Revenue */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <FaDollarSign className="text-2xl text-green-600" />
              </div>

              <h2 className="text-gray-600">
                Total Revenue
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                $12,540
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOMER ================= */}
      {role === "customer" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-black">
              Customer Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back! Here's your activity summary.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <FaClipboardList className="text-2xl text-orange-500" />
              </div>

              <h2 className="text-gray-600">
                My Orders
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                24
              </p>
            </div>

            {/* Purchased */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BsFillHouseDoorFill className="text-2xl text-blue-500" />
              </div>

              <h2 className="text-gray-600">
                Purchased Meals
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                18
              </p>
            </div>

            {/* Spending */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <FaDollarSign className="text-2xl text-green-600" />
              </div>

              <h2 className="text-gray-600">
                Total Spending
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                $2,450
              </p>
            </div>
          </div>
        </div>
      )}
      {/* ================= ADMIN ================= */}
      {role === "admin" && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-black">
              Admin Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back! Here's your system overview.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Revenue */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <FaDollarSign className="text-2xl text-orange-500" />
              </div>

              <h2 className="text-gray-600 text-sm">
                Total Revenue
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                $120
              </p>
            </div>

            {/* Orders */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <BsFillHouseDoorFill className="text-2xl text-blue-500" />
              </div>

              <h2 className="text-gray-600 text-sm">
                Total Orders
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                120
              </p>
            </div>

            {/* Meals */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                <FaClipboardList className="text-2xl text-pink-500" />
              </div>

              <h2 className="text-gray-600 text-sm">
                Total Meals
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                120
              </p>
            </div>

            {/* Users */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <FaUserAlt className="text-2xl text-green-600" />
              </div>

              <h2 className="text-gray-600 text-sm">
                Total Users
              </h2>

              <p className="text-3xl font-bold text-black mt-2">
                10
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-md h-96 flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                📊 Sales Chart Coming Soon
              </p>
            </div>

            {/* Calendar */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md h-96 flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                📅 Calendar Coming Soon
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;


