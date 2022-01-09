import axios from "axios";

import { useEffect, useState } from "react";

function useFetchPostDetail(slug) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchPostDetail = async () => {
      const response = await axios({
        method: "GET",
        url: `../post/api/post/${slug}`,
      });
      const data = await response.data;
      setPost(data);
      setLoading(false);
    };
    fetchPostDetail();
  }, [slug]);

  return [loading, post];
}

export default useFetchPostDetail;
