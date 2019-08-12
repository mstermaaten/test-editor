import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Version from './version';
import Header from './header'
import ReactQuill, { Quill } from 'react-quill';
import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';


Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/ImageDrop', ImageDrop)



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

    const { title, description, category, writer } = this.state;

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time+'Z';

    this.ref
      .add({
        title,
        description,
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
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  
  

  modules = {
    ImageDrop: true,
    ImageResize: {
  },
    toolbar: [
      ['formula'],
      [{ 'header': [1, 2, false] }, { 'font': [] }],
      [{'align': ['','center', 'right', 'justify']}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline','strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
    ],
  }
 
  formats = [
    'formula',
    'header',
    'font',
    'align',
    'blockquote', 'code-block',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


  render() {
    const { title, description, writer } = this.state;
    return (
      <div>
        <Header />
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">ADD Article</h3>
            </div>
            <div class="panel-body">
              <form onSubmit={this.onSubmit}>
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
                  <ReactQuill 
                    value={description}
                    onChange={this.setEditorState}
    
                    modules={this.modules}
                    formats={this.formats}
                  />
              
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
                    <option value="Select">Select</option>
                    <option value="Regression">Regression</option>
                    <option value="Classification">Classification</option>
                    <option value="Clustering">Clustering</option>
                    <option value="Generation">Generation</option>
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
                  <button type="submit" class="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
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
