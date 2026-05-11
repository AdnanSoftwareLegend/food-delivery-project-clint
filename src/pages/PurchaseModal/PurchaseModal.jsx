import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useMutation } from "@tanstack/react-query"

const PurchaseModal = ({ meal, closeModal }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    _id,
    foodName,
    foodImage,
    price,
    chefName,
    deliveryArea,
    quantity,
    userEmail,

  } = meal || {}

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      )
      return res.data
    },

    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url
      }
    },

    onError: (err) => {
      console.error(err)
      alert("Payment failed")
    }
  })

  const handleConfirm = () => {
    if (!user) {
      alert("You must login first")
      return
    }

    if (!_id) {
      alert("Invalid meal data")
      return
    }

    const paymentInfo = {
      _id, 
      foodName,
      price,
      chefName,
chefEmail:userEmail,
      foodImage,
      deliveryArea,
      quantity: Number(quantity),
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,

      }
    }

    mutate(paymentInfo)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-lg rounded-3xl p-6 relative shadow-2xl">

        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-black mb-4 text-center">
          Confirm Purchase
        </h2>

        {/* Meal Info */}
        <div className="space-y-3 mb-5">

          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-40 object-cover rounded-xl"
          />

          <h3 className="text-xl font-bold">{foodName}</h3>

          <p>Price: ${price}</p>
          <p>Chef: {chefName}</p>
          <p>Area: {deliveryArea}</p>
          <p>Quantity: {quantity}</p>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">

          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Pay Now"}
          </button>

          <button
            onClick={closeModal}
            className="flex-1 bg-gray-200 py-3 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}

export default PurchaseModal