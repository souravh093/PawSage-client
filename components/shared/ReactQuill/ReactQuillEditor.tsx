// components/ReactQuillEditor.tsx
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with ssr: false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
    <div className="h-44 my-16">
      <EditorToolBar toolbarId={toolbarId} />
      <ReactQuill
        className="h-44"
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
