import React from "react";
import "./ChallengeCard.css";
import TraitBulletList from "../common/TraitBulletList";
import MovesBulletList from "../common/MovesBulletList";

export default function ChallengeCard({
  pool = "4",
  title = "Goblin Raider",
  traits = ["Sneaky", "Cowardly"],
  moves = ["Ambush", "Pack Tactics", "Flee into Shadows"],
  failPool = "3",
  failDesc = "Goblins Scatter"
}) {
  // Split title into words and render each with a larger first letter
  const challengeName = title.split(" ").map((word, i) => (
    <span
      key={i}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        marginLeft: i === 0 ? 0 : "0.25em"
      }}
    >
      <span className="initcap" style={{ verticalAlign: "baseline" }}>{word.charAt(0)}</span>
      {word.slice(1)}
    </span>
  )); 

  const renderFail = (desc) => {
    if (!desc) return "";
    
    // Check if description starts with a capital letter
    const firstChar = desc.charAt(0);
    const restOfString = desc.slice(1);
    
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      // First character is uppercase, render with initcap
      return (
        <>
          <span className="initcap">{firstChar}</span>
          {restOfString}
        </>
      );
    } else {
      // First character is not uppercase, render normally
      return desc;
    }
  };

  const showFail = failPool && parseInt(failPool) > 0 && failDesc;

  return (
    <div className="challenge-card">
      <div className="challenge-header">
        <span 
          className="pool-display"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginRight: "0.5rem"
          }}
        >
          {pool}d
        </span>
        <span 
          className="divider"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginRight: "0.5rem",
            opacity: 0.6
          }}
        >
          |
        </span>
        {challengeName}
      </div>
      <div className="section">
        <TraitBulletList traits={traits} />
        <hr className="divider" />
        <MovesBulletList moves={moves} />
        {showFail && <hr className="divider" />}
        {showFail && (
          <div className="fail">
            ✘ <span>{failPool}d</span> {renderFail(failDesc)}
          </div>
        )}
      </div>
    </div>
  );
}
