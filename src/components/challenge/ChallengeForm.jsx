import React from "react";
import styles from "./ChallengeForm.module.css";

export default function ChallengeForm({
  pool, setPool,
  title, setTitle,
  traits, setTraits,
  moves, setMoves,
  failPool, setFailPool,
  failDesc, setFailDesc,
  resetToDefaults,
  clearForm
}) {
  return (
    <form
      className={styles.form}
      onSubmit={e => e.preventDefault()}
    >
      {/* Challenge Header */}
      <div className={styles.headerRow}>
        <div className={styles.sectionHeader}>
          Challenge
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={resetToDefaults}
            className={styles.actionButton}
            title="Reset all fields to default values"
          >
            Defaults
          </button>
          <button
            type="button"
            onClick={clearForm}
            className={`${styles.actionButton} ${styles.clearButton}`}
            title="Clear all fields"
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Pool and Title Row */}
      <div className={styles.fieldRow}>
        <label className={`${styles.label} ${styles.poolField}`}>
          <span className={styles.labelText}>Pool</span>
          <input
            type="number"
            min="1"
            max="12"
            value={pool}
            onChange={e => {
              let val = parseInt(e.target.value) || 1;
              if (val < 1) val = 1;
              if (val > 12) val = 12;
              setPool(val.toString());
            }}
            className={styles.numberInput}
          />
        </label>
        
        <label className={`${styles.label} ${styles.titleField}`}>
          <span className={styles.labelText}>Title</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={styles.textInput}
            placeholder="Challenge Name"
          />
        </label>
      </div>

      {/* Traits */}
      <label className={styles.label}>
        <span className={styles.labelText}>Traits</span>
        <textarea
          value={traits}
          onChange={e => setTraits(e.target.value)}
          className={styles.textarea}
          placeholder="Enter traits, one per line"
          rows={4}
        />
      </label>

      {/* Moves */}
      <label className={styles.label}>
        <span className={styles.labelText}>Moves</span>
        <textarea
          value={moves}
          onChange={e => setMoves(e.target.value)}
          className={styles.textarea}
          placeholder="Enter moves, one per line"
          rows={4}
        />
      </label>

      {/* Failure Conditions */}
      <div className={styles.sectionHeader}>
        Failure (Optional)
      </div>
      
      <div className={styles.fieldRow}>
        <label className={`${styles.label} ${styles.poolField}`}>
          <span className={styles.labelText}>Fail Pool</span>
          <input
            type="number"
            min="0"
            max="12"
            value={failPool}
            onChange={e => {
              let val = parseInt(e.target.value) || 0;
              if (val < 0) val = 0;
              if (val > 12) val = 12;
              setFailPool(val.toString());
            }}
            className={styles.numberInput}
          />
        </label>
        
        <label className={`${styles.label} ${styles.titleField}`}>
          <span className={styles.labelText}>Fail Description</span>
          <input
            type="text"
            value={failDesc}
            onChange={e => setFailDesc(e.target.value)}
            className={styles.textInput}
            placeholder="What happens on failure"
          />
        </label>
      </div>
    </form>
  );
}
