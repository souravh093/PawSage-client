import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolBar, { formats, modules } from "./EditorToolBar";

interface ReactQuillEditorProps {
  value: string;
  setValue: (value: string) => void;
  toolbarId: string;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
  value,
  setValue,
  toolbarId,
}) => {
  return (
    <div className="h-60 my-16">
      <EditorToolBar toolbarId={toolbarId} />
      <ReactQuill
        className="h-60"
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Enter Message..."
        formats={formats}
        modules={modules({ toolbarId })}
      />
    </div>
  );
};

export default ReactQuillEditor;
