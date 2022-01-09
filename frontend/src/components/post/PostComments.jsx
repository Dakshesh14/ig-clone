import React, { memo } from "react";

// import components
import CommentCard from "../../common/CommentCard";

// importing actions
import useFetchPostComment from "../../hooks/useFetchPostComment";

export default memo(function PostComments({ slug }) {
  const [loading, comments] = useFetchPostComment(slug);

  if (loading) {
    return <h2>loading....</h2>;
  }

  return (
    <div className="post-comment-section">
      <div className="comment-list">
        {comments.map((comment) => (
          <CommentCard {...comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
});
