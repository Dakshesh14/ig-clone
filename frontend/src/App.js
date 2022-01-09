import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// importing protected route
import ProtectRoute from "./common/ProtectRoute";

// importing components
import Navbar from "./components/layouts/Navbar";
import Home from "./components/layouts/Home";
import PostDetail from "./components/post/PostDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <ProtectRoute exact path="/" component={Home} />
        <ProtectRoute exact path="/post/:slug" component={PostDetail} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/Logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
