import axios from "axios"

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

export const uploadImageToCloudinary = async (file) => {
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", UPLOAD_PRESET)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    data
  )

  return res.data.secure_url;
}