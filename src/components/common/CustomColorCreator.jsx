import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from "./CustomColorCreator.module.css";

export default function CustomColorCreator({ onAddColor, onCancel }) {
  const [color, setColor] = useState("#ff0000");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only letters, spaces, and limit to reasonable length
    const cleanValue = value.replace(/[^a-zA-Z\s]/g, '').substring(0, 30);
    setName(cleanValue);
    setError("");
  };

  const validateAndSubmit = () => {
    const words = name.trim().split(/\s+/).filter(word => word.length > 0);

    if (words.length === 0) {
      setError("Please enter a name for the color");
      return;
    }

    if (words.length === 1) {
      setError("Please enter exactly two words");
      return;
    }

    if (words.length > 2) {
      setError("Please enter exactly two words only");
      return;
    }

    if (words.some(word => word.length < 2)) {
      setError("Each word must be at least 2 characters long");
      return;
    }

    const twoWordName = words.join(' ').toLowerCase();
    try {
      onAddColor(twoWordName, color);
    } catch (error) {
      console.error('Error in onAddColor:', error);
      setError(`Error: ${error.message}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      validateAndSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Create Custom Color</h3>
          <button 
            className={styles.closeButton}
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.colorSection}>
            <label className={styles.label}>Choose Color:</label>
            <div className={styles.pickerContainer}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div className={styles.colorPreview}>
              <div 
                className={styles.previewSwatch}
                style={{ backgroundColor: color }}
              />
              <span className={styles.hexValue}>{color}</span>
            </div>
          </div>
          
          <div className={styles.nameSection}>
            <label className={styles.label}>
              Color Name (exactly two words):
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyPress}
              className={styles.nameInput}
              placeholder="e.g. crimson flame"
              autoFocus
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={styles.addButton}
            onClick={validateAndSubmit}
            disabled={!name.trim()}
          >
            Add Color
          </button>
        </div>
      </div>
    </div>
  );
}
