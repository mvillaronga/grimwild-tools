import React, { useState, useEffect, useRef } from "react";
import { monsterColourHex } from "./colors";

export default function ColorPicker({ selectedColor, setSelectedColor, selectedLabel, setSelectedLabel }) {
  const [customColor, setCustomColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);
  const labelInputRef = useRef(null);

  const handlePresetSelect = (label) => {
    setSelectedLabel(label);
    setSelectedColor(monsterColourHex[label]);
    setShowPopup(false);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    if (color !== customColor) {
      setCustomColor(color);
      setSelectedColor(color);
      setSelectedLabel("Custom Color");
      setShowPopup(false); // Close the popup only when a new color is selected
      setTimeout(() => {
        labelInputRef.current?.focus(); // Focus on the label input
        labelInputRef.current?.select(); // Select the text for overwriting
      }, 0);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Sort colors visually by their hex values
  const sortedColors = Object.entries(monsterColourHex).sort((a, b) => {
    const hexA = parseInt(a[1].substring(1), 16);
    const hexB = parseInt(b[1].substring(1), 16);
    return hexA - hexB;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} ref={dropdownRef}>
      <div>
        <button
          onClick={() => setShowPopup(!showPopup)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            height: "40px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "0.5rem",
            padding: "0.5rem",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: selectedColor,
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            ref={labelInputRef} // Attach ref to the input
            type="text"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            placeholder="Enter color name"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "0.9rem",
              color: "#333",
              background: "transparent",
            }}
          />
        </button>
        {showPopup && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.5rem",
              marginTop: "0.5rem",
              maxHeight: "200px", // Add scroll for the color selection
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="color"
                value={selectedColor} // Always return the currently selected color
                onChange={handleCustomColorChange}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "0.9rem", color: "#333" }}>Custom Color</span>
            </div>
            {sortedColors.map(([label, hex]) => (
              <div
                key={label}
                onClick={() => handlePresetSelect(label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: hex,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <span style={{ fontSize: "0.9rem", color: "#333" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
