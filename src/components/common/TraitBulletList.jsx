import React from "react";
import "./TraitBulletList.css";

export default function TraitBulletList({ traits }) {
  if (!traits || traits.length === 0) {
    return null;
  }

  return (
    <ul className="trait-list">
      {traits.map((trait, index) => (
        <li key={index} className="trait-item">
          <span className="bullet">✱</span>
          <span className="trait-text">{trait}</span>
        </li>
      ))}
    </ul>
  );
}
