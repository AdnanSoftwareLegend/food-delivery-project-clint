import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser, signInGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ==========================
  // Email & Password Login
  // ==========================
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const result = await signInUser(email, password);
      const user = result.user;

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  // ==========================
  // Google Login
  // ==========================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Google Login Successful 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1800&auto=format&fit=crop')",
      }}
    >
      {/* Compact Centered Glassmorphism Card */}
      <div className="relative z-10 max-w-sm w-full rounded-2xl p-6 sm:p-7 bg-white/15 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
            Welcome Back 👋
          </h2>

          <p className="text-gray-200 mt-1 text-xs drop-shadow-sm">
            Login to continue ordering your favorite meals.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-100">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
            />

            {errors.email && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-100">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-orange-300 hover:text-orange-200 font-medium transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-2.5 text-gray-300 text-[11px] font-semibold">OR</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition active:scale-[0.99] backdrop-blur-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />

          <span className="font-semibold text-white text-xs">
            Continue with Google
          </span>
        </button>

        {/* Register Link */}
        <p className="text-center mt-5 text-xs text-gray-200">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-300 font-bold hover:text-orange-200 underline-offset-2 hover:underline"
          >
            Register Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;