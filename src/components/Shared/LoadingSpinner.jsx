import { motion } from "framer-motion";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex flex-col justify-center items-center bg-transparent`}
    >
      <div className="relative scale-125">
        {" "}
        {/* একটু বড় করা হয়েছে যাতে ডিটেইল দেখা যায় */}
        {/* --- Steam Animation (ধোঁয়া) --- */}
        <div className="absolute top-[-45px] left-4 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={{ y: -30, opacity: [0, 0.5, 0], scale: [0.5, 1.2, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              className="w-3 h-8 bg-gray-200/40 rounded-full blur-md"
            />
          ))}
        </div>
        {/* --- Sauté Pan Animation --- */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          {/* Pan Body */}
          <div className="w-24 h-7 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-b-[2.5rem] relative shadow-xl border-t border-gray-700/50">
            {/* Pan Handle with Wood Finish look */}
            <div className="absolute right-[-35px] top-0 w-12 h-2.5 bg-gradient-to-r from-gray-800 to-orange-900 rounded-full rotate-[-12deg] shadow-md"></div>

            {/* Jumping Food Particles (Premium colors & rotation) */}
            <motion.div
              animate={{ y: [0, -50, 0], rotate: 360, opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.1 }}
              className="absolute left-6 top-[-12px] w-3.5 h-3.5 bg-orange-500 rounded-sm shadow-[0_0_8px_#f97316]"
            />
            <motion.div
              animate={{ y: [0, -65, 0], rotate: -360, opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.3 }}
              className="absolute left-12 top-[-18px] w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"
            />
            <motion.div
              animate={{ y: [0, -45, 0], rotate: 180, opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
              className="absolute left-16 top-[-10px] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
            />
          </div>
        </motion.div>
        {/* --- Dynamic Heat Glow beneath the pan --- */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-20 h-5 bg-orange-600 blur-2xl rounded-full"
        />
        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-12 h-2 bg-yellow-400 blur-lg rounded-full opacity-60" />
      </div>

      {/* --- Luxury Loading Text --- */}
      <div className="mt-20 text-center">
        <div className="relative inline-block">
          <motion.h2
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-serif italic font-medium text-gray-800 tracking-wide"
          >
            Chef is seasoning
            <span className="text-orange-500 underline decoration-dotted underline-offset-8">
              {" "}
            </span>
          </motion.h2>
        </div>

        {/* Progress Bar Style Loader */}
        <div className="w-56 h-1.5 bg-gray-200 rounded-full mt-8 mx-auto overflow-hidden shadow-inner">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-4 font-bold"
        ></motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
