import React, { memo } from "react";

import { useParams } from "react-router-dom";

// importing components
import PostImageCarousel from "./PostImageCarousel";

// importing custom hooks
import useFetchPostDetail from "../hooks/useFetchPostDetail";

export default memo(function PostDetail() {
  const { slug } = useParams();

  const [loading, { post_images, title }, comments] = useFetchPostDetail(slug);

  if (loading) {
    return <h2>loading..........</h2>;
  }

  if (!loading) {
    console.log(post_images);
  }

  return (
    <div className="container">
      <div className="row mt-5 pt-5">
        <div className="col-md-6">
          <PostImageCarousel images={post_images} slug={slug} />
          <p>
            {/* {likes_count}
            {liked ? (
              <i className="fas fa-heart liked"></i>
            ) : (
              <i className="far fa-heart"></i>
            )} */}
          </p>
          <p className="text-muted mt-3">{title}</p>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
});
