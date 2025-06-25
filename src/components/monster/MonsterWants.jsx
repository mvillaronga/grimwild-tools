import React from "react";

export default function MonsterWants({ wants, dislikes }) {
  const cleanedWants = wants ? wants.replace(/^\s*Wants\s*/i, "").trim() : "";
  const cleanedDislikes = dislikes ? dislikes.replace(/^\s*Doesn't want\s*/i, "").trim() : "";

  if (!cleanedWants && !cleanedDislikes) {
    return null;
  }

  return (
    <div className="monster-wants">
      {cleanedWants && (
        <p>
          <em className="bold">
            <strong>Wants</strong>
          </em>{" "}
          <em>{cleanedWants}</em>
        </p>
      )}
      {cleanedDislikes && (
        <p>
          <em className="bold">
            <strong>Doesn't want</strong>
          </em>{" "}
          <em>{cleanedDislikes}</em>
        </p>
      )}
    </div>
  );
}
