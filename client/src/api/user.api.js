import axios from "../config/axios.config";

export const loginApi = async ({ email, password }) => {
  try {
    const response = await axios.post(`/api/user/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};
