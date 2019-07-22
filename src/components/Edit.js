import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import logo from "../static/logo.png";

import Layout from "./Layout";
import LatexEditor from "./editor";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: EditorState.createEmpty(),
      category: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("article")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const Article = doc.data();

        const converted = convertFromRaw(JSON.parse(Article.description));

        this.setState({
          key: doc.id,
          title: Article.title,
          description: EditorState.createWithContent(converted),
          category: Article.category,
          writer: Article.writer
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setEditorState = val => {
    this.setState({ description: val });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, category, writer } = this.state;

    const rawDraftContentState = JSON.stringify(
      convertToRaw(description.getCurrentContent())
    );

    const updateRef = firebase
      .firestore()
      .collection("article")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description: rawDraftContentState,
        category,
        writer
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: EditorState.createEmpty(),
          category: "",
          writer: ""
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

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
          <div class="container" style={{ margin: "0px 70px 30px 70px" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "250px", padding: "10px 0px" }}
            />
          </div>
        </div>
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">EDIT Article</h3>
            </div>
            <div class="panel-body">
              <h4>
                <Link to={`/show/${this.state.key}`} class="btn btn-primary">
                  Back
                </Link>
              </h4>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    placeholder="Title"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <LatexEditor
                    editorState={this.state.description}
                    setEditorState={this.setEditorState}
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Categories
                    </label>
                  </div>
                  <select
                    name="category"
                    value={this.state.category}
                    onChange={this.onChange}
                    placeholder="category"
                    type="text"
                    class="custom-select"
                  >
                    <option value="Select">Select</option>
                    <option value="Regression">Regression</option>
                    <option value="Classification">Classification</option>
                    <option value="Clustering">Clustering</option>
                    <option value="Generation">Generation</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="writer">Writer:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="writer"
                    value={this.state.writer}
                    onChange={this.onChange}
                    placeholder="writer"
                  />
                </div>
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </form>
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
        <style jsx>
          {`
            .container {
              display: block;
              margin: auto;
              margin-top: 30px;
              margin-bottom: 30px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Edit;
