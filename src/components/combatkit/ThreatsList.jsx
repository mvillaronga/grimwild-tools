import React from 'react';
import ThreatItem from './ThreatItem';
import { createPoolThreat, createHazardThreat, reorderThreats } from '../../utils/threatUtils';
import styles from './ThreatsList.module.css';

function ThreatsList({ threats, onUpdateThreats }) {
  const handleAddPoolThreat = () => {
    const newThreat = createPoolThreat('4', '');
    onUpdateThreats([...threats, newThreat]);
  };

  const handleAddHazardThreat = () => {
    const newThreat = createHazardThreat('');
    onUpdateThreats([...threats, newThreat]);
  };

  const handleUpdateThreat = (updatedThreat) => {
    const updatedThreats = threats.map(threat =>
      threat.id === updatedThreat.id ? updatedThreat : threat
    );
    onUpdateThreats(updatedThreats);
  };

  const handleDeleteThreat = (threatId) => {
    const updatedThreats = threats.filter(threat => threat.id !== threatId);
    onUpdateThreats(updatedThreats);
  };

  const handleMoveThreat = (threatId, direction) => {
    const currentIndex = threats.findIndex(threat => threat.id === threatId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= threats.length) return;

    const reorderedThreats = reorderThreats(threats, currentIndex, newIndex);
    onUpdateThreats(reorderedThreats);
  };

  return (
    <div className={styles.threatsList}>
      <div className={styles.header}>
        <span className={styles.label}>Threats</span>
      </div>

      <div className={styles.threatsContainer}>
        {threats.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No threats added yet</p>
            <p className={styles.emptyHint}>
              Use the buttons below to add threats
            </p>
          </div>
        ) : (
          threats.map((threat, index) => (
            <ThreatItem
              key={threat.id}
              threat={threat}
              onUpdate={handleUpdateThreat}
              onDelete={() => handleDeleteThreat(threat.id)}
              onMoveUp={() => handleMoveThreat(threat.id, 'up')}
              onMoveDown={() => handleMoveThreat(threat.id, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < threats.length - 1}
            />
          ))
        )}

        <div className={styles.addButtons}>
          <button
            type="button"
            onClick={handleAddPoolThreat}
            className={styles.addButton}
            title="Add Pool Threat (dice pools)"
          >
            🎲 Add Pool
          </button>
          <button
            type="button"
            onClick={handleAddHazardThreat}
            className={styles.addButton}
            title="Add Hazard Threat (suspense circles)"
          >
            ⚠️ Add Hazard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreatsList;
