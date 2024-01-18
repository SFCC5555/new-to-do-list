import axios from "axios";

const API = "http://localhost:3000/api/v1";

const postRequest = async (data, endpoint) => {
  try {
    const response = await axios.post(`${API}/${endpoint}`, data);

    console.log("Server response:", response.data);
    return true;
  } catch (error) {
    console.error("Error sending request:", error.response.data.message);
    return false;
  }
};

export { postRequest };
