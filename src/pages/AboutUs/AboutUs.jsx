import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="relative py-24 bg-[#eaeff5] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400 blur-[120px] opacity-30 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 blur-[120px] opacity-30 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold ">
            
            <span className="text-black"> About</span>
             <span className="text-orange-500">Us</span> 🍽️
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We are building a premium food delivery experience where home chefs
            and food lovers connect through fresh, delicious, and affordable
            meals.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1600&auto=format&fit=crop"
                alt="about"
                className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg">
              <p className="text-sm font-semibold text-white">
                ⭐ Trusted by 10,000+ users
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">

              <span className="text-black"> Bringing Homemade Taste to Your Doorstep</span>
             
            
              
            </h3>

            <p className="text-gray-600 mb-6">
              Our mission is to empower local chefs and deliver authentic
              homemade food directly to customers with quality assurance and
              fast delivery.
            </p>

            <p className="text-gray-600 mb-8">
              From traditional meals to modern cuisine, we ensure every bite
              feels like home-cooked perfection.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-base-100/70 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-center shadow-lg">
                <h4 className="text-2xl font-extrabold text-orange-500">
                  500+
                </h4>
                <p className="text-sm text-gray-500">Meals</p>
              </div>

              <div className="bg-base-100/70 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-center shadow-lg">
                <h4 className="text-2xl font-extrabold text-orange-500">
                  200+
                </h4>
                <p className="text-sm text-gray-500">Chefs</p>
              </div>

              <div className="bg-base-100/70 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-center shadow-lg">
                <h4 className="text-2xl font-extrabold text-orange-500">
                  10K+
                </h4>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
            </div>

            {/* Button */}
            <button
              className="
              px-7 py-3 rounded-xl font-bold text-white

              bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
              hover:from-orange-600 hover:via-red-600 hover:to-pink-600

              shadow-lg hover:shadow-2xl

              transition-all duration-300
              hover:scale-105
              active:scale-95
            "
            >
              Explore More 🚀
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
