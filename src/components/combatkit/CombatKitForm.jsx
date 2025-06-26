import React from 'react';
import styles from './CombatKitForm.module.css';

function CombatKitForm({ combatKit, onChange, onReset, onClear }) {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className={styles.combatKitForm}>
      <div className={styles.formHeader}>
        <h2>Combat Kit Builder</h2>
        <div className={styles.buttonGroup}>
          <button onClick={onReset} className={styles.defaultsButton}>
            Defaults
          </button>
          <button onClick={onClear} className={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">Scenario Title</label>
        <input
          id="title"
          type="text"
          value={combatKit.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter combat scenario title"
        />
      </div>



      <div className={styles.formGroup}>
        <label htmlFor="features">Features</label>
        <input
          id="features"
          type="text"
          value={combatKit.features || ''}
          onChange={(e) => handleInputChange('features', e.target.value)}
          placeholder="Comma-separated environmental elements (e.g., Stormy waters, cramped decks)"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="threats">Threats</label>
        <textarea
          id="threats"
          value={combatKit.threats || ''}
          onChange={(e) => handleInputChange('threats', e.target.value)}
          placeholder="One threat per line. Use 'Xd' for dice pools or '○○' for suspense&#10;e.g., 4d Waves Crashing&#10;○○ Kraken Tentacles"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="monsters">Monsters</label>
        <textarea
          id="monsters"
          value={combatKit.monsters || ''}
          onChange={(e) => handleInputChange('monsters', e.target.value)}
          placeholder="One monster per line. Format examples:&#10;4d Deckhands (Mook Brutes)&#10;3 Swashbucklers (Tough Marauders)&#10;4d | Pirate Captain (Elite Overseer)"
          rows={4}
        />
      </div>
    </div>
  );
}

export default CombatKitForm;
