import React, { useRef } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { plugins } from "./editor";
import blockRenderer from "./renderer";

const DraftRenderer = ({ content }) => {
  if (!content) return null;

  const converted = convertFromRaw(JSON.parse(content));

  const withContent = EditorState.createWithContent(converted);

  function getBlockStyle(block) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return null;
    }
  }

  return (
    <div className="RichEditor-editor">
      <Editor
        blockStyleFn={getBlockStyle}
        plugins={plugins}
        editorState={withContent}
        readOnly={true}
      />
    </div>
  );
};

export default DraftRenderer;
