import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../Firebase";
import Header from './header'
import Version from './version';

import "../katex.css";

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
      const { title, description, category, writer, date } = doc.data();
      article.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        category,
        writer,
        date
      });
    });
    this.setState({
      article
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('date').onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <Header />
        <div class="container" style={{marginBottom: "30px"}}>
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
                      <th>Show Article</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.article.reverse().map(Article => (
                      <tr>
                        <td>
                            {Article.title}
                        </td>
                        <td>{Article.category}</td>
                        <td>{Article.writer}</td>
                        <td><Link to={`/show/${Article.key}`} class="btn btn-success" style={{marginTop: "5px"}}>
                          Show
                        </Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Version />
        </div>
      </div>
    );
  }
}

export default Home;
