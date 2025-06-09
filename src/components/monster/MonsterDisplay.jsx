import React from "react";
import "./MonsterDisplay.css";
import TraitBulletList from "../common/TraitBulletList";
import MovesBulletList from "../common/MovesBulletList";
import MonsterWants from "./MonsterWants";

export default function MonsterDisplay({
  name,
  type,
  colors,
  description,
  traits,
  moves,
  wants,
  dislikes,
  flavorTitle,
  flavorItems
}) {
  const colorArray = colors.split(",").map((color) => color.trim());
  const traitArray = traits.split("\n").filter(Boolean);
  const moveArray = moves.split("\n").filter(Boolean);
  const flavorItemArray = flavorItems.split("\n").filter(Boolean);

  return (
    <article className="monster-block">
      <header className="monster-header">
        <span
          className="monster-name"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {name}
        </span>
        <span
          className="monster-role"
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            opacity: 0.8,
          }}
        >
          {type}
        </span>
      </header>
      <div className="color-bar">
        {colorArray.map((color, i) => (
          <div
            key={i}
            className={`segment ${color}`}
            style={{
              position: "relative",
              border: "1px solid black",
              textAlign: "center",
            }}
            title={color}
          ></div>
        ))}
      </div>
      <div className="color-names">
        {colorArray.map((color, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "33.33%",
              textAlign: "center",
              fontSize: "0.7rem",
              fontWeight: "lighter",
              color: "#444444",
              textTransform: "uppercase",
            }}
          >
            {color}
          </span>
        ))}
      </div>
      <p className="description">{description}</p>
      <section className="traits">
        <TraitBulletList traits={traitArray} />
        <MovesBulletList moves={moveArray} />
      </section>
      <MonsterWants wants={wants} dislikes={dislikes} />
      {flavorTitle && flavorItemArray.length > 0 && (
        <>
          <h3 className="section-title">{flavorTitle}</h3>
          <ul className="flavor-table">
            {flavorItemArray.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
