import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../Firebase";
import { AuthContext } from "./auth";
import { async } from "q";
import { app } from "firebase";
import logo from "../static/TLM-purple.png";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-img-wrap">
        <img className="logo" style={{ width: "80%" }} src={logo} alt="The Learning Machine" />
      </div>
      <div className="form">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
      <style jsx>{`
        .login-container {
          width: 50%;
          display: block;
          margin: auto;
          background-color: #f2f2f2;
        }

        .form {
          padding: 20px;
          background-color: #d9d9d9;
          border-radius: 0px 0px 10px 10px;
        }

        .login-img-wrap {
          width: 100%;
          background-color: #262626;
          border-radius: 10px 10px 0px 0px;
          margin-top: 50px;
          padding: 10px 0px;
        }

        img.logo {
          display: block;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default withRouter(Login);
