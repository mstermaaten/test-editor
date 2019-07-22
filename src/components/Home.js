import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../Firebase";
import logo from "../static/logo.png";

import "../katex.css";
import DraftRenderer from "../components/DraftRenderer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("article");
    this.unsubscribe = null;
    this.state = {
      article: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const article = [];
    querySnapshot.forEach(doc => {
      const { title, description, category, writer } = doc.data();
      article.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        category,
        writer
      });
    });
    this.setState({
      article
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <div
          className="header"
          style={{
            width: "100%",
            backgroundColor: "#79d279",
            marginBottom: "20px"
          }}
        >
          <div class="container">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "250px", padding: "10px 0px" }}
            />
          </div>
        </div>
        <div class="container">
          <div className="content">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Article LIST</h3>
              </div>
              <div class="panel-body">
                <button class="btn btn-primary" style={{ margin: "10px 0px" }}>
                  <Link to="/create" style={{ color: "white" }}>
                    Add Article
                  </Link>
                </button>
                <table class="table table-stripe">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>category</th>
                      <th>Writer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.article.map(Article => (
                      <tr>
                        <td>
                          <Link to={`/show/${Article.key}`}>
                            {Article.title}
                          </Link>
                        </td>
                        <td>{Article.category}</td>
                        <td>{Article.writer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ display: "block", margin: "auto", marginTop: "50px" }}>
            <div>
              &copy;{" "}
              <a href="https://www.thelearningmachine.ai">
                The Learning Machine
              </a>
              &nbsp; 2019. &nbsp;&nbsp; version 1.0.0
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
