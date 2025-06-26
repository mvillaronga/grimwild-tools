import React, { useState, useEffect, useCallback } from 'react';
import { validateGoal } from '../../utils/factionPoolUtils';
import styles from './GoalItem.module.css';

function GoalItem({ goal, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const [values, setValues] = useState({
    pool: goal.pool || '4',
    description: goal.description || ''
  });
  const [errors, setErrors] = useState({});

  // Update local state when goal prop changes (but avoid infinite loops)
  useEffect(() => {
    setValues(prev => {
      const newPool = goal.pool || '4';
      const newDescription = goal.description || '';

      // Only update if values actually changed
      if (prev.pool !== newPool || prev.description !== newDescription) {
        return { pool: newPool, description: newDescription };
      }
      return prev;
    });
  }, [goal.pool, goal.description]);

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId;
      return (updatedGoal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onUpdate(updatedGoal);
        }, 300);
      };
    })(),
    [onUpdate]
  );

  const handleInputChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Create updated goal object
    const updatedGoal = { ...goal, [field]: value };
    
    // Validate the updated goal
    const validationErrors = validateGoal(updatedGoal);
    setErrors(validationErrors);
    
    // Only update parent if no validation errors
    if (Object.keys(validationErrors).length === 0) {
      debouncedUpdate(updatedGoal);
    }
  };

  const handleInputBlur = () => {
    // Force update on blur to ensure consistency
    const updatedGoal = { ...goal, ...values };
    const validationErrors = validateGoal(updatedGoal);
    
    if (Object.keys(validationErrors).length === 0) {
      onUpdate(updatedGoal);
    }
  };

  return (
    <div className={styles.goalItem}>
      <div className={styles.goalForm}>
        <div className={styles.inputSection}>
          <div className={styles.poolInputGroup}>
            <input
              type="number"
              value={values.pool}
              onChange={(e) => handleInputChange('pool', e.target.value)}
              onBlur={handleInputBlur}
              className={`${styles.poolInput} ${errors.pool ? styles.inputError : ''}`}
              min="1"
              max="12"
              placeholder="4"
              title={errors.pool || 'Pool size (1-12 dice)'}
            />
            <span className={styles.diceLabel}>d</span>
          </div>
          <input
            type="text"
            value={values.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onBlur={handleInputBlur}
            className={`${styles.descriptionInput} ${errors.description ? styles.inputError : ''}`}
            placeholder="Goal description"
            title={errors.description || 'Enter goal description'}
          />
        </div>

        <div className={styles.goalActions}>
          <div className={styles.moveButtons}>
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!canMoveUp}
              className={styles.moveButton}
              title="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!canMoveDown}
              className={styles.moveButton}
              title="Move down"
            >
              ↓
            </button>
          </div>
          <button
            type="button"
            onClick={onDelete}
            className={styles.deleteButton}
            title="Delete goal"
          >
            🗑
          </button>
        </div>
      </div>

      {/* Error display */}
      {(errors.pool || errors.description) && (
        <div className={styles.errorMessages}>
          {errors.pool && <div className={styles.errorMessage}>{errors.pool}</div>}
          {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
        </div>
      )}
    </div>
  );
}

export default GoalItem;
