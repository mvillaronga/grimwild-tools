import React from 'react';
import WantsDislikesDisplay from '../common/WantsDislikesDisplay';
import SensoryDisplay from '../common/SensoryDisplay';
import EmbodyDisplay from '../common/EmbodyDisplay';
import styles from './FictionPillarCard.module.css';

function FictionPillarCard({ fictionPillar }) {
  // Render title with larger first letters like other cards
  const renderTitle = (title) => {
    if (!title) return 'Fiction Pillar';
    return title.split(' ').map((word, index) => (
      <span
        key={index}
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          marginLeft: index === 0 ? 0 : '0.25em'
        }}
      >
        <span className={styles.initcap} style={{ verticalAlign: 'baseline' }}>
          {word.charAt(0)}
        </span>
        {word.slice(1)}
      </span>
    ));
  };

  return (
    <div id="fiction-pillar-card" className={styles.fictionPillarCard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          {renderTitle(fictionPillar.title)}
        </div>
      </div>

      {/* Wants/Doesn't Want Section */}
      <div className={styles.sectionTop}>
        <WantsDislikesDisplay 
          wants={fictionPillar.wants} 
          doesntWant={fictionPillar.doesntWant} 
        />
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Sensory Section */}
      <div className={styles.sectionMiddle}>
        <SensoryDisplay 
          sight={fictionPillar.sight}
          sound={fictionPillar.sound}
          smell={fictionPillar.smell}
        />
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Embody Section */}
      <div className={styles.sectionBottom}>
        <EmbodyDisplay embody={fictionPillar.embody} />
      </div>
    </div>
  );
}

export default FictionPillarCard;
