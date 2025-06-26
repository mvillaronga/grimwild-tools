import { useState } from 'react';
import { 
  DEFAULT_FACTION_POOL, 
  EMPTY_FACTION_POOL,
  createGoal,
  parseResources,
  resourcesToText
} from '../utils/factionPoolUtils';

/**
 * Custom hook for managing faction pool state
 * @returns {Object} State and methods for faction pool management
 */
export function useFactionPoolState() {
  const [factionPool, setFactionPool] = useState(() => ({
    ...DEFAULT_FACTION_POOL,
    resources: resourcesToText(DEFAULT_FACTION_POOL.resources)
  }));

  /**
   * Update faction pool properties
   * @param {Object} updates - Properties to update
   */
  const updateFactionPool = (updates) => {
    setFactionPool(prev => ({ ...prev, ...updates }));
  };

  /**
   * Reset to default values
   */
  const resetToDefaults = () => {
    setFactionPool({
      ...DEFAULT_FACTION_POOL,
      resources: resourcesToText(DEFAULT_FACTION_POOL.resources)
    });
  };

  /**
   * Clear all form fields
   */
  const clearForm = () => {
    setFactionPool({
      ...EMPTY_FACTION_POOL,
      resources: ''
    });
  };

  /**
   * Update goals array
   * @param {Array} goals - New goals array
   */
  const updateGoals = (goals) => {
    updateFactionPool({ goals });
  };

  /**
   * Add a new goal
   * @param {string} pool - Pool size (default: '4')
   * @param {string} description - Goal description (default: '')
   */
  const addGoal = (pool = '4', description = '') => {
    const newGoal = createGoal(pool, description);
    updateGoals([...factionPool.goals, newGoal]);
  };

  /**
   * Update a specific goal
   * @param {Object} updatedGoal - Updated goal object
   */
  const updateGoal = (updatedGoal) => {
    const updatedGoals = factionPool.goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    updateGoals(updatedGoals);
  };

  /**
   * Delete a goal
   * @param {string} goalId - ID of goal to delete
   */
  const deleteGoal = (goalId) => {
    const updatedGoals = factionPool.goals.filter(goal => goal.id !== goalId);
    updateGoals(updatedGoals);
  };

  /**
   * Move a goal up or down in the list
   * @param {string} goalId - ID of goal to move
   * @param {string} direction - 'up' or 'down'
   */
  const moveGoal = (goalId, direction) => {
    const currentIndex = factionPool.goals.findIndex(goal => goal.id === goalId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Check bounds
    if (newIndex < 0 || newIndex >= factionPool.goals.length) return;
    
    const newGoals = [...factionPool.goals];
    const [movedGoal] = newGoals.splice(currentIndex, 1);
    newGoals.splice(newIndex, 0, movedGoal);
    
    updateGoals(newGoals);
  };

  /**
   * Get parsed resources array from text
   * @returns {Array} Array of resource strings
   */
  const getParsedResources = () => {
    return parseResources(factionPool.resources);
  };

  return {
    // Main faction pool object
    factionPool,
    updateFactionPool,
    
    // Form actions
    resetToDefaults,
    clearForm,
    
    // Goals management
    goals: factionPool.goals,
    updateGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    moveGoal,
    
    // Resources management
    resources: factionPool.resources,
    parsedResources: getParsedResources(),
    updateResources: (resources) => updateFactionPool({ resources })
  };
}
