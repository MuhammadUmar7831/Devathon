import axios from "../config/axios.config";

export const generateBillApi = async () => {
  try {
    const response = await axios.post(`/api/user/generate-bill`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Server is Down" };
    }
  }
};
