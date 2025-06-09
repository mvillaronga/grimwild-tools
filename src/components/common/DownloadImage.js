import html2canvas from "html2canvas";

export async function downloadComponentAsImage(componentRef, filename = "download.png") {
  if (!componentRef.current) {
    console.error("Component reference is not valid.");
    return;
  }

  try {
    const canvas = await html2canvas(componentRef.current, { backgroundColor: null });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
}

export async function copyComponentAsImageToClipboard(componentRef) {
  if (!componentRef.current) {
    console.error("Component reference is not valid.");
    return;
  }

  try {
    const canvas = await html2canvas(componentRef.current, { backgroundColor: null });
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        console.log("Image copied to clipboard.");
      } else {
        console.error("Failed to create blob from canvas.");
      }
    });
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
  }
}
