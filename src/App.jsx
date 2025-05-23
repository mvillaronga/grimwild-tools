import React, { useRef, useState } from "react";
import ObstacleCard from "./components/ObstacleCard";
import html2canvas from "html2canvas";

function App() {
  const cardRef = useRef(null);

  // State for card data
  const [pool, setPool] = useState("4");
  const [title, setTitle] = useState("Goblin Raider");
  const [traits, setTraits] = useState("Sneaky\nCowardly");
  const [moves, setMoves] = useState("Ambush\nPack Tactics\nFlee into Shadows");
  const [failPool, setFailPool] = useState("3");
  const [failDesc, setFailDesc] = useState("Goblins Scatter");

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

  // Parse traits and moves from textarea
  const traitsArr = traits.split("\n").map(t => t.trim()).filter(Boolean);
  const movesArr = moves.split("\n").map(m => m.trim()).filter(Boolean);

  return (
    <div>
      <h1>Grimwild Tools React App</h1>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
        <form
          style={{
            background: "#f6f3eb",
            border: "1px solid #c9c4b4",
            borderRadius: ".75rem",
            padding: "1rem",
            maxWidth: 480,
            marginBottom: "2rem",
            flex: "0 0 350px"
          }}
          onSubmit={e => e.preventDefault()}
        >
          {/* Common header for Challenge Pool and Name */}
          <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
            Challenge
          </div>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <label style={{ margin: 0 }}>
              <span style={{ fontSize: "0.95em" }}>Pool</span><br />
              <input
                type="number"
                min="1"
                max="99"
                value={pool}
                onChange={e => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  if (val.length > 2) val = val.slice(0, 2);
                  setPool(val);
                }}
                style={{ width: "2.5em", textAlign: "center" }}
              />
            </label>
            <label style={{ flex: 1, margin: 0 }}>
              <span style={{ fontSize: "0.95em" }}>Name</span><br />
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Traits (one per line)<br />
              <textarea
                value={traits}
                onChange={e => setTraits(e.target.value)}
                rows={3}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Moves (one per line)<br />
              <textarea
                value={moves}
                onChange={e => setMoves(e.target.value)}
                rows={3}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          {/* Common header for Fail State */}
          <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
            Fail State
          </div>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <label style={{ margin: 0 }}>
              <span style={{ fontSize: "0.95em" }}>Fail State Pool</span><br />
              <input
                type="number"
                min="1"
                max="99"
                value={failPool}
                onChange={e => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  if (val.length > 2) val = val.slice(0, 2);
                  setFailPool(val);
                }}
                style={{ width: "2.5em", textAlign: "center" }}
              />
            </label>
            <label style={{ flex: 1, margin: 0 }}>
              <span style={{ fontSize: "0.95em" }}>Fail State Description</span><br />
              <input
                type="text"
                value={failDesc}
                onChange={e => setFailDesc(e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>
        </form>
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
      <button onClick={handleCopyImage} style={{ marginTop: "1rem" }}>
        Copy Card as Image
      </button>
    </div>
  );
}

export default App;
