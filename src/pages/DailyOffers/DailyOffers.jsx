import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const getDiscountAmount = (price) => {
  if (price <= 100) return 10;
  if (price <= 300) return 20;
  if (price <= 1000) return 30;
  return 0;
};

const getOfferPrice = (price) => price - getDiscountAmount(price);

const getDiscountPercentage = (price) => {
  const discount = getDiscountAmount(price);
  return price ? Math.round((discount / price) * 100) : 0;
};

const DailyOffers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["daily-offers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/meals");
      return data.slice(0, 10);
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#eaeff5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-48 h-72 rounded-2xl bg-white animate-pulse border border-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#eaeff5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Daily <span className="text-orange-500">Offers</span>
          </h2>

          <p className="mt-3 text-gray-600">
            Scroll & grab your favorite meals
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >
            {[...offers, ...offers].map((offer, index) => {
              const offerPrice = getOfferPrice(offer.price);
              const percent = getDiscountPercentage(offer.price);

              return (
                <div
                  key={index}
                  className="
                    w-52
                    bg-[#f5f6f8]
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-md
                    overflow-hidden
                    flex-shrink-0
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={offer.foodImage}
                      alt={offer.foodName}
                      className="w-full h-32 object-cover transition-transform duration-500 hover:scale-110"
                    />

                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                      {percent}% OFF
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-[#e9d5b6]">
                    <h3 className="text-base font-bold text-gray-800 truncate">
                      {offer.foodName}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2 h-10">
                      {offer.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        ৳{offer.price}
                      </span>

                      <span className="text-lg font-bold text-orange-500">
                        ৳{offerPrice}
                      </span>
                    </div>

                    {/* Button */}
                    <Link to={`/meal/${offer._id}`}>
                      <button
                        className="
                          w-full
                          mt-4
                          py-2.5
                          rounded-xl
                          bg-gradient-to-r
                          from-[#ff6b6b]
                          to-orange-500
                          hover:from-orange-600
                          hover:to-orange-600
                          text-white
                          font-semibold
                          text-sm
                          shadow-md
                          hover:shadow-xl
                          transition-all
                          duration-300
                          hover:scale-105
                          active:scale-95
                        "
                      >
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DailyOffers;