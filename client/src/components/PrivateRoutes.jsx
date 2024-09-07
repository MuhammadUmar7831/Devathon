import { useEffect, useState } from "react"
import CustomLoader from "../interface/CustomLoader"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Layout from "./Layout"

const PrivateRoutes = ({ role }) => {
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // Get user Function
  const getUser = async (role) => {
    if (user === null) {
      // TODO: Add get user api
      //   const response = await getUserApi()
      //   if (response.success) {
      //     dispatch(setUser(response.user))
      //   }
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
