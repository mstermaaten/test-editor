import React from 'react';
import firebase from "../Firebase";
import logo from "../static/logo.png";

 const Header = () => {
  return (
    <div
          className="header"
          style={{
            width: "100%",
            backgroundColor: "#79d279",
            marginBottom: "20px"
          }}
        >
          <div class="container">
            <div className="menu">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "250px", padding: "10px 0px" }}
            />
            <button className="button" onClick={() => firebase.auth().signOut()}>Sign out</button>
            </div>
          </div>
          <style jsx>{`
          .menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .button {
            background-color: #ff5c33;
            color: white;
            border: 1px solid transparent;
            width: 90px;
            height: 45px;
            font-size: 1rem;
            border-radius: .5rem;
            font-weight: 500;
          }
        `}</style>
        </div>
  )
}

export default Header;