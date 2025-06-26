import React from 'react';
import styles from './CombatKitForm.module.css';

function CombatKitForm({ combatKit, onChange, onReset, onClear }) {
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

      <label className={styles.label}>
        <span className={styles.labelText}>Threats</span>
        <textarea
          value={combatKit.threats || ''}
          onChange={(e) => handleInputChange('threats', e.target.value)}
          className={styles.textarea}
          placeholder="One threat per line. Use 'Xd' for dice pools or '○○' for suspense&#10;e.g., 4d Waves Crashing&#10;○○ Kraken Tentacles"
          rows={3}
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Monsters</span>
        <textarea
          value={combatKit.monsters || ''}
          onChange={(e) => handleInputChange('monsters', e.target.value)}
          className={styles.textarea}
          placeholder="One monster per line. Format examples:&#10;4d Deckhands (Mook Brutes)&#10;3 Swashbucklers (Tough Marauders)&#10;4d | Pirate Captain (Elite Overseer)"
          rows={4}
        />
      </label>
    </form>
  );
}

export default CombatKitForm;
