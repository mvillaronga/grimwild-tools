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
    clearForm
  } = useCombatKitState();

  return (
    <div className={styles.combatKitBuilder}>
      <div className={styles.formSection}>
        <CombatKitForm
          combatKit={combatKit}
          onChange={updateCombatKit}
          onReset={resetToDefaults}
          onClear={clearForm}
        />
      </div>
      <div className={styles.previewSection}>
        <ImageActionsWrapper
          targetId="combat-kit-card"
          filename={`combat-kit-${combatKit.title || 'scenario'}`}
        >
          <CombatKitCard combatKit={combatKit} />
        </ImageActionsWrapper>
      </div>
    </div>
  );
}

export default CombatKitBuilder;
