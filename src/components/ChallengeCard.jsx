import React from "react";
import "./ChallengeCard.css";
import TraitBulletList from "./common/TraitBulletList";
import MovesBulletList from "./common/MovesBulletList";

export default function ObstacleCard({
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

  // For fail: capitalize each word and first letter larger
  function renderFail(desc) {
    return desc
      .split(" ")
      .map((word, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : "0.25em" }}>
          <span className="initcap">{word.charAt(0).toUpperCase()}</span>
          {word.slice(1)}
        </span>
      ));
  }

  // Only show fail state if both failPool and failDesc are provided and non-empty
  const showFail = !!(failPool && failDesc && String(failDesc).trim());

  return (
    <div className="card">
      <div
        className="header"
        style={{ display: "flex", alignItems: "baseline", gap: "0.25em" }}
      >
        <span style={{ display: "inline-flex", alignItems: "baseline" }}>
          <span className="initcap" style={{ verticalAlign: "baseline" }}>{pool}</span>
          <span className="initcap" style={{ verticalAlign: "baseline" }}>d</span>
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.5em",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "baseline",
            position: "relative",
            top: "-0.08em"
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
