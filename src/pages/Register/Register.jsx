import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdateUser } from "../../utils";

const Register = () => {
  const [preview, setPreview] = useState(null);
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

  // ✅ REGISTER FUNCTION (FIXED WITH IMGBB)
  const onSubmit = async (data) => {
    const { email, password, name, image } = data;

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
          },
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

await saveOrUpdateUser({ name, email,image:imageUrl})




      // 🔥 Update profile
      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7] flex items-center justify-center px-6 py-20 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 h-full">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-5/12 bg-[#ff6b6b] p-16 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-6xl font-black italic text-white">
              Delish<span className="text-black">!</span>
            </h2>
            <p className="mt-8 text-white/90 text-xl">
              Join and explore homemade delicious food 🍽️
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-7/12 p-8 lg:p-16 overflow-y-auto">
          <h1 className="text-4xl font-black mb-10">BECOME A MEMBER</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* IMAGE */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image required" })}
                onChange={handleImagePreview}
              />
            </div>

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {/* NAME */}
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* ADDRESS */}
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              {...register("address", { required: "Address required" })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            {/* REGISTER BUTTON */}
            <button className="btn btn-primary w-full">Create Account</button>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={() => {
                
                signInGoogle()
                  .then(async (result) => {
    const user = result.user;

    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    });
                    Swal.fire({
                      icon: "success",
                      title: "Google Login Successful",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                    navigate("/");
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      title: err.message,
                    });
                  });
              }}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl mt-4"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            {/* LOGIN LINK */}
            <div className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 font-bold">
                Login →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
