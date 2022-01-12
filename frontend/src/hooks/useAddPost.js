import axios from "axios";
import { csrftoken } from "../common/getCsrfToken";

const useAddPost = async (formData) => {
  const myFormData = new FormData();

  myFormData.append("title", formData.title);

  formData.images.forEach((file) => {
    myFormData.append("images", file);
  });

  var data = {
    data: null,
    error: null,
    status: 200,
  };

  try {
    const response = await axios({
      method: "POST",
      url: `../post/api/add-post`,
      data: myFormData,
      mode: "same-origin",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "multipart/form-data",
        // accept: "application/json",
      },
    });

    data.data = await response.data;
    data.status = response.status;
  } catch (error) {
    data.error = await error.response.data.detail;
    data.status = await error.response.status;
  } finally {
    return data;
  }
};
export default useAddPost;
