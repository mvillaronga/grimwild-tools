import html2canvas from 'html2canvas';

/**
 * Downloads a React component as a PNG image
 * @param {React.RefObject} elementRef - Reference to the DOM element to capture
 * @param {string} filename - Name of the file to download
 */
export async function downloadComponentAsImage(elementRef, filename = 'download.png') {
  if (!elementRef.current) {
    console.error('Element reference is null');
    return;
  }

  try {
    const canvas = await html2canvas(elementRef.current, {
      backgroundColor: null,
      scale: 2, // Higher resolution for better quality
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Failed to generate image. Please try again.');
  }
}

/**
 * Copies a React component as an image to the clipboard
 * @param {React.RefObject} elementRef - Reference to the DOM element to capture
 */
export async function copyComponentAsImageToClipboard(elementRef) {
  if (!elementRef.current) {
    console.error('Element reference is null');
    return;
  }

  try {
    const canvas = await html2canvas(elementRef.current, {
      backgroundColor: null,
      scale: 2, // Higher resolution for better quality
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob from canvas');
      }

      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        
        // Show success feedback (you could replace this with a toast notification)
        console.log('Image copied to clipboard successfully');
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
        alert('Failed to copy to clipboard. Your browser may not support this feature.');
      }
    }, 'image/png');

  } catch (error) {
    console.error('Error generating image for clipboard:', error);
    alert('Failed to generate image. Please try again.');
  }
}
