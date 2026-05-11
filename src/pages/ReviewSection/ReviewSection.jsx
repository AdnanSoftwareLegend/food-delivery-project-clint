import { useQuery } from "@tanstack/react-query";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

// Swiper Styles
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (isError)
    return (
      <div className="text-center text-red-500 py-10 bg-white font-medium">
        Failed to load reviews.
      </div>
    );

  return (
    // py-16 করে হাইট কমানো হয়েছে
    <section className="relative bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - mb-12 করে গ্যাপ কমানো হয়েছে */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <span className="w-6 h-[2px] bg-yellow-500"></span>
            <span className="text-yellow-600 font-bold uppercase text-[10px] tracking-widest">
              Reviews
            </span>
            <span className="w-6 h-[2px] bg-yellow-500"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900"
          >
            Customer <span className="text-yellow-500">Feedback</span>
          </motion.h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          // delay: 2000 করে স্লাইড স্পিড বাড়ানো হয়েছে (২ সেকেন্ড পর পর চেঞ্জ হবে)
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="premium-swiper !pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="max-w-[350px] py-6 px-2">
              <div className="relative group">
                {/* Compact Card - padding কমানো হয়েছে (p-8) */}
                <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_20px_50px_-10px_rgba(234,179,8,0.12)] group-hover:border-yellow-500/20">
                  <FaQuoteRight className="text-4xl text-gray-50 absolute top-6 right-8 group-hover:text-yellow-500/5 transition-colors" />

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${i < review.rating ? "text-yellow-500" : "text-gray-200"}`}
                        />
                      ))}
                    </div>

                    {/* Comment - min-h কমানো হয়েছে */}
                    <p className="text-gray-600 text-base leading-relaxed mb-8 min-h-[80px] italic font-medium">
                      "{review.comment}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100"
                      />
                      <div>
                        <h4 className="text-gray-900 text-sm font-bold tracking-tight">
                          {review.name}
                        </h4>
                        <p className="text-yellow-600 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                          {review.profession || "Verified User"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .premium-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 4px;
          background: #e5e7eb !important;
          opacity: 1;
          transition: all 0.3s;
        }
        .premium-swiper .swiper-pagination-bullet-active {
          width: 20px;
          background: #eab308 !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
