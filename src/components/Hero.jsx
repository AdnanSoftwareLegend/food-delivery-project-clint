import  { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=2070&auto=format&fit=crop",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-5 py-2 bg-orange-500 text-white rounded-full mb-6">
            🍔 Premium Food
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Taste The
            <br />
            <span className="text-orange-400">
              Best Delicious Food
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Fresh ingredients, amazing flavors and fast delivery.
            Enjoy restaurant-quality meals at your doorstep.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
              Order Now
            </button>

            <button className="px-8 py-4 border border-white text-white rounded-xl hover:bg-white hover:text-black">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;