import React, { memo } from "react";

export default memo(function CommentCard({
  id,
  likes,
  liked,
  reply_count,
  post_ago,
  replies,
  content,
  is_edited,
}) {
  return (
    <blockquote>
      <h5 className="m-0">Some user</h5>
      <small className="text-muted">{post_ago}</small>
      <p className="my-3">{content}</p>
      <div className="comment-action-container">
        {replies && (
          <>
            <button
              className="btn btn-outline-primary d-flex ms-auto my-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + id}
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {replies.length} Replies
            </button>
            <div className="collapse" id={"collapse" + id}>
              {replies &&
                replies.map((reply) => (
                  <CommentCard key={reply.id} {...reply} />
                ))}
            </div>
          </>
        )}
      </div>
    </blockquote>
  );
});
