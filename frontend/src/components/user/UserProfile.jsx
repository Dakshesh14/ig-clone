import React, { memo } from "react";

import { useParams } from "react-router-dom";

export default memo(function UserProfile() {
  const { username } = useParams();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex align-items-center gap-2">
          <h3 className="m-0">{username}</h3>
          <button className="btn btn-primary">Follow</button>
        </div>
        <div className="col-12 mt-5 pt-5">
          <h4>Posts</h4>
        </div>
      </div>
    </div>
  );
});
