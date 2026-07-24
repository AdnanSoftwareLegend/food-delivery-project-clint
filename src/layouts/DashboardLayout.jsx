import { useState, Suspense } from "react";
import { Outlet } from "react-router";
import { Menu, X } from "lucide-react";

import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const DashboardLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  return (
    <div className="flex min-h-screen bg-[#eaeff5]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50
          w-64
          bg-[#eaeff5]
          shadow-xl
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-700 hover:text-orange-500 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#eaeff5]">
        {/* Navbar */}
        <Navbar />

        {/* Mobile Dashboard Header */}
        <header className="md:hidden bg-[#eaeff5] border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Dashboard
          </h2>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="btn btn-ghost btn-sm hover:bg-orange-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#eaeff5]">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-[60vh]">
                  <LoadingSpinner />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;