"use client";
import React, { useEffect, useState } from "react";

const ContentPost = ({ content }: { content: string | undefined }) => {
  const [truncatedContent, setTruncatedContent] = useState<string>("");

  useEffect(() => {
    const truncateContent = (text: string | undefined, maxLength: number) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    setTruncatedContent(truncateContent(content, 300));
  }, [content]);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: truncatedContent || "" }}
    />
  );
};

export default ContentPost;
