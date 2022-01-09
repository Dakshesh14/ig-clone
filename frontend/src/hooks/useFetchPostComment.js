import axios from "axios";

import { useEffect, useState } from "react";

function useFetchPostComment(slug) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchPostComment = async () => {
      const response = await axios({
        method: "GET",
        url: `../post/api/comments/${slug}`,
      });
      const data = await response.data;
      setComments(data);
      setLoading(false);
    };
    fetchPostComment();
  }, [slug]);

  return [loading, comments];
}

export default useFetchPostComment;
