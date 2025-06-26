import React from "react";
import "./MonsterDisplay.css";
import TraitBulletList from "../common/TraitBulletList";
import MovesBulletList from "../common/MovesBulletList";
import WantsDislikesDisplay from "../common/WantsDislikesDisplay";
import SensoryDisplay from "../common/SensoryDisplay";
import { parseTextWithBold } from "../../utils/textFormatting.jsx";

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
  flavorColumns,
  flavorColumn1,
  flavorColumn2,
  flavorColumn3,
}) {
  const colorArray = colors.split(",").map((color) => color.trim()).filter(Boolean);
  const traitArray = traits.split("\n").map(trait => trait.trim()).filter(Boolean);
  const moveArray = moves.split("\n").map(move => move.trim()).filter(Boolean);

  // Handle flavor data based on column count
  let flavorData = [];

  if (flavorColumns > 0) {
    if (flavorColumns === 1) {
      // Single column: use flavorColumn1
      const items = flavorColumn1.split("\n").map(item => item.trim());
      // Ensure exactly 6 items (pad with empty strings if needed)
      const paddedItems = [];
      for (let i = 0; i < 6; i++) {
        paddedItems.push(items[i] || '');
      }
      flavorData = [paddedItems];
    } else if (flavorColumns === 2) {
      // Two columns: use flavorColumn1 and flavorColumn2
      const col1Items = flavorColumn1.split("\n").map(item => item.trim());
      const col2Items = flavorColumn2.split("\n").map(item => item.trim());

      // Ensure exactly 6 items per column
      const paddedCol1 = [];
      const paddedCol2 = [];
      for (let i = 0; i < 6; i++) {
        paddedCol1.push(col1Items[i] || '');
        paddedCol2.push(col2Items[i] || '');
      }
      flavorData = [paddedCol1, paddedCol2];
    } else if (flavorColumns === 3) {
      // Three columns: use flavorColumn1, flavorColumn2, and flavorColumn3
      const col1Items = flavorColumn1.split("\n").map(item => item.trim());
      const col2Items = flavorColumn2.split("\n").map(item => item.trim());
      const col3Items = flavorColumn3.split("\n").map(item => item.trim());

      // Ensure exactly 6 items per column
      const paddedCol1 = [];
      const paddedCol2 = [];
      const paddedCol3 = [];
      for (let i = 0; i < 6; i++) {
        paddedCol1.push(col1Items[i] || '');
        paddedCol2.push(col2Items[i] || '');
        paddedCol3.push(col3Items[i] || '');
      }
      flavorData = [paddedCol1, paddedCol2, paddedCol3];
    }
  }

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
        <>
          <div className="color-bar">
            {colorHexes.map((hex, i) => (
              <div
                key={i}
                className="color-segment"
                style={{
                  backgroundColor: hex,
                }}
              />
            ))}
          </div>
          {colorArray.some(label => label) && (
            <div className="color-labels">
              {colorHexes.map((hex, i) => (
                <span key={i} className="color-label">
                  {colorArray[i] || ''}
                </span>
              ))}
            </div>
          )}
        </>
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
          <WantsDislikesDisplay wants={wants} doesntWant={dislikes} />
          <hr className="divider-light" />
        </>
      )}

      <SensoryDisplay sight={sight} sound={sound} smell={smell} />

      {flavorColumns > 0 && flavorTitle && (
        <>
          <h3 className="section-title">{flavorTitle}</h3>
          <hr className="divider" />
          <div className={`flavor-table flavor-columns-${flavorColumns}`}>
            {flavorData.map((columnItems, columnIndex) => (
              <ul key={columnIndex} className="flavor-column">
                {columnItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="flavor-item">
                    <img
                      className="dice-face"
                      src={`./images/dice_faces/dice_face_${(itemIndex % 6) + 1}.png`}
                      alt={`Dice ${itemIndex + 1}`}
                    />
                    <span>
                      {item ? (flavorColumns === 1 ? parseTextWithBold(item, `flavor-${columnIndex}-${itemIndex}`) : item) : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
