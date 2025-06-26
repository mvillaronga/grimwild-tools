import React from 'react';
import ThreatsList from './ThreatsList';
import MonstersList from './MonstersList';
import styles from './CombatKitForm.module.css';

function CombatKitForm({ combatKit, onChange, onReset, onClear, threats, onUpdateThreats, monsters, onUpdateMonsters }) {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Combat Kit Header */}
      <div className={styles.headerRow}>
        <div className={styles.sectionHeader}>
          Combat Kit Builder
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

      <label className={styles.label}>
        <span className={styles.labelText}>Scenario Title</span>
        <input
          type="text"
          value={combatKit.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={styles.textInput}
          placeholder="Enter combat scenario title"
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Features</span>
        <input
          type="text"
          value={combatKit.features || ''}
          onChange={(e) => handleInputChange('features', e.target.value)}
          className={styles.textInput}
          placeholder="Comma-separated environmental elements (e.g., Stormy waters, cramped decks)"
        />
      </label>

      <ThreatsList
        threats={threats}
        onUpdateThreats={onUpdateThreats}
      />

      <MonstersList
        monsters={monsters}
        onUpdateMonsters={onUpdateMonsters}
      />
    </form>
  );
}

export default CombatKitForm;
