import axios from "axios"

axios.defaults.baseURL = "https://localhost:5000"
axios.defaults.withCredentials = true

export default axios
