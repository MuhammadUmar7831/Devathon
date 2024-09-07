import axios from "../config/axios.config"

export const getUserApi = async () => {
  try {
    const response = await axios.get(`/api/user/get-user`)
    return response.data
  } catch (error) {
    return { success: false, message: error.message }
  }
}
