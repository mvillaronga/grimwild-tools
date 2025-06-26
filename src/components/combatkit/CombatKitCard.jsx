import React from 'react';
import { convertThreatsToText } from '../../utils/threatUtils';
import styles from './CombatKitCard.module.css';

function CombatKitCard({ combatKit }) {
  // Render title with larger first letters like Challenge cards
  const renderTitle = (title) => {
    if (!title) return 'Combat Scenario';
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

  // Render label with moves-style formatting (bold, uppercase, larger first letters)
  const renderLabel = (text, firstLetterClass) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} style={{ marginRight: wordIndex < text.split(' ').length - 1 ? '0.25em' : '0' }}>
        <span className={firstLetterClass}>{word.charAt(0)}</span>
        {word.slice(1)}
      </span>
    ));
  };

  const renderThreats = (text) => {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim()).map((line, index) => {
      const trimmedLine = line.trim();

      // Parse dice pools (e.g., "4d Waves Crashing")
      const diceMatch = trimmedLine.match(/^(\d+d)\s+(.+)$/);
      if (diceMatch) {
        return (
          <div key={index} className={styles.threatLine}>
            <span className={styles.dicePool}>{diceMatch[1]}</span> {diceMatch[2]}
          </div>
        );
      }

      // Parse suspense circles (e.g., "○○ Kraken Tentacles")
      const circleMatch = trimmedLine.match(/^(○+)\s+(.+)$/);
      if (circleMatch) {
        return (
          <div key={index} className={styles.threatLine}>
            <span className={styles.suspenseCircles}>{circleMatch[1]}</span> {circleMatch[2]}
          </div>
        );
      }

      // Default formatting - just italicized text
      return (
        <div key={index} className={styles.threatLine}>{trimmedLine}</div>
      );
    });
  };

  const renderMonsters = (text) => {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim()).map((line, index) => {
      const trimmedLine = line.trim();

      // Parse monster with pool divider (e.g., "4d | Pirate Captain (Elite Overseer)")
      const poolDividerMatch = trimmedLine.match(/^(\d+d)\s*\|\s*(.+?)(\s*\([^)]+\))?$/);
      if (poolDividerMatch) {
        return (
          <div key={index} className={styles.monsterLine}>
            <span className={styles.dicePool}>{poolDividerMatch[1]}</span>
            <span className={styles.poolDivider}>|</span>
            {poolDividerMatch[2]}
            {poolDividerMatch[3] && <span className={styles.monsterType}>{poolDividerMatch[3]}</span>}
          </div>
        );
      }

      // Parse monster with dice count (e.g., "4d Deckhands (Mook Brutes)")
      const diceCountMatch = trimmedLine.match(/^(\d+d)\s+(.+?)(\s*\([^)]+\))?$/);
      if (diceCountMatch) {
        return (
          <div key={index} className={styles.monsterLine}>
            <span className={styles.dicePool}>{diceCountMatch[1]}</span> {diceCountMatch[2]}
            {diceCountMatch[3] && <span className={styles.monsterType}>{diceCountMatch[3]}</span>}
          </div>
        );
      }

      // Parse monster with number count (e.g., "3 Swashbucklers (Tough Marauders)")
      const numberCountMatch = trimmedLine.match(/^(\d+)\s+(.+?)(\s*\([^)]+\))?$/);
      if (numberCountMatch) {
        return (
          <div key={index} className={styles.monsterLine}>
            <span className={styles.monsterCount}>{numberCountMatch[1]}</span> {numberCountMatch[2]}
            {numberCountMatch[3] && <span className={styles.monsterType}>{numberCountMatch[3]}</span>}
          </div>
        );
      }

      return (
        <div key={index} className={styles.monsterLine}>{trimmedLine}</div>
      );
    });
  };

  return (
    <div id="combat-kit-card" className={styles.combatKitCard}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {renderTitle(combatKit.title)}
        </h1>
        <div className={styles.swordsIcon}>⚔</div>
      </div>

      <div className={styles.sectionTop}>
        {combatKit.features && (
          <div className={styles.features}>
            <div className={styles.featuresLabel}>
              {renderLabel('Features', styles.featuresLabelFirstLetter)}
            </div>
            <div className={styles.featuresText}>
              {combatKit.features}
            </div>
          </div>
        )}

        {combatKit.threats && combatKit.threats.length > 0 && (
          <div className={styles.threats}>
            <div className={styles.threatsLabel}>
              {renderLabel('Threats', styles.threatsLabelFirstLetter)}
            </div>
            <div className={styles.threatsContent}>
              {renderThreats(Array.isArray(combatKit.threats) ? convertThreatsToText(combatKit.threats) : combatKit.threats)}
            </div>
          </div>
        )}
      </div>

      {combatKit.monsters && (
        <>
          <hr className={styles.divider} />
          <div className={styles.sectionBottom}>
            <div className={styles.monsters}>
              {renderMonsters(combatKit.monsters)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CombatKitCard;
