import { useRef } from "react";
import html2canvas from "html2canvas";

/**
 * Custom hook for handling image export functionality
 * Consolidates duplicate image export logic from builders
 */
export function useImageExport() {
  const exportRef = useRef(null);

  /**
   * Export component as image and copy to clipboard
   * @param {Object} options - Export options
   * @param {string} options.selector - CSS selector for the element to export (optional)
   * @param {string} options.backgroundColor - Background color for export (optional)
   */
  const copyAsImage = async (options = {}) => {
    if (!exportRef.current) {
      console.error("Export reference is not set");
      return;
    }

    try {
      // Find the target element
      const targetElement = options.selector 
        ? exportRef.current.querySelector(options.selector)
        : exportRef.current;

      if (!targetElement) {
        console.error("Target element not found");
        return;
      }

      // Store original background if we need to modify it
      const originalBg = targetElement.style.backgroundColor;
      
      // Set temporary background if specified
      if (options.backgroundColor) {
        targetElement.style.backgroundColor = options.backgroundColor;
      }

      // Generate canvas with improved options for better rendering
      const canvas = await html2canvas(targetElement, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio || 2, // Higher scale for better quality
        logging: false,
        width: targetElement.scrollWidth,
        height: targetElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedElement = clonedDoc.querySelector('.monster-block, .card');
          if (clonedElement) {
            // Force styles that might not be captured properly
            clonedElement.style.borderRadius = '0.75rem';
            clonedElement.style.overflow = 'hidden';
            clonedElement.style.display = 'inline-block';
            clonedElement.style.margin = '0';
            clonedElement.style.padding = '0';
          }

          // Force visibility for all trait and move elements
          const traitElements = clonedDoc.querySelectorAll('.trait-bullet-list, .trait-bullet-list li, .trait-icon, .moves-bullet-list, .moves-bullet-list li, .move-icon, .initcap, .move-rest');
          traitElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = el.style.display || 'inherit';
          });
        }
      });

      // Restore original background
      if (options.backgroundColor) {
        targetElement.style.backgroundColor = originalBg;
      }

      // Copy to clipboard
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ]);
            console.log("Image copied to clipboard");
          } catch (err) {
            console.error("Failed to copy to clipboard:", err);
          }
        } else {
          console.error("Clipboard API not supported or blob creation failed");
        }
      });
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  };

  /**
   * Export component as image and download
   * @param {string} filename - Name for the downloaded file
   * @param {Object} options - Export options (same as copyAsImage)
   */
  const downloadAsImage = async (filename = "download.png", options = {}) => {
    if (!exportRef.current) {
      console.error("Export reference is not set");
      return;
    }

    try {
      // Find the target element
      const targetElement = options.selector 
        ? exportRef.current.querySelector(options.selector)
        : exportRef.current;

      if (!targetElement) {
        console.error("Target element not found");
        return;
      }

      // Store original background if we need to modify it
      const originalBg = targetElement.style.backgroundColor;
      
      // Set temporary background if specified
      if (options.backgroundColor) {
        targetElement.style.backgroundColor = options.backgroundColor;
      }

      // Generate canvas with improved options for better rendering
      const canvas = await html2canvas(targetElement, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio || 2, // Higher scale for better quality
        logging: false,
        width: targetElement.scrollWidth,
        height: targetElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedElement = clonedDoc.querySelector('.monster-block, .card');
          if (clonedElement) {
            // Force styles that might not be captured properly
            clonedElement.style.borderRadius = '0.75rem';
            clonedElement.style.overflow = 'hidden';
            clonedElement.style.display = 'inline-block';
            clonedElement.style.margin = '0';
            clonedElement.style.padding = '0';
          }

          // Force visibility for all trait and move elements
          const traitElements = clonedDoc.querySelectorAll('.trait-bullet-list, .trait-bullet-list li, .trait-icon, .moves-bullet-list, .moves-bullet-list li, .move-icon, .initcap, .move-rest');
          traitElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = el.style.display || 'inherit';
          });
        }
      });

      // Restore original background
      if (options.backgroundColor) {
        targetElement.style.backgroundColor = originalBg;
      }

      // Download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = filename;
      link.click();
      
      console.log(`Image downloaded as ${filename}`);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return {
    exportRef,
    copyAsImage,
    downloadAsImage
  };
}
