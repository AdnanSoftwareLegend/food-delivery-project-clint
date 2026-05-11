import { FaStar, FaMapMarkerAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({ meal }) => {
  const {
    _id,
    foodName,
    foodImage,
    price,
    rating,
    chefName,
    deliveryArea
  } = meal;

  return (
    <div className="group bg-white rounded-[35px] border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(255,107,107,0.15)] transition-all duration-500 overflow-hidden relative">
      
      {/* Image Section with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating Price Tag */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/40">
          <span className="text-[#ff6b6b] text-lg font-black tracking-tighter">
            ${price}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-[#2d2d2d]/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
          <FaStar className="text-orange-400 text-xs" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">
            {rating || "0.0"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        
        {/* Header: Title & Area */}
        <div>
          <h2 className="text-xl font-black text-[#2d2d2d] tracking-tight group-hover:text-[#ff6b6b] transition-colors duration-300 line-clamp-1 uppercase">
            {foodName}
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-gray-400">
            <FaMapMarkerAlt className="text-[10px]" />
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
              {deliveryArea}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-50"></div>

        {/* Info Grid */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center text-[#ff6b6b]">
              <FaUser className="text-xs" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Chef</p>
              <p className="text-xs font-black text-[#2d2d2d] mt-0.5">{chefName}</p>
            </div>
          </div>

          {/* Premium "View" Button */}
          <button className="bg-gray-50 p-3 rounded-2xl text-[#2d2d2d] group-hover:bg-[#ff6b6b] group-hover:text-white transition-all duration-300 shadow-inner">
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Order Action (Visible on Hover / Focus) */}
       <Link to={`/meal/${_id}`}>
  <button className="w-full bg-[#2d2d2d] text-white py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#ff6b6b] transition-all duration-300 active:scale-95">
    View Details
  </button>
</Link>

      </div>
    </div>
  );
};

export default Card;