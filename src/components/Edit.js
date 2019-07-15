import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import { EditorState } from "draft-js";

import Layout from "./Layout";
import LatexEditor from "./editor";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: "",
      category: EditorState.createEmpty()
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
        this.setState({
          key: doc.id,
          title: Article.title,
          description: Article.description,
          category: Article.category
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ Article: state });
  };

  setEditorState = val => {
    this.setState({ category: val });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, category } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("article")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        category
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
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
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <LatexEditor
                  editorState={this.state.category}
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
