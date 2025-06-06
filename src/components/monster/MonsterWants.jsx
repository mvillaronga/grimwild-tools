import React from "react";

export default function MonsterWants({ wants, dislikes }) {
  return (
    <p>
      <em className="bold">
        <strong>Wants</strong>
      </em>{" "}
      <em>{wants}</em>
      <br />
      <em className="bold">
        <strong>Doesn't want</strong>
      </em>{" "}
      <em>{dislikes}</em>
    </p>
  );
}
