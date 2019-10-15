import React, { Component } from "react";
import firebase from "../Firebase";
import { Link as RouterLink } from "react-router-dom";
import Version from "./version";
import Header from "./header";
import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import HorizontalRule from "@ckeditor/ckeditor5-horizontal-rule/src/horizontalrule";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Font from "@ckeditor/ckeditor5-font/src/font";

import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";

import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";

import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import MathType from "@wiris/mathtype-ckeditor5/src/plugin";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Link from "@ckeditor/ckeditor5-link/src/link";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";

const editorConfiguration = {
  plugins: [
    Essentials,
    SimpleUploadAdapter,
    Base64UploadAdapter,
    UploadAdapter,
    Autoformat,
    MathType,
    Bold,
    Italic,
    Subscript,
    Superscript,
    Underline,
    BlockQuote,
    CKFinder,
    HorizontalRule,
    Heading,
    Image,
    ImageCaption,
    Font,
    ImageStyle,
    Indent,
    IndentBlock,
    ImageToolbar,
    ImageUpload,
    List,
    MediaEmbed,
    Link,
    Paragraph,
    Code,
    PasteFromOffice,
    Table,
    TableToolbar,
    Alignment
  ],
  toolbar: {
    items: [
      "heading",
      "alignment",
      "|",
      "bold",
      "italic",
      "subscript",
      "superscript",
      "underline",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "indent",
      "outdent",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "code",
      "insertTable",
      "horizontalRule",
      "|",
      "link",
      "imageUpload",
      "mediaEmbed",
      "|",
      "MathType",
      "ChemType",
      "|",
      "undo",
      "redo"
    ]
  },
  image: {
    resizeUnit: "px",
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:full",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight"
    ],

    styles: [
      // This option is equal to a situation where no style is applied
      "full",
      "alignLeft",
      "alignCenter",
      // This represents an image aligned to the left.

      // This represents an image aligned to the right.
      "alignRight"
    ]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  fontSize: {
    options: ["tiny", "default", "big"]
  },
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif"
    ]
  },
  fontColor: {
    colors: [
      {
        color: "hsl(0, 0%, 0%)",
        label: "Black"
      },
      {
        color: "hsl(0, 0%, 30%)",
        label: "Dim grey"
      },
      {
        color: "hsl(0, 0%, 60%)",
        label: "Grey"
      },
      {
        color: "hsl(0, 0%, 90%)",
        label: "Light grey"
      },
      {
        color: "hsl(0, 0%, 100%)",
        label: "White",
        hasBorder: true
      }

      // ...
    ]
  },
  fontBackgroundColor: {
    colors: [
      {
        color: "hsl(0, 75%, 60%)",
        label: "Red"
      },
      {
        color: "hsl(30, 75%, 60%)",
        label: "Orange"
      },
      {
        color: "hsl(60, 75%, 60%)",
        label: "Yellow"
      },
      {
        color: "hsl(90, 75%, 60%)",
        label: "Light green"
      },
      {
        color: "hsl(120, 75%, 60%)",
        label: "Green"
      }

      // ...
    ]
  },
  indentBlock: {
    offset: 1,
    unit: "em"
  },
  language: "en",
  placeholder: "Write something cool..."
};

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("article");
    this.state = {
      title: "",
      description: "",
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

    const { title, category, writer, description } = this.state;

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date + " " + time;

    this.ref
      .add({
        title,
        description,
        category,
        writer,
        date: dateTime
      })
      .then(docRef => {
        this.setState(
          {
            title: "",
            description: "",
            category: "",
            writer: "",
            date: ""
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
    const { title, description, writer } = this.state;
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
                      editor.fillEmptyBlocks = false;
                      editor.ignoreEmptyParagraph = true;
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
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Categories
                  </label>
                </div>
                <select
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  placeholder="category"
                  type="text"
                  className="custom-select"
                >
                  <optgroup label="STATISTICS"></optgroup>
                  <optgroup label="One-sample tests">
                    <option value="One-Parametric-Tests">
                      Parametric Tests
                    </option>
                    <option value="One-Non-Parametric-Tests">
                      Non-Parametric Tests
                    </option>
                  </optgroup>
                  <optgroup label="Two-sample tests">
                    <option value="Two-Parametric-Tests">
                      Parametric Tests
                    </option>
                    <option value="Two-Non-Parametric-Tests">
                      Non-Parametric Tests
                    </option>
                  </optgroup>
                  <optgroup label="Three-sample tests">
                    <option value="Three-Parametric-Tests">
                      Parametric Tests
                    </option>
                    <option value="Three-Non-Parametric-Tests">
                      Non-Parametric Tests
                    </option>
                  </optgroup>
                  <optgroup label="Categorical tests">
                    <option value="Categorical-Parametric-Tests">
                      Parametric Tests
                    </option>
                    <option value="Categorical-Non-Parametric-Tests">
                      Non-Parametric Tests
                    </option>
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
              <div className="form-group">
                <label for="writer">Writer:</label>
                <input
                  type="text"
                  className="form-control"
                  name="writer"
                  value={writer}
                  onChange={this.onChange}
                  placeholder="writer"
                />
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
