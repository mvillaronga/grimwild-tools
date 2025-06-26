import React from "react";
import ColorPicker from "../common/ColorPicker";
import { flavorExamples } from "../../hooks/useMonsterState";
import WantsDislikesForm from "../common/WantsDislikesForm";
import SensoryForm from "../common/SensoryForm";
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
  flavorColumns, setFlavorColumns,
  flavorColumn1, setFlavorColumn1,
  flavorColumn2, setFlavorColumn2,
  flavorColumn3, setFlavorColumn3,
  customColorsState,
  resetToDefaults,
  clearForm,
}) {
  // Helper function to load flavor example based on current column selection
  const loadFlavorExample = () => {
    let exampleKey;
    switch (flavorColumns) {
      case 1:
        exampleKey = 'singleColumn';
        break;
      case 2:
        exampleKey = 'twoColumn';
        break;
      case 3:
        exampleKey = 'threeColumn';
        break;
      default:
        return; // No example for 0 columns
    }

    const example = flavorExamples[exampleKey];
    // Parse the example items and distribute to appropriate columns
    const allItems = example.items.split('\n');

    if (flavorColumns === 1) {
      setFlavorColumn1(allItems.slice(0, 6).join('\n'));
    } else if (flavorColumns === 2) {
      setFlavorColumn1(allItems.slice(0, 6).join('\n'));
      setFlavorColumn2(allItems.slice(6, 12).join('\n'));
    } else if (flavorColumns === 3) {
      setFlavorColumn1(allItems.slice(0, 6).join('\n'));
      setFlavorColumn2(allItems.slice(6, 12).join('\n'));
      setFlavorColumn3(allItems.slice(12, 18).join('\n'));
    }
  };

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
      <WantsDislikesForm
        wants={wants}
        setWants={setWants}
        doesntWant={dislikes}
        setDoesntWant={setDislikes}
        wantsPlaceholder="What the monster wants"
        doesntWantPlaceholder="What the monster dislikes"
        sectionTitle="Motivations"
      />

      {/* Sensory Information */}
      <SensoryForm
        sight={sight}
        setSight={setSight}
        sound={sound}
        setSound={setSound}
        smell={smell}
        setSmell={setSmell}
        required={true}
        sectionTitle="Sensory Information"
      />

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

      <div className={styles.compactRow}>
        <label className={styles.compactLabel}>
          <span className={styles.labelText}>Columns:</span>
          <select
            value={flavorColumns}
            onChange={(e) => setFlavorColumns(parseInt(e.target.value))}
            className={styles.compactSelect}
          >
            <option value={0}>None</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        {flavorColumns > 0 && (
          <button
            type="button"
            onClick={loadFlavorExample}
            className={styles.exampleButton}
          >
            Example Text
          </button>
        )}
      </div>

      {flavorColumns === 1 && (
        <div className={styles.flavorItemsContainer}>
          <span className={styles.labelText}>Flavor Items</span>
          <textarea
            value={flavorColumn1}
            onChange={(e) => setFlavorColumn1(e.target.value)}
            className={styles.textarea}
            placeholder="Enter items, one per line"
            rows={6}
          />
        </div>
      )}

      {flavorColumns === 2 && (
        <>
          <div className={styles.flavorItemsContainer}>
            <span className={styles.labelText}>Column 1 Items</span>
            <textarea
              value={flavorColumn1}
              onChange={(e) => setFlavorColumn1(e.target.value)}
              className={styles.textarea}
              placeholder="Enter items, one per line"
              rows={6}
            />
          </div>
          <div className={styles.flavorItemsContainer}>
            <span className={styles.labelText}>Column 2 Items</span>
            <textarea
              value={flavorColumn2}
              onChange={(e) => setFlavorColumn2(e.target.value)}
              className={styles.textarea}
              placeholder="Enter items, one per line"
              rows={6}
            />
          </div>
        </>
      )}

      {flavorColumns === 3 && (
        <>
          <div className={styles.flavorItemsContainer}>
            <span className={styles.labelText}>Column 1 Items</span>
            <textarea
              value={flavorColumn1}
              onChange={(e) => setFlavorColumn1(e.target.value)}
              className={styles.textarea}
              placeholder="Enter items, one per line"
              rows={6}
            />
          </div>
          <div className={styles.flavorItemsContainer}>
            <span className={styles.labelText}>Column 2 Items</span>
            <textarea
              value={flavorColumn2}
              onChange={(e) => setFlavorColumn2(e.target.value)}
              className={styles.textarea}
              placeholder="Enter items, one per line"
              rows={6}
            />
          </div>
          <div className={styles.flavorItemsContainer}>
            <span className={styles.labelText}>Column 3 Items</span>
            <textarea
              value={flavorColumn3}
              onChange={(e) => setFlavorColumn3(e.target.value)}
              className={styles.textarea}
              placeholder="Enter items, one per line"
              rows={6}
            />
          </div>
        </>
      )}
    </form>
  );
}
