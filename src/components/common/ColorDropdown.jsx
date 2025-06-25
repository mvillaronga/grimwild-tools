import React, { useState, useRef, useEffect } from "react";
import { monsterColourHex } from "../../utils/colors";
import CustomColorCreator from "./CustomColorCreator";
import styles from "./ColorDropdown.module.css";

// Helper function to convert hex to HSL
function hexToHsl(hex) {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return [0, 0, 0]; // Return default values for invalid hex
  }

  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
}

// Helper function to sort colors by hue, then by saturation, then by lightness
function sortColorsByHue(colorNames, allColors) {
  return colorNames.sort((a, b) => {
    const hexA = allColors[a];
    const hexB = allColors[b];

    const [hueA, satA, lightA] = hexToHsl(hexA);
    const [hueB, satB, lightB] = hexToHsl(hexB);

    // First sort by hue
    if (Math.abs(hueA - hueB) > 5) { // 5 degree tolerance for similar hues
      return hueA - hueB;
    }

    // If hues are similar, sort by saturation (more saturated first)
    if (Math.abs(satA - satB) > 0.1) {
      return satB - satA;
    }

    // If saturation is similar, sort by lightness (darker first)
    return lightA - lightB;
  });
}

export default function ColorDropdown({
  colorValue,
  onColorChange,
  labelValue,
  onLabelChange,
  customColorsState
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const dropdownRef = useRef(null);
  const { customColors, addCustomColor } = customColorsState;

  // Combine predefined and custom colors, then sort
  const allColors = { ...monsterColourHex, ...customColors };
  const colorOptions = sortColorsByHue(Object.keys(allColors), allColors);

  // Sync label with color value when color changes
  useEffect(() => {
    if (colorValue && allColors[colorValue] && labelValue !== colorValue) {
      onLabelChange(colorValue);
    }
  }, [colorValue, labelValue, onLabelChange, allColors]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorSelection = (selectedValue) => {
    if (selectedValue === "create-custom") {
      setShowCustomCreator(true);
      setIsOpen(false);
    } else if (selectedValue) {
      onColorChange(selectedValue);
      onLabelChange(selectedValue); // Always set label to match color name
      setIsOpen(false);
    } else {
      onColorChange("");
      onLabelChange("");
      setIsOpen(false);
    }
  };

  const handleCustomColorAdd = (name, hexValue) => {
    try {
      const formattedName = addCustomColor(name, hexValue);
      onColorChange(formattedName);
      onLabelChange(formattedName);
      setShowCustomCreator(false);
    } catch (error) {
      console.error('Failed to add custom color:', error);
      alert(`Error adding custom color: ${error.message}`);
    }
  };

  const handleCustomColorCancel = () => {
    setShowCustomCreator(false);
  };

  // Get the display color for preview
  const getDisplayColor = () => {
    return allColors[colorValue] || '#ccc';
  };

  const getCurrentColorName = () => {
    return colorValue || "Select a color";
  };

  return (
    <div className={styles.colorDropdown} ref={dropdownRef}>
      <div 
        className={styles.dropdownTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: getDisplayColor() }}
        />
        <span className={styles.colorName}>{getCurrentColorName()}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={styles.dropdownItem}
            onClick={() => handleColorSelection("")}
          >
            <div className={styles.colorSwatch} style={{ backgroundColor: '#ccc' }} />
            <span className={styles.colorText}>Select a color</span>
          </div>

          <div
            className={`${styles.dropdownItem} ${styles.createCustomItem}`}
            onClick={() => handleColorSelection("create-custom")}
          >
            <div className={styles.createCustomIcon}>+</div>
            <span className={styles.colorText}>Create Custom Color</span>
          </div>

          <div className={styles.divider} />

          {colorOptions.map((colorName) => {
            const isCustom = customColors[colorName];
            return (
              <div
                key={colorName}
                className={`${styles.dropdownItem} ${colorValue === colorName ? styles.selected : ''} ${isCustom ? styles.customColor : ''}`}
                onClick={() => handleColorSelection(colorName)}
              >
                <div
                  className={styles.colorSwatch}
                  style={{ backgroundColor: allColors[colorName] }}
                />
                <span className={styles.colorText}>
                  {colorName}
                  {isCustom && <span className={styles.customBadge}>custom</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {showCustomCreator && (
        <CustomColorCreator
          onAddColor={handleCustomColorAdd}
          onCancel={handleCustomColorCancel}
        />
      )}
    </div>
  );
}
