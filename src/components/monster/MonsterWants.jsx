import React from "react";

export default function MonsterWants({ wants, dislikes }) {
  const cleanedWants = wants.replace(/^\s*Wants\s*/i, "").trim();
  const cleanedDislikes = dislikes.replace(/^\s*Doesn't want\s*/i, "").trim();

  return (
    <p>
      <em className="bold">
        <strong>Wants</strong>
      </em>{" "}
      <em>{cleanedWants}</em>
      <br />
      <em className="bold">
        <strong>Doesn't want</strong>
      </em>{" "}
      <em>{cleanedDislikes}</em>
    </p>
  );
}
