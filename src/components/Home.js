import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import firebase from "../Firebase";
import Header from "./header";
import Version from "./version";
import DataTable from "react-data-table-component";


import "../katex.css";


class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("article");
    this.unsubscribe = null;
    this.state = {
      article: [],
    };
  }

  onCollectionUpdate = querySnapshot => {
    const article = [];
    querySnapshot.forEach(doc => {
      const { title, description, category, writer, date } = doc.data();
      article.push({
        key: doc.id,
        doc, //DocumentSnapshot
        title,
        description,
        category,
        writer,
        date
      });
    });
    this.setState({
      article
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref
      .orderBy("date", "asc")
      .onSnapshot(this.onCollectionUpdate);
  }

  render() {

    const columns = [
      {
        name: "Title",
        sortable: true,
        selector: "title"
      },
      {
        name: "Category",
        sortable: true,
        selector: "category"
      },
      {
        name: "Writer",
        sortable: true,
        selector: "writer"
      },
      {
        name: "Date",
        sortable: true,
        selector: "date"
      },
      {
        name: "Show",
        sortable: false,
        cell: Article => (
          <Link
            to={`/show/${Article.key}`}
            className="btn btn-success"
            style={{
              border: "none",
              backgroundColor: "#01afb2",
              marginTop: "5px"
            }}
          >
            Show
          </Link>
        )
      }
    ];

   

    return (
      <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
        <Header />
        <div className="container" style={{ marginBottom: "30px" }}>
          <div className="content">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Article LIST</h3>
              </div>
              <div className="panel-body">
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#6773DE", margin: "10px 0px" }}
                >
                  <Link to="/create" style={{ color: "white" }}>
                    Add Article
                  </Link>
                </button>
                <DataTable
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "-2px 0px 40px -17px rgba(0,0,0,0.75)",
                    borderRadius: "5px"
                  }}
                  title="Articles"
                  columns={columns}
                  data={this.state.article.reverse()}
                  striped={true}
                  pagination
                
                />
              </div>
            </div>
          </div>
          <Version />
        </div>
      </div>
    );
  }
}

export default Home;
