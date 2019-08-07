import React, { useRef } from "react";
import ReactQuill, { Quill }  from 'react-quill';


const DraftRenderer = ({ content }) => {
  if (!content) return null;

  return (
    <div className="RichEditor-editor">
      <ReactQuill
        
        readOnly={true}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
      />
    </div>
  );
};

export default DraftRenderer;
