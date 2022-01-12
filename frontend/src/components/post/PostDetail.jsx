import React, { memo } from "react";

import { useParams } from "react-router-dom";

// importing components
import PostImageCarousel from "./PostImageCarousel";
import PostComments from "./PostComments";

// importing custom hooks
import useFetchPostDetail from "../../hooks/useFetchPostDetail";

export default memo(function PostDetail() {
  const { slug } = useParams();

  const [loading, { post_images, title, likes_count, liked }] =
    useFetchPostDetail(slug);

  if (loading) {
    return <h2>loading..........</h2>;
  }

  return (
    <div className="container post-detail">
      <div className="row mt-5 pt-5">
        <div className="col-md-6">
          <PostImageCarousel images={post_images} slug={slug} />
          <p className="float-md-end mt-2">
            {likes_count}
            {liked ? (
              <i className="fas fa-heart liked"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </p>
          <p className="text-muted mt-3">{title}</p>
        </div>
        <div className="col-md-6">
          <PostComments slug={slug} />
        </div>
      </div>
    </div>
  );
});
