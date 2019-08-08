import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import Header from './header'
import Version from './version';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

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
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time+'Z';

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
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  modules = {
    toolbar: [
      ['formula'],
      [{ 'header': [1, 2, false] }],
      [{'align': ['','center', 'right', 'justify']}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video']
    ],
  }
 
  formats = [
    'formula',
    'header',
    'align',
    'blockquote', 'code-block',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


  render() {
    return (
      <div>
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
                  <ReactQuill 
                    value={this.state.description}
                    onChange={this.setEditorState}
                    theme="snow"
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
                    value={this.state.writer}
                    onChange={this.onChange}
                    placeholder="writer"
                  />
                </div>
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
         <Version />
        </div>
      </div>
    );
  }
}

export default Edit;
