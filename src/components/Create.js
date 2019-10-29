import React, { Component } from "react";
import firebase from "../Firebase";
import { Link as RouterLink } from "react-router-dom";
import Version from "./version";
import Header from "./header";
import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "./config";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("test");
    this.state = {
      title: "",
      description: ""
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

    const { title, description } = this.state;

    this.ref
      .add({
        title,
        description
      })
      .then(docRef => {
        this.setState(
          {
            title: "",
            description: ""
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description } = this.state;
    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">ADD Article</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <div className="app">
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.setState({ description: data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </div>
              </div>
              <div className="back-submit">
                <h4>
                  <RouterLink to="/" className="btn btn-primary">
                    Back
                  </RouterLink>
                </h4>
                <button
                  onClick={this.onSubmit}
                  type="submit"
                  className="btn btn-success"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <Version />
        </div>
        <style jsx>{`
          .ck-editor__editable_inline {
            min-height: 400px;
          }
          .back-submit {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            margin-top: 10px;
          }

          .back-submit button {
            margin-left: 10px;
          }

          .table {
            width: 0;
          }

          code {
            padding: 0.25em;
            font-size: 75%;
            color: #282828;
          }
          .text-tiny {
            font-size: 0.7em;
          }

          .text-small {
            font-size: 0.85em;
          }

          .text-big {
            font-size: 1.4em;
          }

          .text-huge {
            font-size: 1.8em;
          }

          .ck.ck-editor__editable_inline {
            padding: 10px 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default Create;
