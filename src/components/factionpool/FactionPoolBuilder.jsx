import React from 'react';
import FactionPoolForm from './FactionPoolForm';
import FactionPoolCard from './FactionPoolCard';
import ImageActionsWrapper from '../common/ImageActionsWrapper';
import { useFactionPoolState } from '../../hooks/useFactionPoolState';
import { generateFilename } from '../../utils/factionPoolUtils';
import styles from './FactionPoolBuilder.module.css';

function FactionPoolBuilder() {
  const {
    factionPool,
    updateFactionPool,
    resetToDefaults,
    clearForm,
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    moveGoal,
    updateResources
  } = useFactionPoolState();

  // Generate filename for export
  const filename = generateFilename(factionPool.title) || 'faction-pool';

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <FactionPoolForm
          factionPool={factionPool}
          onChange={updateFactionPool}
          onReset={resetToDefaults}
          onClear={clearForm}
          goals={goals}
          onAddGoal={addGoal}
          onUpdateGoal={updateGoal}
          onDeleteGoal={deleteGoal}
          onMoveGoal={moveGoal}
          onUpdateResources={updateResources}
        />
        <div className={styles.previewContainer}>
          <ImageActionsWrapper
            filename={filename}
          >
            <FactionPoolCard factionPool={factionPool} />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}

export default FactionPoolBuilder;
