import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import LatexEditor from "./editor";
import logo from "../static/logo.png";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("article");
    this.state = {
      title: "",
      description: EditorState.createEmpty(),
      category: "",
      writer: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
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

    console.log("hhttmmll", stateToHTML(description.getCurrentContent()));

    this.ref
      .add({
        title,
        description: rawDraftContentState,
        category,
        writer
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: EditorState.createEmpty(),
          category: "",
          writer: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description, category, writer } = this.state;
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
              <h3 class="panel-title">ADD Article</h3>
            </div>
            <div class="panel-body">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    placeholder="Title"
                  />
                </div>
                <div class="form-group">
                  <label for="description">description:</label>
                  <LatexEditor
                    editorState={description}
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
                    value={writer}
                    onChange={this.onChange}
                    placeholder="writer"
                  />
                </div>
                <div class="back-submit">
                  <h4>
                    <Link to="/" class="btn btn-primary">
                      Back
                    </Link>
                  </h4>
                  <button type="submit" class="btn btn-success">
                    Submit
                  </button>
                </div>
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
        <style jsx>{`
          .back-submit {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            margin-top: 10px;
          }

          .back-submit button {
            margin-left: 10px;
          }

          .container {
            display: block;
            margin: auto;
            margin-top: 30px;
            margin-bottom: 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default Create;
