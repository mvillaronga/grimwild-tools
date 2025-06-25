import React from "react";
import "./MovesBulletList.css";

export default function MovesBulletList({ moves }) {
  if (!moves || moves.length === 0) {
    return null;
  }

  return (
    <ul className="moves-list">
      {moves.map((move, index) => {
        // Split move into words and render each with a larger first letter
        const words = move.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} style={{ marginRight: wordIndex < move.split(' ').length - 1 ? '0.25em' : '0' }}>
            <span className="move-first-letter">{word.charAt(0)}</span>
            {word.slice(1)}
          </span>
        ));

        return (
          <li key={index} className="move-item">
            <span className="bullet">◉</span>
            <span className="move-text">
              {words}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
