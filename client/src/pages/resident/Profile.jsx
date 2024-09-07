import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MdModeEditOutline } from "react-icons/md"
import useCloudinary from "../../hooks/useCloudinary"
import { RxCross1 } from "react-icons/rx"
import { useSelector } from "react-redux"

export default function Profile() {
  const { user } = useSelector((state) => state.user)
  const [imageUrl, setImageUrl] = useState("")
  const [name, setName] = useState("Jhon Doe")
  const [isEditingName, setIsEditingName] = useState(false)
  const { uploadImage, deleteImage } = useCloudinary()

  useEffect(() => {
    setName(user.name)
    setImageUrl(user.avatar)
  }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("The selected file is not an image")
        return
      }
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)

      await deleteImage(imageUrl)
      const res = await uploadImage(file)
      if (res.success) {
        setImageUrl(res.imageUrl)
        toast.success("Image uploaded")
        // TODO update user on backend
      }
    }
  }

  const handleUpdateUser = (e) => {
    e.preventDefault()
    setIsEditingName(false)
    if (name !== user.name) {
      // todo request server
      toast.success("Name updated")
    }
  }

  return (
    <div className="mt-16 flex flex-col justify-center items-center text-center w-full h-full">
      <div className="relative inline-flex object-cover border-4 border-gray-900 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-gray-900/100 bg-indigo-50 text-gray-900 aspect-square w-56 overflow-hidden group">
        <img className="object-cover" src={imageUrl} alt="/user" />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 aspect-square w-56 text-5xl text-white hidden group-hover:flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple={false}
            className="text-transparent h-full"
          />{" "}
          <span className="absolute top-[40%] left-[40%]"><MdModeEditOutline /></span>
        </div>
      </div>
      <div className="mt-10 flex gap-5 justify-center items-center text-3xl">
        {!isEditingName && <h1 className="text-gray-500 font-bold">{name}</h1>}
        {isEditingName && (
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              className="text-gray-500 font-bold outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        )}
        <span
          className="cursor-pointer"
          onClick={() => setIsEditingName(!isEditingName)}
        >
          {isEditingName ? <RxCross1 /> : <MdModeEditOutline />}
        </span>
      </div>
      <span className="text-gray-900 text-base">{user.email}</span>
    </div>
  )
}
