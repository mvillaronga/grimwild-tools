import React from 'react';
import styles from './SensoryForm.module.css';

function SensoryForm({ 
  sight, 
  setSight, 
  sound, 
  setSound, 
  smell, 
  setSmell, 
  required = false,
  sectionTitle = "Sensory Information"
}) {
  return (
    <div className={styles.sensoryForm}>
      <div className={styles.sectionHeader}>
        {sectionTitle}
      </div>

      <label className={styles.label}>
        <span className={styles.labelText}>Sight</span>
        <input
          type="text"
          value={sight}
          onChange={(e) => setSight(e.target.value)}
          className={styles.textInput}
          placeholder="What this looks like"
          required={required}
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Sound</span>
        <input
          type="text"
          value={sound}
          onChange={(e) => setSound(e.target.value)}
          className={styles.textInput}
          placeholder="What this sounds like"
          required={required}
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Smell</span>
        <input
          type="text"
          value={smell}
          onChange={(e) => setSmell(e.target.value)}
          className={styles.textInput}
          placeholder="What this smells like"
          required={required}
        />
      </label>
    </div>
  );
}

export default SensoryForm;
