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
              {posts.map(({ title }) => (
                <div className="col-md-6 p-2">
                  <div>
                    <img
                      className="img-fluid"
                      src="https://images.pexels.com/photos/10549951/pexels-photo-10549951.jpeg?cs=srgb&dl=pexels-tommaso-picone-10549951.jpg&fm=jpg"
                      alt={title}
                    />
                    <p>{title}</p>
                  </div>
                </div>
              ))}
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
