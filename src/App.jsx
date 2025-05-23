import React, { useRef } from "react";
import ObstacleCard from "./components/ObstacleCard";
import html2canvas from "html2canvas";

function App() {
  const cardRef = useRef(null);

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    // Select the actual card element for html2canvas
    const cardElem = cardRef.current.querySelector(".card");
    if (!cardElem) return;
    // Temporarily set background to white to avoid black fill
    const prevBg = cardElem.style.backgroundColor;
    cardElem.style.backgroundColor = "#f6f3eb";
    const canvas = await html2canvas(cardElem, {
      backgroundColor: null,
      useCORS: true,
      scale: window.devicePixelRatio || 1
    });
    cardElem.style.backgroundColor = prevBg;
    canvas.toBlob(async (blob) => {
      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({ "image/png": blob })
          ]);
          alert("Card image copied to clipboard!");
        } catch (err) {
          alert("Failed to copy image to clipboard.");
        }
      } else {
        alert("Clipboard image copy not supported in this browser.");
      }
    }, "image/png");
  };

  return (
    <div>
      <h1>Grimwild Tools React App</h1>
      <div ref={cardRef} style={{ display: "inline-block" }}>
        <ObstacleCard />
      </div>
      <button onClick={handleCopyImage} style={{ marginTop: "1rem" }}>
        Copy Card as Image
      </button>
    </div>
  );
}

export default App;
