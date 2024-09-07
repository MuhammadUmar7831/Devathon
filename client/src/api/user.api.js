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
export const getUserApi = async () => {
  try {
    const response = await axios.get(`/api/user/get-user`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signUpUserApi = async (user) => {
  try {
    const response = await axios.post(`/api/user/register`, { user });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
