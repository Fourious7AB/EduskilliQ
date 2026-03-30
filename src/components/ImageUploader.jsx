import { useDropzone } from "react-dropzone"
import imageCompression from "browser-image-compression"
import { uploadImageToCloudinary } from "../services/uploadService"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false)

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    // ✅ VALIDATION
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB allowed")
      return
    }

    try {
      setUploading(true)

      // ✅ COMPRESS IMAGE
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      })

      // ✅ UPLOAD
      const imageUrl = await uploadImageToCloudinary(compressedFile)

      // ✅ RETURN URL TO PARENT
      onChange(imageUrl)

      toast.success("Image uploaded")

    } catch (err) {
      console.error(err)
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 text-center rounded-xl cursor-pointer hover:bg-gray-50"
    >
      <input {...getInputProps()} />

      {uploading ? (
        <p>Uploading...</p>
      ) : value ? (
        <img
          src={value}
          alt="preview"
          className="w-32 h-32 object-cover mx-auto rounded-full"
        />
      ) : (
        <p>Drag & drop image or click</p>
      )}
    </div>
  )
}