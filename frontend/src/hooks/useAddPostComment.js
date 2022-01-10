import axios from "axios";
import { csrftoken } from "../common/getCsrfToken";

const useAddPostComment = async (slug, comment, parentId) => {
  console.log("ran");

  axios({
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
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.response.data);
    });

  //   const response = await axios({
  //     method: "POST",
  //     url: `../post/api/comments/${slug}`,
  //     data: {
  //       content: comment,
  //       parent_id: parentId ? parentId : null,
  //     },
  //     mode: "same-origin",
  //     headers: {
  //       accept: "application/json",
  //       "X-CSRFToken": csrftoken,
  //     },
  //   });

  //   const data = await response.data;

  //   console.log(data.response);
  //   console.log(data.response.data);
  //   return data;
};
export default useAddPostComment;
