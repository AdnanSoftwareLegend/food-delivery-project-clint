import { useQuery } from "@tanstack/react-query";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load reviews
      </div>
    );

  return (
    <section className="py-16 px-4 transition-all duration-500 shadow-2xl ">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h2 className="text-3xl md:text-5xl font-bold ">
            <span className="text-black">Customer</span>{" "}
            <span className="text-orange-500">Feedback</span>
          </motion.h2>
        </div>

        {/* SWIPER */}
        
        <Swiper
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          loop
          speed={900}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="max-w-[350px]">
              <div
                className="
                p-8 rounded-2xl
                
                border border-gray-400 
                transition-all duration-500
                hover:-translate-y-2
                shadow-2xl
                bg-[#e7d9c4]
              "
              >
                <FaQuoteRight className="text-gray-200 dark:text-gray-700 text-3xl mb-4" />

                {/* STARS */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300 dark:text-gray-700"
                      }
                    />
                  ))}
                </div>

                {/* COMMENT */}
                <p className="  mb-6 text-black">"{review.comment}"</p>

                {/* USER */}
                <div className="flex items-center gap-3">
                  <img src={review.image} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">
                      {review.name}
                    </h4>
                    <p className="text-yellow-500 text-xs">
                      {review.profession}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
