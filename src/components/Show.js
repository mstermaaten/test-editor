import React, { Component } from "react";
import firebase from "../Firebase";
import { Link as RouterLink } from "react-router-dom";
import Header from "./header";
import Version from "./version";
import parse from "html-react-parser";
import "../App.css";

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
                 <div className="articl-cont">
                   <div className="ck-content">{parse(`${content}`)}</div>
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
          .articl-cont {
              display: block;
              margin: auto;
              background-color: white;
              padding: 30px 50px 50px;
              border-radius: 2px;
              min-height: 60vh;
              max-width: 80vw;
              
            }


          .table {
            width: 0;
          }

          code {
            padding: .25em;
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
        `}</style>
      </div>
    );
  }
}

export default Show;
