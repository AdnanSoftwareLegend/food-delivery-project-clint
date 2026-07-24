import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdateUser } from "../../utils";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { registerUser, signInGoogle, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  // ✅ Image Preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ REGISTER FUNCTION
  const onSubmit = async (data) => {
    const { email, password, name, image, address } = data;

    try {
      let imageUrl = "";

      // 🔥 Upload image to ImgBB
      if (image && image[0]) {
        const formData = new FormData();
        formData.append("image", image[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();

        if (result.success) {
          imageUrl = result.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // 🔥 Register user
      await registerUser(email, password);

      // 🔥 Save user in DB
      await saveOrUpdateUser({ name, email, image: imageUrl, address });

      // 🔥 Update profile
      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully! 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  // ✅ Google Sign In Handler
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
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: err.message,
      });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1800&auto=format&fit=crop')",
      }}
    >
      {/* Glassmorphism Card Container */}
      <div className="relative z-10 max-w-md w-full rounded-2xl p-6 sm:p-7 bg-white/15 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white my-6">
        
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
            Create an Account ✨
          </h2>
          <p className="text-gray-200 mt-1 text-xs drop-shadow-sm">
            Join us to explore delicious homemade meals.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* PROFILE IMAGE UPLOAD */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-100">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/30 bg-white/10 shrink-0 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-300">No Image</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                onChange={handleImagePreview}
                className="block w-full text-xs text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition cursor-pointer"
              />
            </div>
            {errors.image && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-100">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
            />
            {errors.name && (
              <p className="text-red-300 text-xs mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-100">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-100">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              {...register("address", { required: "Address is required" })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
            />
            {errors.address && (
              <p className="text-red-300 text-xs mt-1 font-medium">{errors.address.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-100">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-100">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 text-sm outline-none focus:border-orange-400 focus:bg-white/20 transition backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition duration-200"
          >
            Create Account
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-2.5 text-gray-300 text-[11px] font-semibold">OR</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
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

        {/* LOGIN LINK */}
        <p className="text-center mt-5 text-xs text-gray-200">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-300 font-bold hover:text-orange-200 underline-offset-2 hover:underline"
          >
            Login →
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;