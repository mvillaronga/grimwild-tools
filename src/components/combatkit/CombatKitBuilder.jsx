import React from 'react';
import CombatKitForm from './CombatKitForm';
import CombatKitCard from './CombatKitCard';
import ImageActionsWrapper from '../common/ImageActionsWrapper';
import { useCombatKitState } from '../../hooks/useCombatKitState';
import styles from './CombatKitBuilder.module.css';

function CombatKitBuilder() {
  const {
    combatKit,
    updateCombatKit,
    resetToDefaults,
    clearForm,
    threats,
    updateThreats,
    monsters,
    updateMonsters
  } = useCombatKitState();

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <CombatKitForm
          combatKit={combatKit}
          onChange={updateCombatKit}
          onReset={resetToDefaults}
          onClear={clearForm}
          threats={threats}
          onUpdateThreats={updateThreats}
          monsters={monsters}
          onUpdateMonsters={updateMonsters}
        />
        <div className={styles.previewContainer}>
          <h2 className={styles.title}>Combat Kit Builder</h2>
          <ImageActionsWrapper
            targetId="combat-kit-card"
            filename={`combat-kit-${combatKit.title || 'scenario'}`}
          >
            <CombatKitCard combatKit={combatKit} />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}

export default CombatKitBuilder;
