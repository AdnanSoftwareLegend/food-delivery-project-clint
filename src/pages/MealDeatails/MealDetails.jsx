import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUserTie,
  FaConciergeBell,
  FaHeart,
  FaChevronLeft,
} from "react-icons/fa";

import PurchaseModal from "../PurchaseModal/PurchaseModal";
import Logo from "../../components/Shared/Logo/Logo";

const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  // LOADING
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
            Loading Delicious Food...
          </p>
        </div>
      </div>
    );

  // ERROR
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Something went wrong!
      </div>
    );

  return (
    <div className="min-h-screen  pb-20 transition-all shadow-2xl">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">

        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-3
           
          "
        >
          <div className="
            w-10 h-10 rounded-full
            border border-gray-200 dark:border-gray-700
            flex items-center justify-center
          ">
            <FaChevronLeft />
          </div>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Back
          </span>
        </button>

        <Logo></Logo>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* IMAGE */}
        <div className="lg:col-span-7 relative group">

          <img
            src={meal?.foodImage}
            alt={meal?.foodName}
            className="
              w-full h-[520px]
              object-cover
              rounded-3xl
              shadow-2xl
              group-hover:scale-[1.02]
              transition duration-500
            "
          />

          {/* PRICE FLOAT */}
          <div className="
            absolute top-5 right-5
            bg-white/70 dark:bg-gray-800/70
            backdrop-blur-xl
            px-5 py-2
            rounded-full
            font-black text-orange-500
            shadow-lg
          ">
            ${meal?.price}
          </div>

        </div>

        {/* DETAILS */}
        <div className="lg:col-span-5 space-y-6">

          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            {meal?.foodName}
          </h1>

          {/* STATS */}
          <div className="space-y-2 text-gray-500">

            <p className="flex items-center gap-2">
              <FaStar className="text-yellow-500" /> {meal?.rating}
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {meal?.deliveryArea}
            </p>

            <p className="flex items-center gap-2">
              <FaClock /> {meal?.estimatedDeliveryTime}
            </p>

            <p className="flex items-center gap-2 text-orange-500 font-bold text-lg">
              <MdOutlineLocalGroceryStore /> {meal?.quantity}
            </p>

          </div>

          {/* INGREDIENTS */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <FaConciergeBell /> Ingredients
            </h3>

            <div className="flex flex-wrap gap-2">
              {meal?.ingredients?.map((item, i) => (
                <span
                  key={i}
                  className="
                   
                    px-3 py-1
                    rounded-full
                    text-xs
                
                    border
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CHEF */}
          <div className="
            
            p-4
            rounded-2xl
            flex items-center gap-3
            shadow-2xl
            
          ">
            <FaUserTie className="text-orange-400" />
            <div>
              <p className="font-bold">{meal?.chefName}</p>
              <small className="text-gray-300">
                {meal?.chefExperience} experience
              </small>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">

            <button
              onClick={() => setIsOpen(true)}
              className="
                flex-1
                 bg-orange-500 
                
                py-4
                rounded-2xl
                font-bold
                hover:scale-[1.02]
                transition
                shadow-2xl
              "
            >
              Order This Meal
            </button>

            <button className="
              px-5
              
              rounded-2xl
              hover:text-red-500
              transition
              shadow-2xl
            ">
              <FaHeart />
            </button>

          </div>

        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <PurchaseModal meal={meal} closeModal={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default MealDetails;