import React, { useRef } from "react";
import { downloadComponentAsImage, copyComponentAsImageToClipboard } from "./DownloadImage";

export default function ImageActionsWrapper({ children, filename = "download.png" }) {
  const wrapperRef = useRef(null);

  const handleDownload = () => {
    downloadComponentAsImage(wrapperRef, filename);
  };

  const handleCopyToClipboard = () => {
    copyComponentAsImageToClipboard(wrapperRef);
  };

  return (
    <div style={{ position: "relative" }}>
      <div ref={wrapperRef}>{children}</div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleDownload}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007fff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download as Image
        </button>
        <button
          onClick={handleCopyToClipboard}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
