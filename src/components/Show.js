import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import DraftRenderer from "./DraftRenderer";
import Header from './header'
import Version from './version';

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
    return (
      <div>
        <Header />
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">{this.state.Article.title}</h3>
            </div>
            <div class="panel-body">
              <dl
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  padding: "10px"
                }}
              >
                <dt>Description:</dt>
                <dd>
                  <DraftRenderer content={this.state.Article.description} />
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
