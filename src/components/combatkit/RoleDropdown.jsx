import React from 'react';
import { MONSTER_ROLES } from '../../utils/monsterUtils';
import styles from './Dropdown.module.css';

function RoleDropdown({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.dropdown} ${className}`}
      aria-label="Monster role"
    >
      <option value="">Select Role</option>
      {MONSTER_ROLES.map(role => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}

export default RoleDropdown;
