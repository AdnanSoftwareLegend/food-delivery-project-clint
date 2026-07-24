import {
  FaStar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router";

const Card = ({ meal }) => {
  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    chefName,
    deliveryArea,
  } = meal;

  const chefInitial = chefName ? chefName.charAt(0).toUpperCase() : "C";

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Wishlist */}
        <button className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow transition hover:bg-red-500 hover:text-white">
          <FaHeart size={14} />
        </button>

        {/* Popular */}
        <div className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold text-white">
          Popular
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow">
          <FaStar className="text-yellow-400" size={13} />
          {rating || "New"}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3 rounded-full bg-[#ff6b6b] px-3 py-1 text-sm font-bold text-white shadow">
          ${price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 bg-[#e7d9c4]">

        <h2 className="line-clamp-1 text-lg font-bold text-gray-800 transition group-hover:text-[#ff6b6b]">
          {foodName}


          
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-[#ff6b6b]" size={13} />
          {deliveryArea}
        </div>

        {/* Chef */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#ff6b6b] to-orange-500 font-semibold text-white">
              {chefInitial}
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Chef
              </p>

              <p className="line-clamp-1 text-sm font-semibold text-gray-800">
                {chefName}
              </p>
            </div>

          </div>

          <span className="text-xs font-semibold text-green-600">
            🚚 Fast
          </span>

        </div>

        {/* Button */}
        <Link
          to={`/meal/${_id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b6b] to-orange-500 py-3 text-sm font-semibold text-white transition hover:shadow-lg"
        >
          View Details
          <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
        </Link>

      </div>
    </article>
  );
};

export default Card;