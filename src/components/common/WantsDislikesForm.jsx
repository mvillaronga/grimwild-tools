import React from 'react';
import styles from './WantsDislikesForm.module.css';

function WantsDislikesForm({ 
  wants, 
  setWants, 
  doesntWant, 
  setDoesntWant, 
  wantsPlaceholder = "What this wants to achieve",
  doesntWantPlaceholder = "What this wants to avoid",
  sectionTitle = "Motivations"
}) {
  return (
    <div className={styles.wantsDislikesForm}>
      <div className={styles.sectionHeader}>
        {sectionTitle}
      </div>
      
      <label className={styles.label}>
        <span className={styles.labelText}>Wants</span>
        <input
          type="text"
          value={wants}
          onChange={(e) => setWants(e.target.value)}
          className={styles.textInput}
          placeholder={wantsPlaceholder}
        />
      </label>
      
      <label className={styles.label}>
        <span className={styles.labelText}>Doesn't Want</span>
        <input
          type="text"
          value={doesntWant}
          onChange={(e) => setDoesntWant(e.target.value)}
          className={styles.textInput}
          placeholder={doesntWantPlaceholder}
        />
      </label>
    </div>
  );
}

export default WantsDislikesForm;
