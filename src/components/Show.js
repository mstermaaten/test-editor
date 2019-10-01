import React, { Component } from "react";
import firebase from "../Firebase";
import { Link as RouterLink } from "react-router-dom";
import Header from "./header";
import Version from "./version";
import CKEditor from '@ckeditor/ckeditor5-react';
// NOTE: Use the editor from source (not a build)!
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

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
import Link from '@ckeditor/ckeditor5-link/src/link';

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
      Link,
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
      'link',
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
  //  cloudServices: {
  //           tokenUrl: 'https://tlm-database.firebaseio.com/users/ada/name.json?auth=edvxC26gDoXRBV2vmTNRyTN912p2',
  //           uploadUrl: 'https://42543.cke-cs.com/easyimage/upload/'
  //       },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Article: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("article")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      const data = doc.data();
      if (doc.exists) {
        this.setState({
          Article: data,
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
     
    }).catch(error => {
      console.log(error);
    })

  }

  delete(id) {
    firebase
      .firestore()
      .collection("article")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    const content = this.state.Article.description;
    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.state.Article.title}</h3>
            </div>
            <div className="panel-body">
              <dl
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "-2px 0px 40px -17px rgba(0,0,0,0.75)",
                  borderRadius: "5px",
                  border: "1px solid lightgrey",
                  padding: "10px"
                }}
              >
                <dt>Description:</dt>
                <dd>
                 <div className="app">
                 <CKEditor
                    editor={ BalloonEditor }
                    data={content}
                   disabled={true}
                   config={ editorConfiguration }
                />
                </div>
                </dd>
                <dt>category:</dt>
                <dd>{this.state.Article.category}</dd>
              </dl>
              <RouterLink to={`/edit/${this.state.key}`} className="btn btn-success">
                Edit
              </RouterLink>
              &nbsp;
              <button
                onClick={this.delete.bind(this, this.state.key)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button className="btn btn-primary" style={{ marginLeft: "5px" }}>
                <RouterLink to="/" style={{ color: "white" }}>
                  Back
                </RouterLink>
              </button>
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
            padding: .25em;
            font-size: 75%;
            color: #282828;
          }
        `}</style>
      </div>
    );
  }
}

export default Show;
