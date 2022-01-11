import React, { memo, useState } from "react";

// importing hooks
import useAddPostComment from "../hooks/useAddPostComment";

export default memo(function AddCommentCard({
  setAddComment,
  postSlug,
  parentId,
}) {
  const [comment, setComment] = useState("");

  return (
    <div className="add-comment-card">
      <div className="mt-2 d-flex">
        <input
          type="text"
          placeholder="Add reply"
          className="form-control form-control-sm"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="btn btn-dark"
          type="button"
          disabled={comment.length < 1}
          onClick={async () => {
            const some = await useAddPostComment(postSlug, comment, parentId);
            console.log(some);
          }}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      <button
        className="btn btn-outline-danger btn-sm d-flex ms-auto mt-2"
        type="button"
        onClick={() => {
          setAddComment(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
});
