import React, { useState, useEffect, useCallback } from 'react';
import TierDropdown from './TierDropdown';
import RoleDropdown from './RoleDropdown';
import { updateMonster, validateMonster } from '../../utils/monsterUtils';
import styles from './MonsterItem.module.css';

function MonsterItem({ monster, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const [values, setValues] = useState({
    size: monster.size || '4',
    name: monster.name || '',
    tier: monster.tier || 'Mook',
    role: monster.role || 'Brute'
  });

  const [errors, setErrors] = useState({});

  // Update local state when monster prop changes (but avoid infinite loops)
  useEffect(() => {
    setValues(prev => {
      const newSize = monster.size || '4';
      const newName = monster.name || '';
      const newTier = monster.tier || 'Mook';
      const newRole = monster.role || 'Brute';
      
      // Only update if values actually changed
      if (prev.size !== newSize || prev.name !== newName || 
          prev.tier !== newTier || prev.role !== newRole) {
        return { size: newSize, name: newName, tier: newTier, role: newRole };
      }
      return prev;
    });
  }, [monster.size, monster.name, monster.tier, monster.role]);

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId;
      return (newValues) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const updatedMonster = updateMonster(monster, newValues);
          onUpdate(updatedMonster);
        }, 300); // 300ms delay
      };
    })(),
    [monster, onUpdate]
  );

  const validateField = (field, value, allValues = values) => {
    const testMonster = updateMonster(monster, { ...allValues, [field]: value });
    const validation = validateMonster(testMonster);

    const fieldErrors = {};
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        if (error.toLowerCase().includes('size') && field === 'size') {
          fieldErrors.size = error;
        } else if (error.toLowerCase().includes('name') && field === 'name') {
          fieldErrors.name = error;
        } else if (error.toLowerCase().includes('tier') && field === 'tier') {
          fieldErrors.tier = error;
        } else if (error.toLowerCase().includes('role') && field === 'role') {
          fieldErrors.role = error;
        }
      });
    }

    setErrors(prev => ({ ...prev, ...fieldErrors, [field]: fieldErrors[field] }));
    return Object.keys(fieldErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newValues = {
      ...values,
      [field]: value
    };
    setValues(newValues);

    // Validate the field
    validateField(field, value, newValues);

    // Use debounced update to prevent focus loss
    debouncedUpdate(newValues);
  };

  const handleInputBlur = () => {
    // Validate all fields on blur
    const testMonster = updateMonster(monster, values);
    const validation = validateMonster(testMonster);

    if (validation.isValid) {
      setErrors({});
    }

    // Immediate update on blur to ensure data is saved
    const updatedMonster = updateMonster(monster, values);
    onUpdate(updatedMonster);
  };

  return (
    <div className={styles.monsterItem}>
      <div className={styles.monsterForm}>
        <div className={styles.inputSection}>
          <div className={styles.topRow}>
            <div className={styles.sizeInputGroup}>
              <input
                type="number"
                value={values.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                onBlur={handleInputBlur}
                className={`${styles.sizeInput} ${errors.size ? styles.inputError : ''}`}
                min="1"
                max="12"
                placeholder="4"
                title={errors.size || ''}
              />
            </div>
            <input
              type="text"
              value={values.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={handleInputBlur}
              className={`${styles.nameInput} ${errors.name ? styles.inputError : ''}`}
              placeholder="Enter monster name or description"
              title={errors.name || ''}
            />
          </div>
          <div className={styles.bottomRow}>
            <TierDropdown
              value={values.tier}
              onChange={(value) => {
                handleInputChange('tier', value);
                handleInputBlur(); // Immediate update for dropdowns
              }}
              className={styles.tierDropdown}
            />
            <RoleDropdown
              value={values.role}
              onChange={(value) => {
                handleInputChange('role', value);
                handleInputBlur(); // Immediate update for dropdowns
              }}
              className={styles.roleDropdown}
            />
          </div>
        </div>
        <div className={styles.monsterActions}>
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
            title="Delete monster"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonsterItem;
