import React from "react";

function blockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === "align-left") {
    return "align-left";
  }
  if (type === "align-center") {
    return "align-center";
  }
  if (type === "align-right") {
    return "align-right";
  }
}

export default blockRenderer;
