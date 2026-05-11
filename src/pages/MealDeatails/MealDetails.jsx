import { useState } from "react"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useParams, useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { MdOutlineLocalGroceryStore } from "react-icons/md";

import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUserTie,
  FaConciergeBell,
  FaHeart,
  FaChevronLeft,
  
} from "react-icons/fa"

import PurchaseModal from "../PurchaseModal/PurchaseModal"

const MealDetails = () => {
  const axiosSecure = useAxiosSecure()
  const { id } = useParams()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const {
    data: meal,
    isLoading,
    error
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`)
      return res.data
    }
  })
  console.log(meal);
  

  // Loading UI
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-[#ff6b6b] border-gray-200 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            Preparing Delish...
          </p>
        </div>
      </div>
    )

  // Error UI
  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-400 font-black uppercase tracking-widest italic">
        Something went wrong!
      </div>
    )

  return (
    <div className="min-h-screen bg-[#fdfaf7] pb-20 font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[#2d2d2d] hover:text-[#ff6b6b]"
        >
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <FaChevronLeft />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Back
          </span>
        </button>

        <div className="text-2xl font-black italic">
          Delish<span className="text-[#ff6b6b]">!</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Image */}
        <div className="lg:col-span-7">
          <img
            src={meal?.foodImage}
            alt={meal?.foodName}
            className="w-full h-[500px] object-cover rounded-3xl"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-5 space-y-6">

          <h1 className="text-4xl font-black">
            {meal?.foodName}
          </h1>

          <p className="flex items-center gap-2 text-gray-500">
            <FaStar /> {meal?.rating}
          </p>

          <p className="flex items-center gap-2 text-gray-500">
            <FaMapMarkerAlt /> {meal?.deliveryArea}
          </p>

          <p className="flex items-center gap-2 text-gray-500">
            <FaClock /> {meal?.estimatedDeliveryTime}
          </p>

          <p className="text-xl font-bold text-[#ff6b6b]">
            ${meal?.price}
          </p>


<p className="text-xl font-bold text-[#ff6b6b]"><MdOutlineLocalGroceryStore />{meal?.quantity}</p>
            
          

          {/* Ingredients */}
          <div>
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <FaConciergeBell /> Ingredients
            </h3>

            <div className="flex flex-wrap gap-2">
              {meal?.ingredients?.map((item, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Chef */}
          <div className="bg-black text-white p-4 rounded-xl flex items-center gap-3">
            <FaUserTie />
            <div>
              <p>{meal?.chefName}</p>
              <small>{meal?.chefExperience} experience</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            {/* Order Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 bg-[#ff6b6b] text-white py-3 rounded-xl"
            >
              Order This Meal
            </button>

            {/* Favorite */}
            <button className="px-4 bg-gray-200 rounded-xl">
              <FaHeart />
            </button>

          </div>

        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <PurchaseModal
          meal={meal}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default MealDetails