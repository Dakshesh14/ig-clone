import axios from "axios";

import { useEffect, useState } from "react";

function useFetchPostDetail(slug) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  // getting post and comments
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `../post/api/post/${slug}`,
    }).then((res) => {
      setPost(res.data);
    });
    axios({
      method: "GET",
      url: `../post/api/comments/${slug}`,
    }).then((res) => {
      setComments(res.data);
      setLoading(false);
    });
  }, [slug]);

  return [loading, post, comments];
}

export default useFetchPostDetail;
