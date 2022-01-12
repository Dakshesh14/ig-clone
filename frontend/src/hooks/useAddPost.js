import axios from "axios";
import { csrftoken } from "../common/getCsrfToken";

const useAddPost = async (formData) => {
  console.log("ran");
  console.log(formData);

  const myFormData = new FormData();

  myFormData.append("title", formData.title);

  formData.images.forEach((file) => {
    myFormData.append("images", file);
  });

  console.log(formData);

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
    console.log(response);
    data.data = await response.data;
    data.status = response.status;
  } catch (error) {
    console.log(error.response);
    data.error = await error.response.data.detail;
    data.status = await error.response.status;
  } finally {
    return data;
  }
};
export default useAddPost;
