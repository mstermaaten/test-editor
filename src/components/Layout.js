import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <img src="static/logo.png" />
        </div>
        <div>
          <h1>Hello</h1>
        </div>
        <style jsx>{`
          * {
            padding: 0;
            marging: 0;
          }

          .container {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 10px 20px;
            flex-direction: row;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
