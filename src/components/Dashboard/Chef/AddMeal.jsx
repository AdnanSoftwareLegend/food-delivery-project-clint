import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth"

const AddMeal = () => {
  const [preview, setPreview] = useState(null)

  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  // 🔥 Mutation
  const mutation = useMutation({
    mutationFn: async (mealData) => {
      const res = await axiosSecure.post("/meals", mealData)
      return res.data
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Meal Added Successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      })
      reset()
      setPreview(null)
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add meal ❌",
      })
    }
  })

  // 🔥 Image preview
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  // 🔥 Submit
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0]

      const formData = new FormData()
      formData.append("image", imageFile)

      // ImgBB upload
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )

      const imgData = await res.json()
      const imageUrl = imgData.data.url

      // Final data
      const mealData = {
        foodName: data.title,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,

        quantity: parseInt(data.quantity),

        deliveryArea: data.deliveryArea,
        ingredients: data.ingredients.split(",").map(i => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,

        chefName: user?.displayName || "Unknown",
        userEmail: user?.email,
        chefId: user?.uid || "pending",

        rating: 0,
        createdAt: new Date().toISOString(),
      }

      mutation.mutate(mealData)

    } catch (error) {
      console.log(error)
      Swal.fire("Image upload failed ❌")
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Meal 🍽️</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Image */}
        <div>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            onChange={handleImage}
          />
          {errors.image && <p className="text-red-500">Image required</p>}
          {preview && (
            <img src={preview} className="w-32 mt-2 rounded" />
          )}
        </div>

        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Meal Name"
          className="input input-bordered w-full"
        />

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        {/* Category */}
        <select
          {...register("category")}
          className="select select-bordered w-full"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        {/* Quantity */}
        <input
          type="number"
          {...register("quantity")}
          placeholder="Quantity"
          className="input input-bordered w-full"
        />

        {/* Delivery Area */}
        <input
          {...register("deliveryArea", { required: true })}
          placeholder="Delivery Area"
          className="input input-bordered w-full"
        />

        {/* Ingredients */}
        <input
          {...register("ingredients", { required: true })}
          placeholder="Ingredients (comma separated)"
          className="input input-bordered w-full"
        />

        {/* Delivery Time */}
        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time (e.g. 30 min)"
          className="input input-bordered w-full"
        />

        {/* Experience */}
        <input
          {...register("chefExperience", { required: true })}
          placeholder="Chef Experience"
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn bg-orange-500 text-white w-full"
        >
          {mutation.isPending ? "Adding..." : "Add Meal"}
        </button>

      </form>
    </div>
  )
}

export default AddMeal