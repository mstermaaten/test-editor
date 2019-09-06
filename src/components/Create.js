import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Version from "./version";
import Header from "./header";
import Quill from "quill2-dev";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

import "./styles.css";
import { delay } from "q";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/ImageDrop", ImageDrop);

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("article");
     this.editor = null;
    this.state = {
      title: "",
      description: "",
      category: "",
      writer: "",
      date: "",
      delta: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    const options = {
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
        
    
    this.editor = new Quill("#ql-editor", options);
    const table = this.editor.getModule("table");
   
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

      // window.delta = editor.getContents();
      // Quill.setContents(window.delta);

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

    const { title, description, category, writer} = this.state;

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

    this.ref
      .add({
        title,
        description: delta,
        category,
        writer,
        date: dateTime
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: "",
          category: "",
          writer: "",
          date: ""
        }, () => {
		 this.props.history.push("/");
		});
       
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description, writer } = this.state;
    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">ADD Article</h3>
            </div>
            <div class="panel-body">
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
                <label for="description">Description:</label>
                <div className="app">
                  <div
                    className="ql-editor ql-snow"
                    id="ql-editor"
                    style={{ backgroundColor: "#ffffff" }}
                    value={description}
                    onChange={this.setEditorState}
                  ></div>
                 <div className="button-container">
                  <button id="insert-row-above">add Row</button>
                  <button id="insert-row-below">add Row Below</button>
                  <button id="insert-column-left">add Column Left</button>
                  <button id="insert-column-right">add Column Right</button>
                  <button id="delete-row">Delete Row</button>
                  <button id="delete-column">Delete Column</button>
                  <button id="delete-table">Delete Table</button> </div>
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
                <button
                  onClick={this.onSubmit}
                  type="submit"
                  class="btn btn-success"
                >
                  Submit
                </button>
              </div>
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