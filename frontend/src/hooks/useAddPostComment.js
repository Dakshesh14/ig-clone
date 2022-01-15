import axios from "axios";
import { csrftoken } from "../common/getCsrfToken";

const useAddPostComment = async (slug, comment, parentId) => {
  var data = {
    data: null,
    error: null,
    status: 200,
  };

  try {
    const response = await axios({
      method: "POST",
      url: `../post/api/comments/${slug}`,
      data: {
        content: comment,
        parent_id: parentId ? parentId : null,
      },
      mode: "same-origin",
      headers: {
        accept: "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
    data.data = await response.data;
    data.status = response.status;
  } catch (error) {
    console.log(error.response.data);
    data.error = await error.response.data.detail;
    data.status = await error.response.status;
  } finally {
    return data;
  }
};
export default useAddPostComment;
