import React from 'react';
import { MONSTER_TIERS } from '../../utils/monsterUtils';
import styles from './Dropdown.module.css';

function TierDropdown({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.dropdown} ${className}`}
      aria-label="Monster tier"
    >
      <option value="">Select Tier</option>
      {MONSTER_TIERS.map(tier => (
        <option key={tier} value={tier}>
          {tier}
        </option>
      ))}
    </select>
  );
}

export default TierDropdown;
