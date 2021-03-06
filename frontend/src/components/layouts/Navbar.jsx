import React, { memo } from "react";

import { NavLink } from "react-router-dom";

// importing redux related stuff
import { connect } from "react-redux";

function Navbar({ isAuthenticated, username }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-4 bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          SlowGram
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="active"
              >
                <i className="fas fa-home"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add-post"
                exact
                className="nav-link"
                activeClassName="active"
              >
                <i className="fas fa-plus"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="active"
              >
                <i className="fas fa-search"></i>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/auth/logout"
                  exact
                  className="nav-link"
                  activeClassName="active"
                >
                  {username}
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/auth/login"
                  exact
                  className="nav-link"
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  username: state.user.username,
});

export default connect(mapStateToProps, null)(memo(Navbar));
