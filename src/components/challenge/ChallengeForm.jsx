import React from "react";
import styles from "./ChallengeForm.module.css";

// All props are controlled from parent
export default function ChallengeForm({
  pool, setPool,
  title, setTitle,
  traits, setTraits,
  moves, setMoves,
  failPool, setFailPool,
  failDesc, setFailDesc
}) {
  return (
    <form
      className={styles.form}
      onSubmit={e => e.preventDefault()}
    >
      {/* Common header for Challenge Pool and Name */}
      <div className={styles.sectionHeader}>
        Challenge
      </div>
      <div className={styles.fieldRow}>
        <label className={`${styles.label} ${styles.poolField}`}>
          <span className={styles.labelText}>Pool</span><br />
          <input
            type="number"
            min="1"
            max="99"
            value={pool}
            onChange={e => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              if (val.length > 2) val = val.slice(0, 2);
              setPool(val);
            }}
            className={styles.poolInput}
          />
        </label>
        <label className={`${styles.label} ${styles.nameField}`}>
          <span className={styles.labelText}>Name</span><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={styles.textInput}
          />
        </label>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Traits (one per line)</span><br />
          <textarea
            value={traits}
            onChange={e => setTraits(e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        </label>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Moves (one per line)</span><br />
          <textarea
            value={moves}
            onChange={e => setMoves(e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        </label>
      </div>
      {/* Common header for Fail State */}
      <div className={styles.sectionHeader}>
        Fail State <span className={styles.optionalText}>(optional)</span>
      </div>
      <div className={styles.fieldRow}>
        <label className={`${styles.label} ${styles.poolField}`}>
          <span className={styles.labelText}>Pool</span><br />
          <input
            type="number"
            min="0"
            max="99"
            value={failPool}
            onChange={e => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              if (val.length > 2) val = val.slice(0, 2);
              setFailPool(val);
            }}
            className={styles.poolInput}
          />
        </label>
        <label className={`${styles.label} ${styles.nameField}`}>
          <span className={styles.labelText}>Fail State Description</span><br />
          <input
            type="text"
            value={failDesc}
            onChange={e => setFailDesc(e.target.value)}
            className={styles.textInput}
          />
        </label>
      </div>
    </form>
  );
}
