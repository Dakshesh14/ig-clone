import React, { memo } from "react";

import { useParams } from "react-router-dom";

export default memo(function UserProfile() {
  const { username } = useParams();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1>{username}</h1>
        </div>
      </div>
    </div>
  );
});
