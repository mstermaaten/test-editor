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
    <div className="container">
      <div className="img-wrap">
        <img style={{ width: "80%" }} src={logo} alt="The Learning Machine" />
      </div>
      <div className="form">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
      <style jsx>{`
        .container {
          width: 50%;
          display: block;
          margin: auto;
        }

        .form {
          padding: 20px;
          background-color: #f2f2f2;
          border-radius: 0px 0px 10px 10px;
        }

        .img-wrap {
          width: 100%;
          background-color: #262626;
          border-radius: 10px 10px 0px 0px;
          margin-top: 50px;
          padding: 10px 0px;
        }

        img {
          display: block;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default withRouter(Login);
