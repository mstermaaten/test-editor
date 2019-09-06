import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Header from "./header";
import Version from "./version";
import Quill from "quill2-dev";
import "./styles.css";
import "../katex.css";

import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/ImageDrop", ImageDrop);

class Edit extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      key: "",
      title: "",
      description: "",
      category: "",
      date: ""
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

        let options = {
          theme: "snow",
          modules: {
            ImageDrop: true,
            ImageResize: {},
            table: true,
            toolbar: [
              ["formula", "table"],
              [{ size: [] }, { header: [1, 2, 3, 5] }],
              [{ align: ["", "center", "right", "justify"] }],
              ["code", "code-block"],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
              ],
              ["link", "image", "video"],
              ["clean"]
            ]
          }
        };

        this.setState({
          key: doc.id,
          title: Article.title,
          description: Article.description,
          category: Article.category,
          writer: Article.writer,
          date: Article.date
        });

         const parsedDescription = JSON.parse(Article.description);
    

        this.editor = new Quill("#ql-editor", options);
        this.editor.setContents(parsedDescription);
    const table = this.editor.getModule("table");

        document
      .querySelector("#insert-table")
      .addEventListener("click", function() {
        table.insertTable(2, 2);
      });
    document
      .querySelector("#insert-row-above")
      .addEventListener("click", function() {
        table.insertRowAbove();
      });
    document
      .querySelector("#insert-row-below")
      .addEventListener("click", function() {
        table.insertRowBelow();
      });
    document
      .querySelector("#insert-column-left")
      .addEventListener("click", function() {
        table.insertColumnLeft();
      });
    document
      .querySelector("#insert-column-right")
      .addEventListener("click", function() {
        table.insertColumnRight();
      });
    document.querySelector("#delete-row").addEventListener("click", function() {
      table.deleteRow();
    });
    document
      .querySelector("#delete-column")
      .addEventListener("click", function() {
        table.deleteColumn();
      });
    document
      .querySelector("#delete-table")
      .addEventListener("click", function() {
        table.deleteTable();
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

let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + "T" + time + "Z";

     const delta = JSON.stringify(this.editor.getContents());

    const updateRef = firebase
      .firestore()
      .collection("article")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description: delta,
        category,
        writer,
        date: dateTime
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
          category: "",
          writer: "",
          date: ""
        }, () => {
 this.props.history.push("/show/" + this.props.match.params.id);
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };


  render() {
    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
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
                <div className="app">
                  <div
                    className="ql-editor ql-snow"
                    id="ql-editor"
                    style={{ backgroundColor: "#ffffff" }}
                    value={this.state.description}
                    onChange={this.setEditorState}
                  ></div>
                  <div className="button-container">
                  <button id="insert-table">add Table</button>
                  <button id="insert-row-above">add Row</button>
                  <button id="insert-row-below">add Row Below</button>
                  <button id="insert-column-left">add Column Left</button>
                  <button id="insert-column-right">add Column Right</button>
                  <button id="delete-row">Delete Row</button>
                  <button id="delete-column">Delete Column</button>
                  <button id="delete-table">Delete Table</button>
                  </div>
                </div>
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
                  <optgroup label="STATISTICS"></optgroup>
                  <optgroup label="One-sample tests">
                    <option value="One-Parametric-Tests">Parametric Tests</option>
                    <option value="One-Non-Parametric-Tests">Non-Parametric Tests</option>
                  </optgroup>
                  <optgroup label="Two-sample tests">
                   <option value="Two-Parametric-Tests">Parametric Tests</option>
                    <option value="Two-Non-Parametric-Tests">Non-Parametric Tests</option>
                  </optgroup>
                  <optgroup label="Three-sample tests">
                   <option value="Three-Parametric-Tests">Parametric Tests</option>
                    <option value="Three-Non-Parametric-Tests">Non-Parametric Tests</option>
                  </optgroup>
                  <optgroup label="Categorical tests">
                    <option value="Categorical-Parametric-Tests">Parametric Tests</option>
                    <option value="Categorical-Non-Parametric-Tests">Non-Parametric Tests</option>
                  </optgroup>
                  <optgroup label="MACHINE LEARNING"></optgroup>
                  <option value="Select">Select</option>
                  <option value="Regression">Regression</option>
                  <option value="Classification">classification</option>
                  <option value="Clustering">Clustering</option>
                  <option value="Generation">Generation</option>
                  <option value="Dimensionality-Linear">
                    Dimensionality Reduction (Linear)
                  </option>
                  <option value="Dimensionality-Non-Linear">
                    Dimensionality Reduction (Non-Linear)
                  </option>
                  <optgroup label="Evaluation Metrics Selection (Supervides)">
                    <option value="Evaluation-Binary">
                      Binary Classification
                    </option>
                    <option value="Evaluation-Multiclass">
                      Multiclass Classification
                    </option>
                    <option value="Evaluation-Univariate">
                      Univariate Regression
                    </option>
                    <option value="Evaluation-Multivariate">
                      Multivariate Regression
                    </option>
                  </optgroup>
                  <optgroup label="Evaluation Metrics Selection (Unsupervised)">
                    <option value="Evaluation-Cluster">Clustering</option>
                    <option value="Evaluation-NLP">NLP</option>
                  </optgroup>
                  <optgroup label="Handling Overfitting (Models)">
                    <option value="Overfitting-Regres">Regression</option>
                    <option value="Overfitting-Tree">Tree-Based Models</option>
                    <option value="Overfitting-Neural">Neural Networks</option>
                  </optgroup>
                  <option value="Overfitting-General">
                    Handling Overfitting (General)
                  </option>
                  <option value="Imbalanced-Under">Undersampling</option>
                  <option value="Imbalanced-Over">Oversampling</option>
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
              <button
                onClick={this.onSubmit}
                type="submit"
                class="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
          <Version />
        </div>
      </div>
    );
  }
}

export default Edit;
