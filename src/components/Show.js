import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
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

const editorConfiguration = {
    plugins: [ 
      Essentials,
	    UploadAdapter,
	    Autoformat,
      MathType,
	    Bold,
	    Italic,
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
	    Paragraph,
      Code,
	    PasteFromOffice,
	    Table,
	    TableToolbar,
      Alignment  
    ],
    toolbar: {
		items: [
			'heading',
			'|',
      'alignment',
			'bold',
			'italic',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'blockQuote',
      'code',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',
      'MathType',
      'ChemType'
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
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">{this.state.Article.title}</h3>
            </div>
            <div class="panel-body">
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
              <Link to={`/edit/${this.state.key}`} class="btn btn-success">
                Edit
              </Link>
              &nbsp;
              <button
                onClick={this.delete.bind(this, this.state.key)}
                class="btn btn-danger"
              >
                Delete
              </button>
              <button class="btn btn-primary" style={{ marginLeft: "5px" }}>
                <Link to="/" style={{ color: "white" }}>
                  Back
                </Link>
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

          .ck p {
            line-height: 0.5;
          }

          .ck-editor__editable_inline {
            min-height: 250px;
          }

          .ck-media__wrapper {
            width: 80%;
          }
        `}</style>
      </div>
    );
  }
}

export default Show;
