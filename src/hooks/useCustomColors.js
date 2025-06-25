import { useState, useEffect, useCallback } from 'react';

const CUSTOM_COLORS_KEY = 'grimwild-custom-colors';

export function useCustomColors() {
  const [customColors, setCustomColors] = useState({});

  // Load custom colors from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_COLORS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomColors(parsed);
      }
    } catch (error) {
      console.warn('Failed to load custom colors from localStorage:', error);
    }
  }, []);

  // Save custom colors to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(customColors));
    } catch (error) {
      console.warn('Failed to save custom colors to localStorage:', error);
    }
  }, [customColors]);

  const addCustomColor = useCallback((name, hexValue) => {
    // Ensure the name is properly formatted (lowercase, two words)
    const formattedName = name.toLowerCase().trim();
    const words = formattedName.split(/\s+/);
    
    if (words.length !== 2) {
      throw new Error('Color name must be exactly two words');
    }
    
    // Validate hex value
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
      throw new Error('Invalid hex color value');
    }

    setCustomColors(prev => ({
      ...prev,
      [formattedName]: hexValue
    }));

    return formattedName;
  }, []);

  const removeCustomColor = useCallback((name) => {
    setCustomColors(prev => {
      const newColors = { ...prev };
      delete newColors[name];
      return newColors;
    });
  }, []);

  const hasCustomColor = useCallback((name) => {
    return name in customColors;
  }, [customColors]);

  const getCustomColorHex = useCallback((name) => {
    return customColors[name] || null;
  }, [customColors]);

  const getAllCustomColors = useCallback(() => {
    return { ...customColors };
  }, [customColors]);

  const clearAllCustomColors = useCallback(() => {
    setCustomColors({});
  }, []);

  return {
    customColors,
    addCustomColor,
    removeCustomColor,
    hasCustomColor,
    getCustomColorHex,
    getAllCustomColors,
    clearAllCustomColors
  };
}
