import { useState, Suspense } from "react";
import { Outlet } from "react-router";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import Sidebar from "../components/Dashboard/Sidebar";
import LoadingSpinner from "../components/Shared/LoadingSpinner"; 

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* 1. Mobile Overlay (সাইডবার খোলা থাকলে ব্যাকগ্রাউন্ড অন্ধকার হবে) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 2. Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}>
        {/* মোবাইলে সাইডবার বন্ধ করার বাটন (X) */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <Sidebar />
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header (শুধুমাত্র মোবাইলে মেনু বাটন দেখাবে) */}
        <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Dashboard</h2>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* 
                Suspense bebohar kora hoyeche jate Outlet-er bhitore thaka 
                page gulo load hoyar somoy spinner-ti majhkhane thake.
            */}
            <Suspense 
              fallback={
                <div className="flex h-[60vh] w-full items-center justify-center">
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