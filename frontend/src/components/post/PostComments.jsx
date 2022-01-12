import React, { memo, useState } from "react";

// import components
import CommentCard from "../../common/CommentCard";
import Swal from "sweetalert2";

// importing actions
import useAddPostComment from "../../hooks/useAddPostComment";
import useFetchPostComment from "../../hooks/useFetchPostComment";

export default memo(function PostComments({ slug }) {
  const [loading, comments] = useFetchPostComment(slug);
  const [comment, setComment] = useState("");

  const handleClick = async () => {
    const response = await useAddPostComment(slug, comment, null);
    console.log(response);
    if (response.status >= 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.error,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Comment added!",
        text: `Your comment ${response.data.content} has been added. Please refresh page to see your comment.`,
      });
    }
    setComment("");
  };

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
            onClick={handleClick}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
});
