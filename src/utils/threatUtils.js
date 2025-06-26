/**
 * Utility functions for managing threats in Combat Kit
 * Handles conversion between text format and structured threat objects
 */

/**
 * Generate a unique ID for threats
 */
export const generateThreatId = () => {
  return `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Note: parseThreatsFromText function removed - no longer needed with native array storage

/**
 * Convert structured threat objects to text format for display
 * @param {Array} threats - Array of threat objects
 * @returns {string} Text representation for display in CombatKitCard
 */
export const convertThreatsToText = (threats) => {
  if (!Array.isArray(threats)) {
    return '';
  }

  return threats
    .filter(threat => threat.name && threat.name.trim()) // Only include threats with names for display
    .map(threat => {
      if (threat.type === 'pool') {
        return `${threat.pool}d ${threat.name.trim()}`;
      } else if (threat.type === 'hazard') {
        return `○○ ${threat.name.trim()}`;
      }
      return threat.name.trim();
    })
    .join('\n');
};

/**
 * Create a new pool threat object
 * @param {string} pool - Pool value (e.g., "4")
 * @param {string} name - Threat name
 * @returns {Object} Pool threat object
 */
export const createPoolThreat = (pool = '4', name = '') => {
  return {
    id: generateThreatId(),
    type: 'pool',
    pool: pool.toString(),
    name: name.trim()
  };
};

/**
 * Create a new hazard threat object
 * @param {string} name - Threat name
 * @returns {Object} Hazard threat object
 */
export const createHazardThreat = (name = '') => {
  return {
    id: generateThreatId(),
    type: 'hazard',
    name: name.trim()
  };
};

/**
 * Validate a threat object
 * @param {Object} threat - Threat object to validate
 * @returns {boolean} True if valid
 */
export const validateThreat = (threat) => {
  if (!threat || typeof threat !== 'object') {
    return false;
  }

  if (!threat.id || !threat.type || !threat.name?.trim()) {
    return false;
  }

  if (threat.type === 'pool') {
    return threat.pool && !isNaN(parseInt(threat.pool));
  }

  if (threat.type === 'hazard') {
    return true; // Only needs name for hazards
  }

  return false;
};

/**
 * Update a threat object with new values
 * @param {Object} threat - Original threat object
 * @param {Object} updates - Updates to apply
 * @returns {Object} Updated threat object
 */
export const updateThreat = (threat, updates) => {
  const updated = { ...threat, ...updates };
  
  // Ensure pool is a string for consistency
  if (updated.type === 'pool' && updated.pool) {
    updated.pool = updated.pool.toString();
  }
  
  // Trim name
  if (updated.name) {
    updated.name = updated.name.trim();
  }
  
  return updated;
};

/**
 * Reorder threats array
 * @param {Array} threats - Original threats array
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Destination index
 * @returns {Array} Reordered threats array
 */
export const reorderThreats = (threats, fromIndex, toIndex) => {
  if (!Array.isArray(threats) || fromIndex === toIndex) {
    return threats;
  }

  const result = [...threats];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  return result;
};
