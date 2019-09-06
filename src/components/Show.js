import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Header from "./header";
import Version from "./version";
import Quill from "quill2-dev";

import "./styles.css";


class Show extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
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
      const data = doc.data();
      if (doc.exists) {
        this.setState({
          Article: data,
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
      return data;
    }).then(data => {
      
          let options = {
          readOnly: true,
          };

        const parsedDescription = JSON.parse(data.description);
        this.editor = new Quill("#ql-editor", options);
        this.editor.setContents(parsedDescription);
    })

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
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
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
                    <div id="ql-editor" className="ql-editor">
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
