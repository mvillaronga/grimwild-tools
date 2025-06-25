import React from "react";
import { monsterColourHex } from "../../utils/colors";
import styles from "./ColorPicker.module.css";

export default function ColorPicker({ 
  label, 
  colorValue, 
  onColorChange, 
  labelValue, 
  onLabelChange 
}) {
  const colorOptions = Object.keys(monsterColourHex);

  return (
    <div className={styles.colorPicker}>
      <div className={styles.colorHeader}>
        <span className={styles.colorLabel}>{label}</span>
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: monsterColourHex[colorValue] || '#ccc' }}
        />
      </div>
      
      <div className={styles.colorInputs}>
        <label className={styles.inputLabel}>
          <span className={styles.inputLabelText}>Color</span>
          <select
            value={colorValue}
            onChange={(e) => onColorChange(e.target.value)}
            className={styles.colorSelect}
          >
            <option value="">Select a color</option>
            {colorOptions.map((colorName) => (
              <option key={colorName} value={colorName}>
                {colorName}
              </option>
            ))}
          </select>
        </label>
        
        <label className={styles.inputLabel}>
          <span className={styles.inputLabelText}>Label</span>
          <input
            type="text"
            value={labelValue}
            onChange={(e) => onLabelChange(e.target.value)}
            className={styles.labelInput}
            placeholder="Color description"
          />
        </label>
      </div>
    </div>
  );
}
