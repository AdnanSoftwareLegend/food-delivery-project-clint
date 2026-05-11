import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
    const navigate = useNavigate();
    const { signInUser, signInGoogle } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // ✅ Email/password login
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
      title: "Login Successful",
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
};;

    // ✅ Google login
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
      title: "Google Login Successful",
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
        <div className="min-h-screen bg-[#fdfaf7] flex items-center justify-center px-6 py-20">
            <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

                {/* LEFT */}
                <div className="hidden lg:flex w-5/12 bg-[#ff6b6b] p-16 flex-col justify-between relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-black rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-6xl font-black italic text-white">
                            Delish<span className="text-black">!</span>
                        </h2>
                        <p className="mt-8 text-white/90 text-xl">
                            Welcome back! Enjoy homemade food
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-7/12 p-8 lg:p-16">

                    <h1 className="text-4xl font-black mb-10">
                        LOGIN
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="hello@delish.com"
                                className="w-full px-6 py-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#ff6b6b]"
                                {...register("email", {
                                    required: "Email is required"
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-6 py-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#ff6b6b]"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-[#ff6b6b] text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-[#2d2d2d] transition">
                            Login
                        </button>
                    </form>

                    {/* GOOGLE LOGIN */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full mt-4 flex items-center justify-center gap-3 border py-4 rounded-3xl hover:bg-gray-100 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>

                    {/* REGISTER LINK */}
                    <div className="mt-6 text-center text-sm">
                        <p>
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-[#ff6b6b] font-bold">
                                Register
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;