import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // useRole hook
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
        {/* TOP BANNER */}
        <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500"></div>

        {/* PROFILE CONTENT */}
        <div className="relative px-8 pb-8 text-center pt-20">
          {/* Avatar */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/mJR9p7C/user-placeholder.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
            {user?.displayName || "Anonymous User"}
          </h2>

          {/* Email */}
          <p className="text-gray-500 mt-1">{user?.email}</p>

          {/* Badge */}
          {/* <div className="mt-3">
            {user?.emailVerified ? (
              <span className="px-4 py-1 text-sm bg-green-100 text-green-600 rounded-full font-semibold">
                Verified Account
              </span>
            ) : (
              <span className="px-4 py-1 text-sm bg-red-100 text-red-500 rounded-full font-semibold">
                Unverified Account
              </span>
            )}
          </div> */}

          {/* Role */}
          <div className="mt-3">
            <span className="px-4 py-1 text-sm bg-blue-100 text-blue-600 rounded-full font-semibold">
              {isRoleLoading ? "Loading..." : role || "User"}
            </span>
          </div>

          {/* INFO CARDS */}
          <div>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-semibold text-gray-700 break-all">
                {user?.uid}
              </p>
            </div>

            {/* <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-sm text-gray-500">Email Status</p>
              <p className="font-semibold text-gray-700">
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </p>
            </div> */}
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-orange-600 hover:text-white transition"
            >
              ← Back
            </button>

            {/* HOME BUTTON */}
            <Link to="/">
              <button className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-orange-600 hover:text-white transition">
                Go to Home Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
