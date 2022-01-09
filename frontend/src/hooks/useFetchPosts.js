import axios from "axios";

import { useEffect, useState } from "react";

function useFetchPosts(query, search) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await axios({
        method: "GET",
        url: "../post/api/posts",
        params: {
          search: search,
          query: query,
        },
      });
      const data = await response.data;
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [search, query]);

  return [loading, posts];
}

export default useFetchPosts;
