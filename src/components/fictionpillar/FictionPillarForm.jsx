import React from 'react';
import WantsDislikesForm from '../common/WantsDislikesForm';
import SensoryForm from '../common/SensoryForm';
import styles from './FictionPillarForm.module.css';

function FictionPillarForm({ 
  fictionPillar,
  setTitle,
  setWants,
  setDoesntWant,
  setSight,
  setSound,
  setSmell,
  setEmbody,
  onReset,
  onClear,
  validationErrors = {}
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Fiction Pillar Header */}
      <div className={styles.headerRow}>
        <div className={styles.sectionHeader}>
          Fiction Pillar Builder
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

      {/* Title Input */}
      <label className={styles.label}>
        <span className={styles.labelText}>Fiction Pillar Title</span>
        <input
          type="text"
          value={fictionPillar.title || ''}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.textInput} ${validationErrors.title ? styles.inputError : ''}`}
          placeholder="Enter fiction pillar name (e.g., Harvest Festival)"
        />
        {validationErrors.title && (
          <div className={styles.errorMessage}>{validationErrors.title}</div>
        )}
      </label>

      {/* Wants/Dislikes Section */}
      <WantsDislikesForm
        wants={fictionPillar.wants}
        setWants={setWants}
        doesntWant={fictionPillar.doesntWant}
        setDoesntWant={setDoesntWant}
        wantsPlaceholder="What this fiction pillar wants to achieve"
        doesntWantPlaceholder="What this fiction pillar wants to avoid"
        sectionTitle="Motivations"
      />

      {/* Sensory Information */}
      <SensoryForm
        sight={fictionPillar.sight}
        setSight={setSight}
        sound={fictionPillar.sound}
        setSound={setSound}
        smell={fictionPillar.smell}
        setSmell={setSmell}
        required={true}
        sectionTitle="Sensory Information"
      />

      {/* Embody at the Table */}
      <label className={styles.label}>
        <span className={styles.labelText}>Embody at the Table</span>
        <input
          type="text"
          value={fictionPillar.embody || ''}
          onChange={(e) => setEmbody(e.target.value)}
          className={styles.textInput}
          placeholder="How to embody this at the table (e.g., bite an apple, play a flute)"
        />
        <div className={styles.fieldHint}>
          Describe physical actions or gestures that help bring this fiction pillar to life
        </div>
      </label>
    </form>
  );
}

export default FictionPillarForm;
