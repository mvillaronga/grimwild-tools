import React, { useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
import MonsterForm from "./MonsterForm";
import ImageActionsWrapper from "../common/ImageActionsWrapper";

export default function MonsterBuilder() {
  const [name, setName] = useState("Basilisk");
  const [type, setType] = useState("Lurker");
  const [color1, setColor1] = useState("#6a8f3c");
  const [label1, setLabel1] = useState("scaly green");
  const [color2, setColor2] = useState("#756543");
  const [label2, setLabel2] = useState("mossy brown");
  const [color3, setColor3] = useState("#6e7678");
  const [label3, setLabel3] = useState("rocky gray");
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
        color1={color1}
        setColor1={setColor1}
        label1={label1}
        setLabel1={setLabel1}
        color2={color2}
        setColor2={setColor2}
        label2={label2}
        setLabel2={setLabel2}
        color3={color3}
        setColor3={setColor3}
        label3={label3}
        setLabel3={setLabel3}
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
        <ImageActionsWrapper filename={`${name}.png`}>
          <MonsterDisplay
            name={name}
            type={type}
            colors={`${label1}, ${label2}, ${label3}`}
            colorHexes={[color1, color2, color3]} // Pass the hex values
            description={description}
            traits={traits}
            moves={moves}
            wants={wants}
            dislikes={dislikes}
            flavorTitle={flavorTitle}
            flavorItems={flavorItems}
          />
        </ImageActionsWrapper>
      </div>
    </div>
  );
}
