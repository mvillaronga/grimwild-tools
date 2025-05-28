import React, { useRef, useState, useEffect } from "react";
import ObstacleCard from "./components/ObstacleCard";
import html2canvas from "html2canvas";
import ObstacleForm from "./components/ObstacleForm";

// Move global styles here
const globalStyle = `
  body {
    margin: 0;
    font-family: "Libre Baskerville", serif;
    background: #ede9dd;
  }
  html, body, #root {
    height: 100%;
  }
`;

function App() {
  const cardRef = useRef(null);

  // State for card data
  const [pool, setPool] = useState("4");
  const [title, setTitle] = useState("Goblin Raider");
  const [traits, setTraits] = useState("Sneaky\nCowardly");
  const [moves, setMoves] = useState("Ambush\nPack Tactics\nFlee into Shadows");
  const [failPool, setFailPool] = useState("3");
  const [failDesc, setFailDesc] = useState("Goblins Scatter");

  // Inject global styles once
  useEffect(() => {
    if (!document.getElementById("grimwild-global-style")) {
      const style = document.createElement("style");
      style.id = "grimwild-global-style";
      style.innerHTML = globalStyle;
      document.head.appendChild(style);
    }
  }, []);

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    const cardElem = cardRef.current.querySelector(".card");
    if (!cardElem) return;
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
          // Always use "image/png" as MIME type
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

  // Add download handler
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const cardElem = cardRef.current.querySelector(".card");
    if (!cardElem) return;
    const prevBg = cardElem.style.backgroundColor;
    cardElem.style.backgroundColor = "#f6f3eb";
    const canvas = await html2canvas(cardElem, {
      backgroundColor: null,
      useCORS: true,
      scale: window.devicePixelRatio || 1
    });
    cardElem.style.backgroundColor = prevBg;
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const sanitize = (str) =>
          str
            .toLowerCase()
            .replace(/[^a-z0-9]+/gi, "_")
            .replace(/^_+|_+$/g, "")
            .replace(/_+/g, "_");
        const filename = `${sanitize(title) || "grimwild-challenge"}.png`;
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert("Failed to generate image.");
      }
    }, "image/png");
  };

  // Parse traits and moves from textarea
  const traitsArr = traits.split("\n").map(t => t.trim()).filter(Boolean);
  const movesArr = moves.split("\n").map(m => m.trim()).filter(Boolean);

  return (
    <div>
      <h1>Grimwild Challenge Creator</h1>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
        <ObstacleForm
          pool={pool}
          setPool={setPool}
          title={title}
          setTitle={setTitle}
          traits={traits}
          setTraits={setTraits}
          moves={moves}
          setMoves={setMoves}
          failPool={failPool}
          setFailPool={setFailPool}
          failDesc={failDesc}
          setFailDesc={setFailDesc}
        />
        <div>
          <div ref={cardRef} style={{ display: "inline-block" }}>
            <ObstacleCard
              pool={pool}
              title={title}
              traits={traitsArr}
              moves={movesArr}
              failPool={failPool}
              failDesc={failDesc}
            />
          </div>
        </div>
      </div>
      <button onClick={handleCopyImage} style={{ marginTop: "1rem", marginRight: "0.5rem" }}>
        Copy Card as Image
      </button>
      <button onClick={handleDownloadImage} style={{ marginTop: "1rem" }}>
        Download Card as Image
      </button>
    </div>
  );
}

export default App;
