import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Header from "./header";
import Version from "./version";

import "./styles.css";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Article: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("article")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          Article: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("article")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    let descr = this.state.Article.description;
    return (
      <div style={{ backgroundColor: "#f2f2f2", height: "100%" }}>
        <Header />
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">{this.state.Article.title}</h3>
            </div>
            <div class="panel-body">
              <dl
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "-2px 0px 40px -17px rgba(0,0,0,0.75)",
                  borderRadius: "5px",
                  border: "1px solid lightgrey",
                  padding: "10px"
                }}
              >
                <dt>Description:</dt>
                <dd>
                  <div className="ql-snow">
                    <div className="ql-editor">
                      <div className="read-only" dangerouslySetInnerHTML={{ __html: descr }}></div>
                    </div>
                  </div>
                </dd>
                <dt>category:</dt>
                <dd>{this.state.Article.category}</dd>
              </dl>
              <Link to={`/edit/${this.state.key}`} class="btn btn-success">
                Edit
              </Link>
              &nbsp;
              <button
                onClick={this.delete.bind(this, this.state.key)}
                class="btn btn-danger"
              >
                Delete
              </button>
              <button class="btn btn-primary" style={{ marginLeft: "5px" }}>
                <Link to="/" style={{ color: "white" }}>
                  Back
                </Link>
              </button>
            </div>
          </div>
          <Version />
        </div>
      </div>
    );
  }
}

export default Show;
