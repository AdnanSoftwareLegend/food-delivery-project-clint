import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BecomeSellerModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const axiosSecure = useAxiosSecure();

  const closeModal = () => setIsOpen(false);

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-seller");

      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-[#eaeff5] border border-gray-200 p-6 shadow-2xl">
          <DialogTitle className="text-2xl font-bold text-center text-black">
            Become A Seller!
          </DialogTitle>

          <p className="mt-3 text-center text-gray-700">
            Please read all terms & conditions before continuing.
          </p>

          <hr className="my-5 border-gray-300" />

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRequest}
              className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
            >
              Continue
            </button>

            <button
              onClick={closeModal}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BecomeSellerModal;