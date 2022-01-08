import axios from "axios";

import { useEffect, useState } from "react";

function useFetchPost(query, search) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "../post/api/posts",
      params: {
        search: search,
        query: query,
      },
    }).then((res) => {
      console.log(res.data);
      setPosts((prevData) => {
        return [prevData, ...res.data];
      });
      setLoading(false);
    });
  }, [search, query]);

  return [loading, posts];
}

export default useFetchPost;
