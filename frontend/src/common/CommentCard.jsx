import React, { memo, useState } from "react";

// importing components
import AddCommentCard from "./AddCommentCard";

export default memo(function CommentCard({
  id,
  likes,
  liked,
  reply_count,
  post_ago,
  replies,
  content,
  is_edited,
  postSlug,
}) {
  const [addComment, setAddComment] = useState(false);

  return (
    <blockquote>
      <h5 className="m-0">Some user</h5>
      <small className="text-muted">
        {post_ago} {is_edited ? "(edited)" : null}
      </small>
      <p className="my-3">{content}</p>
      <div className="comment-action-container">
        <button
          className="btn btn-primary btn-sm me-1"
          type="button"
          onClick={() => {
            setAddComment(true);
          }}
        >
          Add Reply
        </button>
        {replies && (
          <>
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + id}
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {reply_count} Replies
            </button>
          </>
        )}
        {addComment ? (
          <AddCommentCard
            parentId={id}
            postSlug={postSlug}
            setAddComment={setAddComment}
          />
        ) : null}
        <div className="collapse mt-2" id={"collapse" + id}>
          {replies &&
            replies.map((reply) => (
              <CommentCard key={reply.id} {...reply} postSlug={postSlug} />
            ))}
        </div>
      </div>
    </blockquote>
  );
});
