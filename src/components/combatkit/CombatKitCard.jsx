import React from 'react';
import styles from './CombatKitCard.module.css';

function CombatKitCard({ combatKit }) {
  const renderList = (text) => {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim()).map((line, index) => (
      <li key={index}>{line.trim()}</li>
    ));
  };

  const getTierIcon = (tierId) => {
    const icons = {
      mook: '◦',
      tough: '◉',
      elite: '◈',
      boss: '★'
    };
    return icons[tierId] || '◦';
  };

  const getChallengeRating = (tier) => {
    if (!tier) return '';
    const ratings = {
      mook: '1-2d',
      tough: '2-4d',
      elite: '4-6d',
      boss: '6-8d+'
    };
    return ratings[tier.id] || '';
  };

  return (
    <div id="combat-kit-card" className={styles.combatKitCard}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {combatKit.title || 'Combat Scenario'}
        </h1>
        {combatKit.tier && (
          <div className={styles.tierBadge}>
            <span className={styles.tierIcon}>{getTierIcon(combatKit.tier.id)}</span>
            <span className={styles.tierName}>{combatKit.tier.name}</span>
            <span className={styles.challengeRating}>{getChallengeRating(combatKit.tier)}</span>
          </div>
        )}
      </div>

      {combatKit.tier && (
        <div className={styles.tierInfo}>
          <h3>Opponent Tier: {combatKit.tier.name}</h3>
          <p className={styles.tierDescription}>{combatKit.tier.description}</p>
          <ul className={styles.tierDetails}>
            {combatKit.tier.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {combatKit.role && (
        <div className={styles.roleInfo}>
          <h3>Combat Role: {combatKit.role}</h3>
        </div>
      )}

      {combatKit.battlegroundTitle && (
        <div className={styles.battleground}>
          <h3>Battleground: {combatKit.battlegroundTitle}</h3>
          
          {combatKit.features && (
            <div className={styles.features}>
              <h4>Features</h4>
              <ul>
                {renderList(combatKit.features)}
              </ul>
            </div>
          )}

          {combatKit.threats && (
            <div className={styles.threats}>
              <h4>Threats</h4>
              <ul>
                {renderList(combatKit.threats)}
              </ul>
            </div>
          )}
        </div>
      )}

      {combatKit.additionalEnemies && (
        <div className={styles.additionalEnemies}>
          <h3>Additional Enemies</h3>
          <ul>
            {renderList(combatKit.additionalEnemies)}
          </ul>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.note}>
          <strong>Note:</strong> Enemies gathered into a single task pool are listed with the dice in front. 
          Challenges are shown with a | after the pool.
        </p>
      </div>
    </div>
  );
}

export default CombatKitCard;
