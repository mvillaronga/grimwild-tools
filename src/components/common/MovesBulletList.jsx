import React from "react";
import "./MovesBulletList.css";

export default function MovesBulletList({ moves }) {
  return (
    <ul className="moves-bullet-list">
      {moves.map((move, i) => (
        <li key={i}>
          <span className="move-icon">◉</span>{" "}
          {move.split(" ").map((word, j) => (
            <span key={j} style={{ marginLeft: j === 0 ? 0 : "0.25em" }}>
              <span className="initcap">{word.charAt(0)}</span>
              <span className="move-rest">{word.slice(1)}</span>
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
