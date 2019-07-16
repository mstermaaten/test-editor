import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight
} from "@fortawesome/free-solid-svg-icons";

import { RichUtils, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";

import createKaTeXPlugin from "draft-js-katex-plugin";
import katex from "katex";

import blockRenderer from "./renderer";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// plugin setup

//katex
const kaTeXPlugin = createKaTeXPlugin({ katex });
const { InsertButton } = kaTeXPlugin;

export const plugins = [kaTeXPlugin];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StyleButton = ({ onToggle, active, label, icon, style }) => {
  const onClick = () => onToggle(style);

  const className = active
    ? "RichEditor-styleButton RichEditor-activeButton"
    : "RichEditor-styleButton";

  return (
    <button type="button" className={className} onClick={onClick}>
      {icon ? <FontAwesomeIcon icon={icon} /> : label}
    </button>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
  { icon: faAlignLeft, label: "align left", style: "align-left" },
  { icon: faAlignCenter, label: "align center", style: "align-center" },
  { icon: faAlignRight, label: "align right", style: "align-right" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      <InsertButton type="button" />
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default ({ editorState, setEditorState }) => {
  const editorRef = useRef();

  const focusEditor = () => editorRef.current && editorRef.current.focus();

  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />

      <div className="editor-outer">
        <div onClick={focusEditor} className="editor-inner">
          <Editor
            blockStyleFn={blockRenderer}
            ref={editorRef}
            plugins={plugins}
            editorState={editorState}
            onChange={setEditorState}
          />
        </div>
      </div>
    </div>
  );
};
