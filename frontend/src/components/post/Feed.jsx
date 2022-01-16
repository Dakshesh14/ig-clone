import React, { memo } from "react";

// importing redux related stuff
import { connect } from "react-redux";

// importing views
import useFetchPosts from "../../hooks/useFetchPosts";

// importing components
import PostCard from "./PostCard";

function Feed({ user }) {
  const [loading, posts] = useFetchPosts();

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 p-0">
          {loading ? (
            <h1>loading.........</h1>
          ) : (
            <div className="d-flex flex-wrap justify-content-between">
              {posts.length === 0 ? (
                <div>
                  <h1>No post</h1>
                  <p className="text-muted">No post has been added yet :(</p>
                </div>
              ) : (
                posts.map((post) => <PostCard {...post} key={post.slug} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state,
});

export default connect(mapStateToProps, null)(memo(Feed));
