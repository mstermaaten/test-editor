import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Version from "./version";
import Header from "./header";
import CKEditor from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Font from '@ckeditor/ckeditor5-font/src/font';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';  
// import Link from '@ckeditor/ckeditor5-link/src/link';

const editorConfiguration = {
    plugins: [ 
      Essentials,
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
	    EasyImage,
	    Heading,
	    Image,
	    ImageCaption,
	    ImageStyle,
	    ImageToolbar,
	    ImageUpload,
	    List,
	    MediaEmbed,
      // Link,
	    Paragraph,
      Code,
	    PasteFromOffice,
	    Table,
	    TableToolbar,
      Alignment,
      Font  
    ],
    toolbar: {
		items: [
			'heading',
      'alignment',
      '|',
			'bold',
			'italic',
      'subscript',
      'superscript',
      'underline',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor', 
      'fontBackgroundColor',
      '|',
			'bulletedList',
			'numberedList',
      '|',
			'blockQuote',
      'code',
			'insertTable',
      '|',
      // 'link',
      'imageUpload',
			'mediaEmbed',
      '|',
      'MathType',
      'ChemType',
      '|',
      'undo',
			'redo',

		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
  fontSize: {
            options: [
                'tiny',
                'default',
                'big'
            ]
        },
  fontFamily: {
            options: [
                'default',
    'Arial, Helvetica, sans-serif',
    'Courier New, Courier, monospace',
    'Georgia, serif',
    'Lucida Sans Unicode, Lucida Grande, sans-serif',
    'Tahoma, Geneva, sans-serif',
    'Times New Roman, Times, serif',
    'Trebuchet MS, Helvetica, sans-serif',
    'Verdana, Geneva, sans-serif'
            ]
        },
  fontColor: {
            colors: [
                {
                    color: 'hsl(0, 0%, 0%)',
                    label: 'Black'
                },
                {
                    color: 'hsl(0, 0%, 30%)',
                    label: 'Dim grey'
                },
                {
                    color: 'hsl(0, 0%, 60%)',
                    label: 'Grey'
                },
                {
                    color: 'hsl(0, 0%, 90%)',
                    label: 'Light grey'
                },
                {
                    color: 'hsl(0, 0%, 100%)',
                    label: 'White',
                    hasBorder: true
                },

                // ...
            ]
        },
        fontBackgroundColor: {
            colors: [
                {
                    color: 'hsl(0, 75%, 60%)',
                    label: 'Red'
                },
                {
                    color: 'hsl(30, 75%, 60%)',
                    label: 'Orange'
                },
                {
                    color: 'hsl(60, 75%, 60%)',
                    label: 'Yellow'
                },
                {
                    color: 'hsl(90, 75%, 60%)',
                    label: 'Light green'
                },
                {
                    color: 'hsl(120, 75%, 60%)',
                    label: 'Green'
                },

                // ...
            ]
        },
   cloudServices: {
            tokenUrl: 'https://42543.cke-cs.com/token/dev/ecwTHmyNeFlSiPKUUPbXUXMHJsahiC89GWXwBZUugTj85vH56Dphbxtkl6Ck',
            uploadUrl: 'https://42543.cke-cs.com/easyimage/upload/'
        },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};

class Edit extends Component {
  constructor(props) {
    super(props);
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

        this.setState({
          key: doc.id,
          title: Article.title,
          description: Article.description,
          category: Article.category,
          writer: Article.writer,
          date: Article.date
        });
      }
    })
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


    const updateRef = firebase
      .firestore()
      .collection("article")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
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
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">EDIT Article</h3>
            </div>
            <div className="panel-body">
              <h4>
                <Link to={`/show/${this.state.key}`} className="btn btn-primary">
                  Back
                </Link>
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
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={this.state.description}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({description: data});
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
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
              <div className="form-group">
                <label for="writer">Writer:</label>
                <input
                  type="text"
                  className="form-control"
                  name="writer"
                  value={this.state.writer}
                  onChange={this.onChange}
                  placeholder="writer"
                />
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
            padding: .25em;
            font-size: 75%;
            color: #282828;
          }

        `}</style>
      </div>
    );
  }
}

export default Edit;
