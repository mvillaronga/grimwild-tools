import React from "react";
import "./TraitBulletList.css";

export default function TraitBulletList({ traits }) {
  return (
    <ul className="trait-bullet-list">
      {traits.map((trait, i) => (
        <li key={i}>
          <span className="trait-icon">✶</span> <em>{trait}</em>
        </li>
      ))}
    </ul>
  );
}
