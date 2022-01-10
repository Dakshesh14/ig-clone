import React, { memo } from "react";

export default memo(function AddCommentCard({ setAddComment, addComment }) {
  return (
    <div className="add-comment-card">
      <div className="mt-2 d-flex">
        <input
          type="text"
          placeholder="Add reply"
          className="form-control form-control-sm"
        />
        <button className="btn btn-dark">
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
