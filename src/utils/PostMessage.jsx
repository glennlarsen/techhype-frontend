import { BASE_URL, MESSAGES } from "constants/apiKeys";
import axios from "axios";

async function PostMessage(data) {
  const formData = new FormData();

  const newMessage = {
    name: data.name,
    email: data.email,
    phone: data.phone | "",
    message: data.message,
  };

  formData.append("data", JSON.stringify(newMessage));

  const options = {
    method: "POST",
    data: formData,
    url: BASE_URL + MESSAGES,
  };

  try {
    const response = await axios(options);
    const data = response.data;

    if (data) {
      return { success: "Success", data: data };
    }
    if (!data) {
      return { failed: "Failed", data: data };
    }
  } catch (error) {
    return { sucess: false, error: error };
  }
}

export default PostMessage;
