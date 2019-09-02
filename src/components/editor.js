import React from "react";
import Quill from "quill2-dev";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/ImageDrop", ImageDrop);

class Editor extends React.Component {
  componentDidMount() {
    let options = {
      theme: "snow",
      modules: {
        ImageDrop: true,
        ImageResize: {},
        table: true,
        toolbar: [
          ["formula"],
          [{ header: [1, 2, false] }, { font: [] }],
          [{ align: ["", "center", "right", "justify"] }],
          ["blockquote", "code-block"],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image", "video"]
        ]
      }
    };

    const editor = new Quill("#editor-container", options);
    const table = editor.getModule("table");

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
  }
  render() {
    return (
      <div className="App">
        <div id="editor-container" style={{ backgroundColor: "#ffffff" }}></div>
        <button id="insert-table">add Table</button>
        <button id="insert-row-above">add Row</button>
        <button id="insert-row-below">add Row Below</button>
        <button id="insert-column-left">add Column Left</button>
        <button id="insert-column-right">add Column Right</button>
        <button id="delete-row">Delete Row</button>
        <button id="delete-column">Delete Column</button>
        <button id="delete-table">Delete Table</button>
      </div>
    );
  }
}

export default Editor;
