import React from 'react';
import FictionPillarForm from './FictionPillarForm';
import FictionPillarCard from './FictionPillarCard';
import ImageActionsWrapper from '../common/ImageActionsWrapper';
import { useFictionPillarState } from '../../hooks/useFictionPillarState';
import { generateFilename } from '../../utils/fictionPillarUtils';
import styles from './FictionPillarBuilder.module.css';

function FictionPillarBuilder() {
  const {
    fictionPillar,
    setTitle,
    setWants,
    setDoesntWant,
    setSight,
    setSound,
    setSmell,
    setEmbody,
    resetToDefaults,
    clearForm,
    validationErrors
  } = useFictionPillarState();

  // Generate filename for export
  const filename = generateFilename(fictionPillar.title) || 'fiction-pillar';

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <FictionPillarForm
          fictionPillar={fictionPillar}
          setTitle={setTitle}
          setWants={setWants}
          setDoesntWant={setDoesntWant}
          setSight={setSight}
          setSound={setSound}
          setSmell={setSmell}
          setEmbody={setEmbody}
          onReset={resetToDefaults}
          onClear={clearForm}
          validationErrors={validationErrors}
        />
        <div className={styles.previewContainer}>
          <ImageActionsWrapper
            filename={filename}
          >
            <FictionPillarCard fictionPillar={fictionPillar} />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}

export default FictionPillarBuilder;
