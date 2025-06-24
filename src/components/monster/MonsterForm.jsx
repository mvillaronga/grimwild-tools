import React from "react";
import ColorPicker from "../common/ColorPicker";
import styles from "./MonsterForm.module.css";

export default function MonsterForm({
  name,
  setName,
  type,
  setType,
  color1,
  setColor1,
  label1,
  setLabel1,
  color2,
  setColor2,
  label2,
  setLabel2,
  color3,
  setColor3,
  label3,
  setLabel3,
  description,
  setDescription,
  traits,
  setTraits,
  moves,
  setMoves,
  wants,
  setWants,
  dislikes,
  setDislikes,
  flavorTitle,
  setFlavorTitle,
  flavorItems,
  setFlavorItems,
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Monster Name and Type */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.textInput}
          />
        </label>
        <label className={styles.labelSpaced}>
          <span className={styles.labelText}>Type</span>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.textInput}
          />
        </label>
      </div>

      {/* Colors */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.sectionTitle}>Colors</span>
        </label>
        <div className={styles.colorSection}>
          <ColorPicker
            selectedColor={color1}
            setSelectedColor={setColor1}
            selectedLabel={label1}
            setSelectedLabel={setLabel1}
          />
          <ColorPicker
            selectedColor={color2}
            setSelectedColor={setColor2}
            selectedLabel={label2}
            setSelectedLabel={setLabel2}
          />
          <ColorPicker
            selectedColor={color3}
            setSelectedColor={setColor3}
            selectedLabel={label3}
            setSelectedLabel={setLabel3}
          />
        </div>
      </div>

      {/* Description */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        </label>
      </div>

      {/* Traits */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Traits (one per line)</span>
          <textarea
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        </label>
      </div>

      {/* Moves */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Moves (one per line)</span>
          <textarea
            value={moves}
            onChange={(e) => setMoves(e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        </label>
      </div>

      {/* Wants and Dislikes */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Wants</span>
          <input
            type="text"
            value={wants}
            onChange={(e) => setWants(e.target.value)}
            className={styles.textInput}
          />
        </label>
        <label className={styles.labelSpaced}>
          <span className={styles.labelText}>Doesn't Want</span>
          <input
            type="text"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            className={styles.textInput}
          />
        </label>
      </div>

      {/* Flavor Table */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Flavor Table Title</span>
          <input
            type="text"
            value={flavorTitle}
            onChange={(e) => setFlavorTitle(e.target.value)}
            className={styles.textInput}
          />
        </label>
        <label className={styles.labelSpaced}>
          <span className={styles.labelText}>Flavor Table Items (one per line)</span>
          <textarea
            value={flavorItems}
            onChange={(e) => setFlavorItems(e.target.value)}
            rows={6}
            className={styles.textarea}
          />
        </label>
      </div>
    </form>
  );
}
