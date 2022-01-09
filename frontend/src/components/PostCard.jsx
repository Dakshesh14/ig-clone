import React, { memo, useState } from "react";

export default memo(function PostCard({
  title,
  likes_count,
  liked,
  slug,
  post_images,
  comment_count,
  posted_ago,
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
        <img
          src={post_images[0].image}
          alt={title}
          className="img-fluid"
          onDoubleClick={handleLiked}
        />
        <div className="post-details-container d-flex justify-content-between align-items-center mt-2 px-2">
          <div>
            <h4 className="m-0">Some user</h4>
            <small className="text-muted m-0">posted {posted_ago}</small>
          </div>
          <div>
            <p className="m-0">
              {p_likes}
              {p_liked ? (
                <i className="fas fa-heart liked"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
