import React from "react";

const categories = [
  {
    name: "Pizza",
    count: 24,
    img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
  },
  {
    name: "Burger",
    count: 18,
    img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  },
  {
    name: "Dessert",
    count: 12,
    img: "https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_1280.jpg",
  },
  {
    name: "Coffee",
    count: 20,
    img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Biryani",
    count: 30,
    img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const ExploreSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-[#eaeff5]">
      {/* Heading */}
      <div className="mb-12 text-center">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
          🍽 Popular Categories
        </span>

        <h2 className="mt-4 text-4xl font-bold text-gray-800">
          Explore{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Delicious Foods
          </span>
        </h2>

        <p className="mt-3 text-gray-500">
          Find your favorite dishes from our top categories.
        </p>
      </div>

      <div className="relative">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#eaeff5] to-transparent"></div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#cddff5] to-transparent"></div>

        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...categories, ...categories].map((item, index) => (
            <div
              key={index}
              className="group min-w-[220px] rounded-3xl border border-orange-200 bg-[#eaeff5] p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative mx-auto h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 p-[3px]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                {item.name}
              </h3>

              <p className="mt-2 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
                {item.count} Items
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ExploreSection;
