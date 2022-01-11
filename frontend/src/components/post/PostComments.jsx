import React, { memo, useState } from "react";

// import components
import CommentCard from "../../common/CommentCard";

// importing actions
import useAddPostComment from "../../hooks/useAddPostComment";
import useFetchPostComment from "../../hooks/useFetchPostComment";

export default memo(function PostComments({ slug }) {
  const [loading, comments] = useFetchPostComment(slug);

  const [comment, setComment] = useState("");

  if (loading) {
    return <h2>loading....</h2>;
  }

  return (
    <div className="post-comment-section">
      <div className="comment-list">
        <h4 className="mb-3">Comments({comments.length})</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard {...comment} key={comment.id} postSlug={slug} />
          ))
        ) : (
          <p className="text-muted">No comment has been added yet!</p>
        )}
        <div className="d-flex">
          <input
            type="text"
            placeholder="Add comment"
            className="form-control"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className="btn btn-dark"
            type="button"
            disabled={comment.length < 3}
            onClick={() => {
              useAddPostComment(slug, comment, null);
            }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
});
