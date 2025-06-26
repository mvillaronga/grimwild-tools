import React from 'react';
import styles from './CombatKitForm.module.css';

const TIERS = [
  {
    id: 'mook',
    name: 'MOOK',
    description: 'Mostly just set dressing',
    details: ['One action roll can take out several', 'Large groups can be a task pool']
  },
  {
    id: 'tough',
    name: 'TOUGH',
    description: 'A typical, dangerous enemy',
    details: ['One action roll can take out one of them', 'Small groups can be a task pool']
  },
  {
    id: 'elite',
    name: 'ELITE',
    description: 'Strong scene presence',
    details: ['A 4d/6d challenge', 'Often leads a group of lesser enemies']
  },
  {
    id: 'boss',
    name: 'BOSS',
    description: 'Commands the scene',
    details: ['A 6d/8d challenge or linked challenge', 'Extremely powerful']
  }
];

const ROLES = [
  'BLASTER', 'BRUTE', 'LURKER', 'MARAUDER', 'MARKSMAN', 'OVERSEER',
  'PREDATOR', 'PROTECTOR', 'SKIRMISHER', 'SWARMER', 'TACTICIAN', 'TRICKSTER'
];

function CombatKitForm({ combatKit, onChange, onReset, onClear }) {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleTierSelect = (tierId) => {
    const selectedTier = TIERS.find(tier => tier.id === tierId);
    onChange({ 
      tier: selectedTier,
      challengeRating: tierId === 'mook' ? '1-2d' : 
                     tierId === 'tough' ? '2-4d' :
                     tierId === 'elite' ? '4-6d' : '6-8d+'
    });
  };

  return (
    <div className={styles.combatKitForm}>
      <div className={styles.formHeader}>
        <h2>Combat Kit Builder</h2>
        <div className={styles.buttonGroup}>
          <button onClick={onReset} className={styles.defaultsButton}>
            Defaults
          </button>
          <button onClick={onClear} className={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">Scenario Title</label>
        <input
          id="title"
          type="text"
          value={combatKit.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter combat scenario title"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Opponent Tier</label>
        <div className={styles.tierSelection}>
          {TIERS.map(tier => (
            <div
              key={tier.id}
              className={`${styles.tierCard} ${combatKit.tier?.id === tier.id ? styles.selected : ''}`}
              onClick={() => handleTierSelect(tier.id)}
            >
              <h4>{tier.name}</h4>
              <p className={styles.tierDescription}>{tier.description}</p>
              <ul className={styles.tierDetails}>
                {tier.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role">Combat Role</label>
        <select
          id="role"
          value={combatKit.role || ''}
          onChange={(e) => handleInputChange('role', e.target.value)}
        >
          <option value="">Select a role...</option>
          {ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="battlegroundTitle">Battleground</label>
        <input
          id="battlegroundTitle"
          type="text"
          value={combatKit.battlegroundTitle || ''}
          onChange={(e) => handleInputChange('battlegroundTitle', e.target.value)}
          placeholder="e.g., Lair of the Magma Serpent"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="features">Features</label>
        <textarea
          id="features"
          value={combatKit.features || ''}
          onChange={(e) => handleInputChange('features', e.target.value)}
          placeholder="Environmental elements (one per line)&#10;e.g., Lava pools, unstable ground"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="threats">Threats</label>
        <textarea
          id="threats"
          value={combatKit.threats || ''}
          onChange={(e) => handleInputChange('threats', e.target.value)}
          placeholder="Hazards with suspense mechanics (one per line)&#10;e.g., 4d Lava Eruptions"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="additionalEnemies">Additional Enemies</label>
        <textarea
          id="additionalEnemies"
          value={combatKit.additionalEnemies || ''}
          onChange={(e) => handleInputChange('additionalEnemies', e.target.value)}
          placeholder="Supporting enemies (one per line)&#10;e.g., 4d Deckhands (Mook Brutes)"
          rows={3}
        />
      </div>
    </div>
  );
}

export default CombatKitForm;
