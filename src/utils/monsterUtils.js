/**
 * Utility functions for managing monsters in Combat Kit
 * Handles creation, validation, and formatting of monster objects
 */

/**
 * Available monster tiers
 */
export const MONSTER_TIERS = [
  'Mook',
  'Tough', 
  'Elite',
  'Boss'
];

/**
 * Available monster roles
 */
export const MONSTER_ROLES = [
  'Blaster',
  'Brute',
  'Lurker',
  'Marauder',
  'Marksman',
  'Overseer',
  'Predator',
  'Protector',
  'Skirmisher',
  'Swarmer',
  'Tactician',
  'Trickster'
];

/**
 * Generate a unique ID for monsters
 */
export const generateMonsterId = () => {
  return `monster_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new monster object
 * @param {string} size - Monster size (1-12)
 * @param {string} name - Monster name/description
 * @param {string} tier - Monster tier (Mook, Tough, Elite, Boss)
 * @param {string} role - Monster role (from MONSTER_ROLES)
 * @returns {Object} Monster object
 */
export const createMonster = (size = '4', name = '', tier = 'Mook', role = 'Brute') => {
  return {
    id: generateMonsterId(),
    size: size.toString(),
    name: name.trim(),
    tier,
    role
  };
};

/**
 * Validate a monster object
 * @param {Object} monster - Monster object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateMonster = (monster) => {
  const errors = [];
  
  if (!monster || typeof monster !== 'object') {
    return { isValid: false, errors: ['Invalid monster object'] };
  }

  // Validate size
  if (!monster.size || monster.size.trim() === '') {
    errors.push('Size is required');
  } else {
    const sizeNum = parseInt(monster.size);
    if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 12) {
      errors.push('Size must be a number between 1 and 12');
    }
  }

  // Validate name
  if (!monster.name || monster.name.trim() === '') {
    errors.push('Name is required');
  }

  // Validate tier
  if (!monster.tier || !MONSTER_TIERS.includes(monster.tier)) {
    errors.push('Valid tier is required');
  }

  // Validate role
  if (!monster.role || !MONSTER_ROLES.includes(monster.role)) {
    errors.push('Valid role is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format monster for display based on tier rules
 * @param {Object} monster - Monster object
 * @returns {string} Formatted monster string
 */
export const formatMonsterForDisplay = (monster) => {
  if (!monster || !monster.name || !monster.tier || !monster.role) {
    return '';
  }

  const tierRole = `(${monster.tier} ${monster.role})`;
  const size = monster.size || '1';
  const name = monster.name.trim();

  switch (monster.tier) {
    case 'Mook':
      return `${size}d ${name} ${tierRole}`;
    case 'Tough':
      return `${size} ${name} ${tierRole}`;
    case 'Elite':
    case 'Boss':
      return `${size}d | ${name} ${tierRole}`;
    default:
      return `${size}d ${name} ${tierRole}`;
  }
};

/**
 * Convert array of monsters to text format for display
 * @param {Array} monsters - Array of monster objects
 * @returns {string} Text representation for display
 */
export const convertMonstersToText = (monsters) => {
  if (!Array.isArray(monsters)) {
    return '';
  }

  return monsters
    .filter(monster => monster.name && monster.name.trim()) // Only include monsters with names
    .map(monster => formatMonsterForDisplay(monster))
    .join('\n');
};

/**
 * Update a monster object with new values
 * @param {Object} monster - Original monster object
 * @param {Object} updates - Updates to apply
 * @returns {Object} Updated monster object
 */
export const updateMonster = (monster, updates) => {
  const updated = { ...monster, ...updates };
  
  // Ensure size is a string for consistency
  if (updated.size) {
    updated.size = updated.size.toString();
  }
  
  // Trim name
  if (updated.name) {
    updated.name = updated.name.trim();
  }
  
  return updated;
};

/**
 * Reorder monsters array
 * @param {Array} monsters - Original monsters array
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Destination index
 * @returns {Array} Reordered monsters array
 */
export const reorderMonsters = (monsters, fromIndex, toIndex) => {
  if (!Array.isArray(monsters) || fromIndex === toIndex) {
    return monsters;
  }

  const result = [...monsters];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  return result;
};

/**
 * Get default monsters for Combat Kit
 * @returns {Array} Array of default monster objects
 */
export const getDefaultMonsters = () => {
  return [
    createMonster('4', 'Deckhands', 'Mook', 'Brute'),
    createMonster('4', 'Rigging Archers', 'Mook', 'Marksman'),
    createMonster('3', 'Swashbucklers', 'Tough', 'Marauder'),
    createMonster('4', 'Pirate Captain', 'Elite', 'Overseer')
  ];
};
