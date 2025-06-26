import { useState } from 'react';
import { 
  DEFAULT_FICTION_PILLAR, 
  EMPTY_FICTION_PILLAR,
  validateFictionPillar
} from '../utils/fictionPillarUtils';

/**
 * Custom hook for managing fiction pillar state
 * @returns {Object} State and methods for fiction pillar management
 */
export function useFictionPillarState() {
  const [fictionPillar, setFictionPillar] = useState(() => ({
    ...DEFAULT_FICTION_PILLAR
  }));

  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Update fiction pillar properties
   * @param {Object} updates - Properties to update
   */
  const updateFictionPillar = (updates) => {
    setFictionPillar(prev => {
      const updated = { ...prev, ...updates };
      
      // Validate the updated pillar
      const errors = validateFictionPillar(updated);
      setValidationErrors(errors);
      
      return updated;
    });
  };

  /**
   * Update a specific field
   * @param {string} field - Field name to update
   * @param {string} value - New value
   */
  const updateField = (field, value) => {
    updateFictionPillar({ [field]: value });
  };

  /**
   * Reset to default values
   */
  const resetToDefaults = () => {
    setFictionPillar({ ...DEFAULT_FICTION_PILLAR });
    setValidationErrors({});
  };

  /**
   * Clear all form fields
   */
  const clearForm = () => {
    setFictionPillar({ ...EMPTY_FICTION_PILLAR });
    setValidationErrors({});
  };

  /**
   * Load example data
   * @param {Object} exampleData - Example fiction pillar data
   */
  const loadExample = (exampleData) => {
    setFictionPillar({ ...exampleData });
    const errors = validateFictionPillar(exampleData);
    setValidationErrors(errors);
  };

  /**
   * Check if the current pillar is valid
   * @returns {boolean} True if valid
   */
  const isValid = () => {
    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Get validation status
   * @returns {Object} Validation status object
   */
  const getValidationStatus = () => {
    const errorCount = Object.keys(validationErrors).length;
    return {
      isValid: errorCount === 0,
      errorCount,
      errors: validationErrors
    };
  };

  return {
    // Main fiction pillar object
    fictionPillar,
    updateFictionPillar,
    updateField,
    
    // Form actions
    resetToDefaults,
    clearForm,
    loadExample,
    
    // Individual field accessors
    title: fictionPillar.title,
    wants: fictionPillar.wants,
    doesntWant: fictionPillar.doesntWant,
    sight: fictionPillar.sight,
    sound: fictionPillar.sound,
    smell: fictionPillar.smell,
    embody: fictionPillar.embody,
    
    // Individual field setters
    setTitle: (value) => updateField('title', value),
    setWants: (value) => updateField('wants', value),
    setDoesntWant: (value) => updateField('doesntWant', value),
    setSight: (value) => updateField('sight', value),
    setSound: (value) => updateField('sound', value),
    setSmell: (value) => updateField('smell', value),
    setEmbody: (value) => updateField('embody', value),
    
    // Validation
    validationErrors,
    isValid: isValid(),
    validationStatus: getValidationStatus()
  };
}
