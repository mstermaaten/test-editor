import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import HorizontalRule from "@ckeditor/ckeditor5-horizontal-rule/src/horizontalrule";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Font from "@ckeditor/ckeditor5-font/src/font";

import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";

import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";

import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import MathType from "@wiris/mathtype-ckeditor5/src/plugin";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Link from "@ckeditor/ckeditor5-link/src/link";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";

const editorConfiguration = {
  plugins: [
    Essentials,
    SimpleUploadAdapter,
    Base64UploadAdapter,
    UploadAdapter,
    MathType,
    Bold,
    Italic,
    Subscript,
    Superscript,
    Underline,
    BlockQuote,
    HorizontalRule,
    Heading,
    Image,
    ImageCaption,
    Font,
    ImageStyle,
    Indent,
    IndentBlock,
    ImageToolbar,
    ImageUpload,
    List,
    MediaEmbed,
    Link,
    Paragraph,
    Code,
    PasteFromOffice,
    Table,
    TableToolbar,
    Alignment
  ],
  toolbar: {
    items: [
      "heading",
      "alignment",
      "|",
      "bold",
      "italic",
      "subscript",
      "superscript",
      "underline",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "indent",
      "outdent",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "code",
      "insertTable",
      "horizontalRule",
      "|",
      "link",
      "imageUpload",
      "mediaEmbed",
      "|",
      "MathType",
      "ChemType",
      "|",
      "undo",
      "redo"
    ]
  },
  image: {
    resizeUnit: "px",
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:full",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight"
    ],

    styles: [
      // This option is equal to a situation where no style is applied
      "full",
      "alignLeft",
      "alignCenter",
      // This represents an image aligned to the left.

      // This represents an image aligned to the right.
      "alignRight"
    ]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  fontSize: {
    options: ["tiny", "default", "big"]
  },
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif"
    ]
  },
  fontColor: {
    colors: [
      {
        color: "hsl(0, 0%, 0%)",
        label: "Black"
      },
      {
        color: "hsl(0, 0%, 34%)",
        label: "Dim grey"
      },
      {
        color: "hsl(0, 0%, 60%)",
        label: "Grey"
      },
      {
        color: "hsl(0, 0%, 90%)",
        label: "Light grey"
      },
      {
        color: "hsl(234, 48%, 58%)",
        label: "TLM-Blue"
      },
      {
        color: "hsl(358, 78%, 50%)",
        label: "Red"
      },
      {
        color: "hsl(286, 58%, 34%)",
        label: "Purple"
      },
      {
        color: "hsl(234, 48%, 58%)",
        label: "Purple"
      }

      // ...
    ]
  },
  fontBackgroundColor: {
    colors: [
      {
        color: "hsl(0, 75%, 60%)",
        label: "Red"
      },
      {
        color: "hsl(30, 75%, 60%)",
        label: "Orange"
      },
      {
        color: "hsl(60, 75%, 60%)",
        label: "Yellow"
      },
      {
        color: "hsl(90, 75%, 60%)",
        label: "Light green"
      },
      {
        color: "hsl(120, 75%, 60%)",
        label: "Green"
      }

      // ...
    ]
  },
  indentBlock: {
    offset: 1,
    unit: "em"
  },
  language: "en",
  placeholder: "Write something cool..."
};

export default editorConfiguration;
