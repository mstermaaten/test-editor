import React, { Component } from "react";
import firebase from "../Firebase";
import { Link as RouterLink } from "react-router-dom";
import Version from "./version";
import Header from "./header";
import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "./config";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("test")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const Article = doc.data();

        this.setState({
          key: doc.id,
          title: Article.title,
          description: Article.description
        });
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

    const { title, description } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("test")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description
      })
      .then(docRef => {
        this.setState(
          {
            key: "",
            title: "",
            description: ""
          },
          () => {
            this.props.history.push("/show/" + this.props.match.params.id);
          }
        );
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">EDIT Article</h3>
            </div>
            <div className="panel-body">
              <h4>
                <RouterLink
                  to={`/show/${this.state.key}`}
                  className="btn btn-primary"
                >
                  Back
                </RouterLink>
              </h4>

              <div className="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
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
                    data={this.state.description}
                    onInit={editor => {
                      // editor.setData(this.state.description);
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.setState({ description: data });
                      console.log({ event, editor, data });
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
              <button
                onClick={this.onSubmit}
                type="submit"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
          <Version />
        </div>
        <style jsx>{`
          .ck-editor__editable_inline {
            min-height: 400px;
          }

          .ck-placeholder [data-cke-filler] {
            display: none;
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

export default Edit;
