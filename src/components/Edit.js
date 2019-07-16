import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

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
          category: Article.category
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

    const { title, description, category } = this.state;

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
        category
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: EditorState.createEmpty(),
          category: ""
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">EDIT Article</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to={`/show/${this.state.key}`} class="btn btn-primary">
                Article List
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
              <div class="form-group">
                <label for="category">category:</label>
                <input
                  type="text"
                  class="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  placeholder="category"
                />
              </div>
              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
