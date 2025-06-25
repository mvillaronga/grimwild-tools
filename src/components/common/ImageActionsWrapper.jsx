import React, { useRef } from "react";
import { downloadComponentAsImage, copyComponentAsImageToClipboard } from "../../utils/imageExport";
import styles from "./ImageActionsWrapper.module.css";

export default function ImageActionsWrapper({ children, filename = "download.png" }) {
  const wrapperRef = useRef(null);

  const handleDownload = () => {
    downloadComponentAsImage(wrapperRef, filename);
  };

  const handleCopyToClipboard = () => {
    copyComponentAsImageToClipboard(wrapperRef);
  };

  return (
    <div className={styles.wrapper}>
      <div ref={wrapperRef}>{children}</div>
      <div className={styles.actionsContainer}>
        <button
          onClick={handleDownload}
          className={`${styles.actionButton} ${styles.downloadButton}`}
        >
          Download as Image
        </button>
        <button
          onClick={handleCopyToClipboard}
          className={`${styles.actionButton} ${styles.copyButton}`}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
