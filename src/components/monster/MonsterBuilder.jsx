import React, { useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
import MonsterForm from "./MonsterForm";

export default function MonsterBuilder() {
  const [name, setName] = useState("Basilisk");
  const [type, setType] = useState("Lurker");
  const [colors, setColors] = useState("scaly-green, mossy-brown, rocky-gray");
  const [description, setDescription] = useState(
    "Spiny, eight-legged reptiles that lurk in forgotten, shadowy places. They patiently lay in wait to ambush prey, then feast on the petrified remains."
  );
  const [traits, setTraits] = useState("Sluggish stealth\nSpiny hide\nKeen sense of smell");
  const [moves, setMoves] = useState("Petrifying Gaze\nBite & Thrash\nSlink Away");
  const [wants, setWants] = useState("to munch on a delicious statue, later.");
  const [dislikes, setDislikes] = useState("light revealing its hiding places.");
  const [flavorTitle, setFlavorTitle] = useState("Hiding Spots");
  const [flavorItems, setFlavorItems] = useState(
    "Beneath a crumbling, but still-used bridge.\nWithin the rotting carcass of a fallen dragon.\nOn the fifth floor of a derelict watchtower.\nIn a field full of half-eaten bear statues.\nWithin a maze of rusted, echoing pipes.\nAmong the twisted roots of a giant tree."
  );

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <MonsterForm
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        colors={colors}
        setColors={setColors}
        description={description}
        setDescription={setDescription}
        traits={traits}
        setTraits={setTraits}
        moves={moves}
        setMoves={setMoves}
        wants={wants}
        setWants={setWants}
        dislikes={dislikes}
        setDislikes={setDislikes}
        flavorTitle={flavorTitle}
        setFlavorTitle={setFlavorTitle}
        flavorItems={flavorItems}
        setFlavorItems={setFlavorItems}
      />
      <div style={{ flex: 1 }}>
        <h2>Monster Builder</h2>
        <MonsterDisplay
          name={name}
          type={type}
          colors={colors}
          description={description}
          traits={traits}
          moves={moves}
          wants={wants}
          dislikes={dislikes}
          flavorTitle={flavorTitle}
          flavorItems={flavorItems}
        />
      </div>
    </div>
  );
}
