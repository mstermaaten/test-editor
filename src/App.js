import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";
import Layout from "./components/Layout";
import "./katex.css";

class App extends Component {
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
      const { title, description, category } = doc.data();
      article.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        category
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
      <div class="container">
        <div className="content">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Article LIST</h3>
            </div>
            <div class="panel-body">
              <h4>
                <Link to="/create">Add Article</Link>
              </h4>
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>category</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.article.map(Article => (
                    <tr>
                      <td>
                        <Link to={`/show/${Article.key}`}>{Article.title}</Link>
                      </td>
                      <td>{Article.description}</td>
                      <td>{Article.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
