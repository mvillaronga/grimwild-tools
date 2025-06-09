import React from "react";
import "./MonsterDisplay.css";
import TraitBulletList from "../common/TraitBulletList";
import MovesBulletList from "../common/MovesBulletList";
import MonsterWants from "./MonsterWants";

export default function MonsterDisplay({
  name,
  type,
  colors,
  colorHexes, // Add colorHexes prop
  description,
  traits,
  moves,
  wants,
  dislikes,
  flavorTitle,
  flavorItems,
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
        {colorHexes.map((hex, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: hex,
              border: "1px solid black",
              textAlign: "center",
            }}
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
              <li key={i}>
                <img
                  className="dice-face"
                  src={`/images/dice_faces/dice_face_${(i % 6) + 1}.png`}
                  alt={`Dice ${i + 1}`}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "0.5rem",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
