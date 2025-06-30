/**
 * Utility functions for Fiction Pillar management
 */

/**
 * Default fiction pillar data based on Harvest Festival example
 */
export const DEFAULT_FICTION_PILLAR = {
  title: 'Harvest Festival',
  wants: 'everyone to leave with full bellies',
  doesntWant: 'arguments about winter or toil',
  sight: 'vibrant banners, overflowing carts, bonfires at dusk',
  sound: 'laughter and music, creak of carts, rustle of leaves',
  smell: 'roasted corn, spiced cider, damp post-harvest soil',
  embody: 'bite an apple, play a flute, raise a mug'
};

/**
 * Empty fiction pillar data
 */
export const EMPTY_FICTION_PILLAR = {
  title: '',
  wants: '',
  doesntWant: '',
  sight: '',
  sound: '',
  smell: '',
  embody: ''
};

/**
 * Validate fiction pillar data
 * @param {Object} pillar - Fiction pillar object to validate
 * @returns {Object} Validation errors object
 */
export const validateFictionPillar = (pillar) => {
  const errors = {};
  
  // Title is optional but recommended
  if (!pillar.title || pillar.title.trim().length === 0) {
    errors.title = 'Title is recommended for better organization';
  }
  
  // Sensory information is required for complete pillars
  if (!pillar.sight || pillar.sight.trim().length === 0) {
    errors.sight = 'Sight description is required';
  }
  
  if (!pillar.sound || pillar.sound.trim().length === 0) {
    errors.sound = 'Sound description is required';
  }
  
  if (!pillar.smell || pillar.smell.trim().length === 0) {
    errors.smell = 'Smell description is required';
  }
  
  return errors;
};

/**
 * Generate filename for fiction pillar export
 * @param {string} title - Fiction pillar title
 * @returns {string} Sanitized filename
 */
export const generateFilename = (title) => {
  if (!title) return 'fiction-pillar';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Check if fiction pillar is complete (has all required fields)
 * @param {Object} pillar - Fiction pillar object
 * @returns {boolean} True if pillar is complete
 */
export const isFictionPillarComplete = (pillar) => {
  const errors = validateFictionPillar(pillar);
  return Object.keys(errors).length === 0;
};

/**
 * Get completion status message
 * @param {Object} pillar - Fiction pillar object
 * @returns {string} Status message
 */
export const getCompletionStatus = (pillar) => {
  const errors = validateFictionPillar(pillar);
  const errorCount = Object.keys(errors).length;
  
  if (errorCount === 0) {
    return 'Fiction pillar is complete';
  } else if (errorCount === 1) {
    return '1 field needs attention';
  } else {
    return `${errorCount} fields need attention`;
  }
};

/**
 * Sanitize text input for display
 * @param {string} text - Input text
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  return text.trim();
};

/**
 * Format text for display with proper capitalization
 * @param {string} text - Input text
 * @returns {string} Formatted text
 */
export const formatDisplayText = (text) => {
  if (!text) return '';
  
  const sanitized = sanitizeText(text);
  if (!sanitized) return '';
  
  // Capitalize first letter if it's not already capitalized
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
};

/**
 * Icon mapping for sensory and embody elements
 */
export const SENSORY_ICONS = {
  sight: '/grimwild-tools/images/sensories/sight.png',
  sound: '/grimwild-tools/images/sensories/sound.png',
  smell: '/grimwild-tools/images/sensories/smell.png'
};

export const EMBODY_ICON = '/grimwild-tools/images/icons/hand.png';

/**
 * Get example fiction pillars for inspiration
 * @returns {Array} Array of example fiction pillar objects
 */
export const getExampleFictionPillars = () => {
  return [
    DEFAULT_FICTION_PILLAR,
    {
      title: 'Midnight Market',
      wants: 'secrets to be traded in whispers',
      doesntWant: 'the dawn to break the spell',
      sight: 'flickering lanterns, hooded figures, glinting coins',
      sound: 'hushed bargaining, rustling cloaks, distant bells',
      smell: 'incense and mystery, old parchment, exotic spices',
      embody: 'lean in close, count coins, glance over shoulder'
    },
    {
      title: 'Storm at Sea',
      wants: 'all hands to work together',
      doesntWant: 'panic to spread among the crew',
      sight: 'towering waves, lightning flashes, rain-soaked deck',
      sound: 'howling wind, crashing waves, shouted orders',
      smell: 'salt spray, wet rope, fear-sweat',
      embody: 'grip the rigging, shout over wind, steady your stance'
    }
  ];
};
