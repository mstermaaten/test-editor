import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Version from './version';
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import LatexEditor from "./editor";
import Header from './header'


class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("article");
    this.state = {
      title: "",
      description: EditorState.createEmpty(),
      category: "",
      writer: "",
      date: ""
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

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time+'Z';

    this.ref
      .add({
        title,
        description: rawDraftContentState,
        category,
        writer,
        date: dateTime
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: EditorState.createEmpty(),
          category: "",
          writer: "",
          date: ""
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
        <Header />
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
          <Version />
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
        `}</style>
      </div>
    );
  }
}

export default Create;
