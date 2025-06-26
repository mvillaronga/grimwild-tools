import React from 'react';
import GoalsList from './GoalsList';
import styles from './FactionPoolForm.module.css';

function FactionPoolForm({ 
  factionPool, 
  onChange, 
  onReset, 
  onClear, 
  goals, 
  onAddGoal, 
  onUpdateGoal, 
  onDeleteGoal, 
  onMoveGoal,
  onUpdateResources 
}) {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleResourcesChange = (value) => {
    if (onUpdateResources) {
      onUpdateResources(value);
    } else {
      handleInputChange('resources', value);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Faction Pool Header */}
      <div className={styles.headerRow}>
        <div className={styles.sectionHeader}>
          Faction Pool Builder
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={onReset}
            className={styles.actionButton}
            title="Reset all fields to default values"
          >
            Defaults
          </button>
          <button
            type="button"
            onClick={onClear}
            className={`${styles.actionButton} ${styles.clearButton}`}
            title="Clear all fields"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Title Input */}
      <label className={styles.label}>
        <span className={styles.labelText}>Faction/Campaign Title</span>
        <input
          type="text"
          value={factionPool.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={styles.textInput}
          placeholder="Enter faction or campaign name"
        />
      </label>

      {/* Resources Input */}
      <label className={styles.label}>
        <span className={styles.labelText}>Resources (Optional)</span>
        <textarea
          value={factionPool.resources || ''}
          onChange={(e) => handleResourcesChange(e.target.value)}
          className={styles.textarea}
          placeholder="Enter resources, one per line&#10;e.g.:&#10;Elders (wise, cautious)&#10;Fire archers&#10;Ancient scrolls"
          rows="4"
        />
        <div className={styles.fieldHint}>
          Enter each resource on a separate line. Leave empty if no resources.
        </div>
      </label>

      {/* Goals List */}
      <GoalsList
        goals={goals}
        onAddGoal={onAddGoal}
        onUpdateGoal={onUpdateGoal}
        onDeleteGoal={onDeleteGoal}
        onMoveGoal={onMoveGoal}
      />
    </form>
  );
}

export default FactionPoolForm;
