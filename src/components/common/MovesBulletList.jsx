import React from "react";
import "./MovesBulletList.css";

export default function MovesBulletList({ moves }) {
  if (!moves || moves.length === 0) {
    return null;
  }

  return (
    <ul className="moves-list">
      {moves.map((move, index) => (
        <li key={index} className="move-item">
          <span className="bullet">◉</span>
          <span className="move-text">{move}</span>
        </li>
      ))}
    </ul>
  );
}
