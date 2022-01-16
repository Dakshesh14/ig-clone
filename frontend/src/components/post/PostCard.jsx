import React, { memo, useState } from "react";

import { Link } from "react-router-dom";

// importing components
import PostImageCarousel from "./PostImageCarousel";

export default memo(function PostCard({
  title,
  likes_count,
  liked,
  slug,
  post_images,
  comment_count,
  posted_ago,
  username,
}) {
  const [p_liked, setLiked] = useState(liked);
  const [p_likes, setLikes] = useState(likes_count);

  const handleLiked = () => {
    if (p_liked) {
      setLiked(false);
      setLikes(p_likes - 1);
    } else {
      setLiked(true);
      setLikes(p_likes + 1);
    }
  };

  return (
    <div className="col-md-6 p-2 px-md-4 mb-5">
      <div className="post-card d-flex flex-column">
        <PostImageCarousel images={post_images} slug={slug} />
        <div className="post-details-container d-flex justify-content-between align-items-center mt-2 px-2">
          <div>
            <Link
              to={"/user/" + username}
              className="text-decoration-none text-dark"
            >
              <h4 className="m-0">{username}</h4>
            </Link>
            <small className="text-muted m-0">posted {posted_ago}</small>
          </div>
          <div className="d-flex gap-2">
            <p className="m-0">
              {p_likes}
              {p_liked ? (
                <i className="fas fa-heart liked"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </p>
            <p className="m-0">
              <Link
                to={"/post/" + slug}
                className="text-dark text-decoration-none"
              >
                {comment_count} <i className="fas fa-comment"></i>
              </Link>
            </p>
          </div>
        </div>
        <p className="text-muted mt-3 px-2">{title}</p>
      </div>
    </div>
  );
});
