import { useEffect, useState } from "react"
import CustomLoader from "../interface/CustomLoader"
import { useDispatch, useSelector } from "react-redux"

import Layout from "./Layout"
import { setUser } from "../redux/user/userSlice"
import { Navigate, Outlet } from "react-router-dom"
import { getUserApi } from "../api/user.api"


const PrivateRoutes = ({ role }) => {
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // Get user Function
  const getUser = async (role) => {
    if (user === null) {
      const response = await getUserApi()
      console.log(response)
      if (response.success) {
        dispatch(setUser(response.data))
      }
    }
    setLoading(false)
  }
  useEffect(() => {
    getUser()
  }, [user])

  if (loading) {
    return (
      <>
        <CustomLoader loadingText="Authenticating..." />
      </>
    )
  }

  return user !== null ? (
    <>
      <Layout children={<Outlet />} />
    </>
  ) : (
    <Navigate to="/auth/login" />
  )
}

export default PrivateRoutes
