import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import Login from "./auth/login";
import { AuthProvider } from "./auth/auth";
import PrivateRoute from "./auth/privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/edit/:id" component={Edit} />
          <PrivateRoute path="/create" component={Create} />
          <PrivateRoute path="/show/:id" component={Show} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
