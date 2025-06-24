import React, { useState, useEffect, useRef } from "react";
import { monsterColourHex } from "./colors";
import styles from "./ColorPicker.module.css";

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
    <div className={styles.container} ref={dropdownRef}>
      <div>
        <button
          onClick={() => setShowPopup(!showPopup)}
          className={styles.pickerButton}
        >
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: selectedColor }}
          />
          <input
            ref={labelInputRef}
            type="text"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            placeholder="Enter color name"
            className={styles.labelInput}
          />
        </button>
        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.colorOption}>
              <input
                type="color"
                value={selectedColor}
                onChange={handleCustomColorChange}
                className={styles.customColorInput}
              />
              <span className={styles.customColorLabel}>Custom Color</span>
            </div>
            {sortedColors.map(([label, hex]) => (
              <div
                key={label}
                onClick={() => handlePresetSelect(label)}
                className={styles.colorOption}
              >
                <div
                  className={styles.colorOptionSwatch}
                  style={{ backgroundColor: hex }}
                />
                <span className={styles.colorOptionLabel}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
