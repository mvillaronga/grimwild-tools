/**
 * Utility functions for Faction Pool management
 */

let goalIdCounter = 0;

/**
 * Generate a unique ID for goals
 * @returns {string} Unique goal ID
 */
export const generateGoalId = () => {
  goalIdCounter += 1;
  return `goal_${Date.now()}_${goalIdCounter}`;
};

/**
 * Create a new goal object
 * @param {string} pool - Pool size (1-12)
 * @param {string} description - Goal description
 * @returns {Object} Goal object
 */
export const createGoal = (pool = '4', description = '') => {
  return {
    id: generateGoalId(),
    pool: pool.toString(),
    description: description.trim()
  };
};

/**
 * Validate goal data
 * @param {Object} goal - Goal object to validate
 * @returns {Object} Validation errors object
 */
export const validateGoal = (goal) => {
  const errors = {};
  
  // Validate pool size
  const poolNum = parseInt(goal.pool);
  if (isNaN(poolNum) || poolNum < 1 || poolNum > 12) {
    errors.pool = 'Pool size must be between 1 and 12';
  }
  
  // Validate description
  if (!goal.description || goal.description.trim().length === 0) {
    errors.description = 'Description is required';
  }
  
  return errors;
};

/**
 * Update a goal in the goals array
 * @param {Array} goals - Current goals array
 * @param {Object} updatedGoal - Updated goal object
 * @returns {Array} Updated goals array
 */
export const updateGoal = (goals, updatedGoal) => {
  return goals.map(goal => 
    goal.id === updatedGoal.id ? updatedGoal : goal
  );
};

/**
 * Move a goal up or down in the list
 * @param {Array} goals - Current goals array
 * @param {string} goalId - ID of goal to move
 * @param {string} direction - 'up' or 'down'
 * @returns {Array} Reordered goals array
 */
export const moveGoal = (goals, goalId, direction) => {
  const currentIndex = goals.findIndex(goal => goal.id === goalId);
  if (currentIndex === -1) return goals;
  
  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  
  // Check bounds
  if (newIndex < 0 || newIndex >= goals.length) return goals;
  
  const newGoals = [...goals];
  const [movedGoal] = newGoals.splice(currentIndex, 1);
  newGoals.splice(newIndex, 0, movedGoal);
  
  return newGoals;
};

/**
 * Format goal description with initial caps
 * @param {string} description - Raw description text
 * @returns {string} Formatted description with initial caps
 */
export const formatGoalDescription = (description) => {
  if (!description) return '';
  
  return description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Parse resources text into array
 * @param {string} resourcesText - Multi-line resources text
 * @returns {Array} Array of resource strings
 */
export const parseResources = (resourcesText) => {
  if (!resourcesText) return [];
  
  return resourcesText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

/**
 * Convert resources array to text
 * @param {Array} resources - Array of resource strings
 * @returns {string} Multi-line resources text
 */
export const resourcesToText = (resources) => {
  if (!resources || resources.length === 0) return '';
  return resources.join('\n');
};

/**
 * Generate filename for faction pool export
 * @param {string} title - Faction pool title
 * @returns {string} Sanitized filename
 */
export const generateFilename = (title) => {
  if (!title) return 'faction-pool';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Default faction pool data
 */
export const DEFAULT_FACTION_POOL = {
  title: 'Village of Elit',
  goals: [
    createGoal('4', 'Ask Baron for Help'),
    createGoal('8', 'Build a Wall')
  ],
  resources: [
    'Elders (wise, cautious)',
    'Fire archers'
  ]
};

/**
 * Empty faction pool data
 */
export const EMPTY_FACTION_POOL = {
  title: '',
  goals: [],
  resources: []
};

/**
 * Get default goals for testing
 * @returns {Array} Array of default goal objects
 */
export const getDefaultGoals = () => {
  return [
    createGoal('4', 'Ask Baron for Help'),
    createGoal('8', 'Build a Wall')
  ];
};

/**
 * Get default resources for testing
 * @returns {Array} Array of default resource strings
 */
export const getDefaultResources = () => {
  return [
    'Elders (wise, cautious)',
    'Fire archers'
  ];
};
