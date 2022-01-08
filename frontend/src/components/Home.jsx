import React, { memo } from "react";

// importing redux related stuff
import { connect } from "react-redux";

// importing views
import useFetchPost from "../hooks/useFetchPost";

function Home({ user }) {
  const [loading, posts] = useFetchPost();

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 p-0">
          {loading ? (
            <h1>loading.........</h1>
          ) : (
            <div className="d-flex flex-wrap justify-content-between">
              {posts.map(
                ({ slug, title, likes_count, posted_ago, comment_count }) => (
                  <div className="col-md-6 p-2" key={slug}>
                    <div>
                      <img
                        className="img-fluid"
                        src="https://images.pexels.com/photos/2437286/pexels-photo-2437286.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-2437286.jpg&fm=jpg"
                        alt={title}
                        onDoubleClick={() => {
                          console.log("button has been clicked twice");
                        }}
                      />
                      <div className="d-flex justify-content-between align-items-center pt-3">
                        <div>
                          <h4 className="m-0">Some User</h4>
                          <small className="text-muted m-0">{posted_ago}</small>
                        </div>
                        <p className="fst-italic">
                          {likes_count} <i className="fas fa-heart"></i>
                        </p>
                      </div>
                      <p className="text-muted mt-3">{title}</p>
                    </div>
                  </div>
                )
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

export default connect(mapStateToProps, null)(memo(Home));
