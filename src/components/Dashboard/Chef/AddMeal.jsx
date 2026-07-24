import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddMeal = () => {
  const [preview, setPreview] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Mutation
  const mutation = useMutation({
    mutationFn: async (mealData) => {
      const res = await axiosSecure.post("/meals", mealData);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Meal Added Successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      setPreview(null);
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add meal ❌",
      });
    },
  });

  // Image Preview
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await res.json();
      const imageUrl = imgData.data.url;

      const mealData = {
        foodName: data.title,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        quantity: parseInt(data.quantity),
        deliveryArea: data.deliveryArea,
        ingredients: data.ingredients
          .split(",")
          .map((i) => i.trim()),
        estimatedDeliveryTime:
          data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefName:
          user?.displayName || "Unknown",
        userEmail: user?.email,
        chefId: user?.uid || "pending",
        rating: 0,
        createdAt: new Date().toISOString(),
      };

      mutation.mutate(mealData);
    } catch (error) {
      console.log(error);
      Swal.fire("Image upload failed ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black">
          Add New Meal 🍽️
        </h2>

        <p className="text-gray-600 mt-2">
          Fill up the information below to publish a
          new meal.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image */}
        <div className="md:col-span-2">
          <label className="font-semibold text-black block mb-2">
            Meal Image
          </label>

          <input
            type="file"
            {...register("image", {
              required: "Image is required",
            })}
            onChange={handleImage}
            className="file-input file-input-bordered w-full"
          />

          {errors.image && (
            <p className="text-red-500 text-sm mt-2">
              {errors.image.message}
            </p>
          )}

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 rounded-2xl mt-5 object-cover border"
            />
          )}
        </div>

        {/* Meal Name */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Meal Name
          </label>

          <input
            {...register("title", {
              required: true,
            })}
            placeholder="Enter meal name"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Price
          </label>

          <input
            type="number"
            {...register("price", {
              required: true,
            })}
            placeholder="Enter price"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Category
          </label>

          <select
            {...register("category")}
            className="select select-bordered w-full bg-white text-black"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Quantity
          </label>

          <input
            type="number"
            {...register("quantity")}
            placeholder="Available quantity"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>


                {/* Delivery Area */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Delivery Area
          </label>

          <input
            {...register("deliveryArea", {
              required: true,
            })}
            placeholder="Enter delivery area"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Ingredients
          </label>

          <input
            {...register("ingredients", {
              required: true,
            })}
            placeholder="Chicken, Rice, Onion..."
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Estimated Delivery Time
          </label>

          <input
            {...register("estimatedDeliveryTime", {
              required: true,
            })}
            placeholder="30 Minutes"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Chef Experience */}
        <div>
          <label className="font-semibold text-black block mb-2">
            Chef Experience
          </label>

          <input
            {...register("chefExperience", {
              required: true,
            })}
            placeholder="5 Years"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="font-semibold text-black block mb-2">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={5}
            placeholder="Write a delicious meal description..."
            className="textarea textarea-bordered w-full bg-white text-black"
          ></textarea>
        </div>

        {/* Seller Info */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-black block mb-2">
              Chef Name
            </label>

            <input
              value={user?.displayName || "Unknown"}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black block mb-2">
              Email
            </label>

            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
          >
            {mutation.isPending
              ? "Adding Meal..."
              : "Add Meal 🍽️"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;