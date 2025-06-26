import React, { useState, useEffect, useCallback } from 'react';
import { updateThreat } from '../../utils/threatUtils';
import styles from './ThreatItem.module.css';

function ThreatItem({ threat, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const [values, setValues] = useState({
    pool: threat.pool || '4',
    name: threat.name || ''
  });

  // Update local state when threat prop changes (but avoid infinite loops)
  useEffect(() => {
    setValues(prev => {
      const newPool = threat.pool || '4';
      const newName = threat.name || '';

      // Only update if values actually changed
      if (prev.pool !== newPool || prev.name !== newName) {
        return { pool: newPool, name: newName };
      }
      return prev;
    });
  }, [threat.pool, threat.name]);

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId;
      return (newValues) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const updatedThreat = updateThreat(threat, newValues);
          onUpdate(updatedThreat);
        }, 300); // 300ms delay
      };
    })(),
    [threat, onUpdate]
  );

  const handleInputChange = (field, value) => {
    const newValues = {
      ...values,
      [field]: value
    };
    setValues(newValues);

    // Use debounced update to prevent focus loss
    debouncedUpdate(newValues);
  };

  const handleInputBlur = () => {
    // Immediate update on blur to ensure data is saved
    const updatedThreat = updateThreat(threat, values);
    onUpdate(updatedThreat);
  };

  return (
    <div className={styles.threatItem}>
      <div className={styles.threatForm}>
        <div className={styles.inputSection}>
          {threat.type === 'pool' ? (
            <>
              <div className={styles.poolInputGroup}>
                <input
                  type="number"
                  value={values.pool}
                  onChange={(e) => handleInputChange('pool', e.target.value)}
                  onBlur={handleInputBlur}
                  className={styles.poolInput}
                  min="1"
                  max="12"
                  placeholder="4"
                />
                <span className={styles.diceLabel}>d</span>
              </div>
              <input
                type="text"
                value={values.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={handleInputBlur}
                className={styles.nameInput}
                placeholder="Threat name"
              />
            </>
          ) : (
            <>
              <span className={styles.hazardPrefix}>○○</span>
              <input
                type="text"
                value={values.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={handleInputBlur}
                className={styles.nameInput}
                placeholder="Hazard name"
              />
            </>
          )}
        </div>
        <div className={styles.threatActions}>
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
            title="Delete threat"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreatItem;
