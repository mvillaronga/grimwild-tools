import React from "react";
import ColorPicker from "../common/ColorPicker";
import styles from "./MonsterForm.module.css";

export default function MonsterForm({
  name, setName,
  type, setType,
  color1, setColor1,
  label1, setLabel1,
  color2, setColor2,
  label2, setLabel2,
  color3, setColor3,
  label3, setLabel3,
  description, setDescription,
  traits, setTraits,
  moves, setMoves,
  wants, setWants,
  dislikes, setDislikes,
  sight, setSight,
  sound, setSound,
  smell, setSmell,
  flavorTitle, setFlavorTitle,
  flavorItems, setFlavorItems,
  customColorsState,
  resetToDefaults,
  clearForm,
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Monster Name and Type */}
      <div className={styles.headerRow}>
        <div className={styles.sectionHeader}>
          Basic Information
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
      
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.textInput}
            placeholder="Monster Name"
          />
        </label>
        
        <label className={styles.label}>
          <span className={styles.labelText}>Type</span>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.textInput}
            placeholder="Monster Type"
          />
        </label>
      </div>

      {/* Color System */}
      <div className={styles.sectionHeader}>
        Colors
      </div>
      
      <div className={styles.colorSection}>
        <ColorPicker
          label="Color 1"
          colorValue={color1}
          onColorChange={setColor1}
          labelValue={label1}
          onLabelChange={setLabel1}
          customColorsState={customColorsState}
        />
        <ColorPicker
          label="Color 2"
          colorValue={color2}
          onColorChange={setColor2}
          labelValue={label2}
          onLabelChange={setLabel2}
          customColorsState={customColorsState}
        />
        <ColorPicker
          label="Color 3"
          colorValue={color3}
          onColorChange={setColor3}
          labelValue={label3}
          onLabelChange={setLabel3}
          customColorsState={customColorsState}
        />
      </div>

      {/* Description */}
      <label className={styles.label}>
        <span className={styles.labelText}>Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Monster description"
          rows={3}
        />
      </label>

      {/* Traits */}
      <label className={styles.label}>
        <span className={styles.labelText}>Traits</span>
        <textarea
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
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
          onChange={(e) => setMoves(e.target.value)}
          className={styles.textarea}
          placeholder="Enter moves, one per line"
          rows={4}
        />
      </label>

      {/* Wants and Dislikes */}
      <div className={styles.sectionHeader}>
        Motivations
      </div>
      
      <label className={styles.label}>
        <span className={styles.labelText}>Wants</span>
        <input
          type="text"
          value={wants}
          onChange={(e) => setWants(e.target.value)}
          className={styles.textInput}
          placeholder="What the monster wants"
        />
      </label>
      
      <label className={styles.label}>
        <span className={styles.labelText}>Doesn't Want</span>
        <input
          type="text"
          value={dislikes}
          onChange={(e) => setDislikes(e.target.value)}
          className={styles.textInput}
          placeholder="What the monster dislikes"
        />
      </label>

      {/* Sensory Information */}
      <div className={styles.sectionHeader}>
        Sensory Information
      </div>

      <label className={styles.label}>
        <span className={styles.labelText}>Sight</span>
        <input
          type="text"
          value={sight}
          onChange={(e) => setSight(e.target.value)}
          className={styles.textInput}
          placeholder="What the monster looks like"
          required
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Sound</span>
        <input
          type="text"
          value={sound}
          onChange={(e) => setSound(e.target.value)}
          className={styles.textInput}
          placeholder="What the monster sounds like"
          required
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Smell</span>
        <input
          type="text"
          value={smell}
          onChange={(e) => setSmell(e.target.value)}
          className={styles.textInput}
          placeholder="What the monster smells like"
          required
        />
      </label>

      {/* Flavor Content */}
      <div className={styles.sectionHeader}>
        Flavor Content (Optional)
      </div>

      <label className={styles.label}>
        <span className={styles.labelText}>Flavor Title</span>
        <input
          type="text"
          value={flavorTitle}
          onChange={(e) => setFlavorTitle(e.target.value)}
          className={styles.textInput}
          placeholder="e.g., 'What they're carrying'"
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Flavor Items</span>
        <textarea
          value={flavorItems}
          onChange={(e) => setFlavorItems(e.target.value)}
          className={styles.textarea}
          placeholder="Enter items, one per line (up to 6)"
          rows={6}
        />
        <small className={styles.helpText}>
          Each line will be paired with a dice icon (1-6). Use *asterisks* for bold text.
        </small>
      </label>
    </form>
  );
}
