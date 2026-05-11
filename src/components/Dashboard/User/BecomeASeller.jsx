import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import toast from "react-hot-toast"

const BecomeSellerModal = () => {
  const [isOpen, setIsOpen] = useState(true) // 👈 auto open
  const axiosSecure = useAxiosSecure()

  const closeModal = () => setIsOpen(false)

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-seller")
      toast.success("Request sent, please wait for admin approval!")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">

          <DialogTitle className="text-lg font-bold text-center">
            Become A Seller!
          </DialogTitle>

          <p className="mt-2 text-sm text-gray-500 text-center">
            Please read all terms & conditions before continuing.
          </p>

          <hr className="my-4" />

          <div className="flex justify-around">
            <button
              onClick={handleRequest}
              className="px-4 py-2 bg-green-100 text-green-800 rounded"
            >
              Continue
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-100 text-red-800 rounded"
            >
              Cancel
            </button>
          </div>

        </DialogPanel>

      </div>
    </Dialog>
  )
}

export default BecomeSellerModal