import React from 'react';
import { formatGoalDescription } from '../../utils/factionPoolUtils';
import styles from './FactionPoolCard.module.css';

function FactionPoolCard({ factionPool }) {
  // Render title with larger first letters like other cards
  const renderTitle = (title) => {
    if (!title) return 'Faction Pool';
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

  // Render goals with proper formatting
  const renderGoals = (goals) => {
    if (!goals || goals.length === 0) {
      return (
        <div className={styles.emptyGoals}>
          <em>No goals defined</em>
        </div>
      );
    }

    return goals.map((goal, index) => (
      <div key={goal.id || index} className={styles.goalLine}>
        <span className={styles.dicePool}>{goal.pool}d</span>
        <span className={styles.goalDescription}>
          {formatGoalDescription(goal.description)}
        </span>
      </div>
    ));
  };

  // Render resources with proper formatting
  const renderResources = (resources) => {
    if (!resources || resources.length === 0) {
      return null;
    }

    return resources.map((resource, index) => (
      <div key={index} className={styles.resourceLine}>
        {resource}
      </div>
    ));
  };

  // Parse resources from text
  const parsedResources = factionPool.resources 
    ? factionPool.resources.split('\n').filter(line => line.trim())
    : [];

  return (
    <div id="faction-pool-card" className={styles.factionPoolCard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          {renderTitle(factionPool.title)}
        </div>
      </div>

      {/* Resources Section - only show if resources exist */}
      {parsedResources.length > 0 && (
        <div className={styles.sectionTop}>
          <div className={styles.resources}>
            <div className={styles.resourcesLabel}>
              <span className={styles.resourcesLabelFirstLetter}>R</span>esources
            </div>
            <div className={styles.resourcesContent}>
              {renderResources(parsedResources)}
            </div>
          </div>
        </div>
      )}

      {/* Divider - only show if resources exist */}
      {parsedResources.length > 0 && <hr className={styles.divider} />}

      {/* Goals Section */}
      <div className={styles.sectionBottom}>
        <div className={styles.goals}>
          <div className={styles.goalsLabel}>
            <span className={styles.goalsLabelFirstLetter}>G</span>oals
          </div>
          <div className={styles.goalsContent}>
            {renderGoals(factionPool.goals)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FactionPoolCard;
