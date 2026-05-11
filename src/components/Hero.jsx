import "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Hero = () => {
  return (
    // pt-32 navbar er overlap solve korbe
    <section className="relative w-full min-h-screen bg-[#fdfaf7] flex items-center pt-32 lg:pt-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .swiper-pagination-bullet-active { background: #ff6b6b !important; width: 12px; border-radius: 5px; }
            `,
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <div className="relative z-10">
          <h1 className="text-5xl lg:text-8xl font-black text-[#2d2d2d] leading-[1.1] tracking-tight">
            Hungry? Let's <br />
            Deliver <span className="text-[#ff6b6b]">Happiness</span>
          </h1>
          <p className="mt-8 text-gray-500 text-lg lg:text-xl leading-relaxed max-w-lg font-light">
            Explore a world of flavors from the best restaurants in your city.
            Quick and easy delivery at your command.
          </p>

          {/* Search Bar */}
          {/* <div className="mt-12 flex bg-white p-2 rounded-full shadow-2xl max-w-md border border-gray-100">
                        <input 
                            type="text" 
                            placeholder="Find 'Aspargas'..." 
                            className="flex-1 px-8 outline-none bg-transparent text-gray-700" 
                        />
                        <button className="bg-[#ff6b6b] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#e85a5a] transition-all shadow-lg shadow-[#ff6b6b]/20">
                            Search
                        </button>
                    </div> */}
        </div>

        {/* Right Side: Image Slider */}
        <div className="relative w-full h-[450px] lg:h-[600px] rounded-[50px] overflow-hidden shadow-2xl border-8 border-white">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="h-full"
          >
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200"
                className="w-full h-full object-cover"
                alt="Delicious Pizza"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200"
                className="w-full h-full object-cover"
                alt="Juicy Burger"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200"
                className="w-full h-full object-cover"
                alt="Healthy Salad"
              />
            </SwiperSlide>
          </Swiper>

          {/* Floating Badge */}
          <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
            <p className="text-[#ff6b6b] font-black text-xl italic leading-none tracking-tighter">
              Delish!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
