import React from "react";
import "./MonsterDisplay.css";
import TraitBulletList from "../common/TraitBulletList";
import MovesBulletList from "../common/MovesBulletList";
import MonsterWants from "./MonsterWants";
import MonsterSenses from "./MonsterSenses";

export default function MonsterDisplay({
  name,
  type,
  colors,
  colorHexes,
  description,
  traits,
  moves,
  wants,
  dislikes,
  sight,
  sound,
  smell,
  flavorTitle,
  flavorItems,
}) {
  const colorArray = colors.split(",").map((color) => color.trim()).filter(Boolean);
  const traitArray = traits.split("\n").map(trait => trait.trim()).filter(Boolean);
  const moveArray = moves.split("\n").map(move => move.trim()).filter(Boolean);
  const flavorItemArray = flavorItems.split("\n").map(item => item.trim()).filter(Boolean);

  return (
    <article className="monster-block">
      <header className="monster-header">
        <span className="monster-name">
          {name || "Monster Name"}
        </span>
        <span className="monster-role">
          {type || "Monster Type"}
        </span>
      </header>
      
      {colorHexes.length > 0 && (
        <div className="color-bar">
          {colorHexes.map((hex, i) => (
            <div
              key={i}
              className="color-segment"
              style={{
                backgroundColor: hex,
              }}
            >
              {colorArray[i] && (
                <span className="color-label">{colorArray[i]}</span>
              )}
            </div>
          ))}
        </div>
      )}
      
      {description && (
        <>
          <p className="description">{description}</p>
          <hr className="divider-light" />
        </>
      )}

      <section className="traits">
        <div className="traits-moves-columns">
          <div className="traits-column">
            {traitArray.length > 0 && <TraitBulletList traits={traitArray} />}
          </div>
          <div className="moves-column">
            {moveArray.length > 0 && <MovesBulletList moves={moveArray} />}
          </div>
        </div>
      </section>

      {(wants || dislikes) && (
        <>
          <hr className="divider-light" />
          <MonsterWants wants={wants} dislikes={dislikes} />
          <hr className="divider-light" />
        </>
      )}

      <MonsterSenses sight={sight} sound={sound} smell={smell} />

      {flavorTitle && flavorItemArray.length > 0 && (
        <>
          <h3 className="section-title">{flavorTitle}</h3>
          <hr className="divider" />
          <ul className="flavor-table">
            {flavorItemArray.slice(0, 6).map((item, i) => (
              <li key={i} className="flavor-item">
                <img
                  className="dice-face"
                  src={`./images/dice_faces/dice_face_${(i % 6) + 1}.png`}
                  alt={`Dice ${i + 1}`}
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
