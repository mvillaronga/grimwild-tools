import { useState } from "react";

export function useMonsterState() {
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

  // Derived state
  const colors = `${label1}, ${label2}, ${label3}`;
  const colorHexes = [color1, color2, color3];

  return {
    // Basic info
    name,
    type,
    description,
    
    // Colors
    color1,
    color2,
    color3,
    label1,
    label2,
    label3,
    colors,
    colorHexes,
    
    // Content
    traits,
    moves,
    wants,
    dislikes,
    flavorTitle,
    flavorItems,
    
    // Setters
    setName,
    setType,
    setDescription,
    setColor1,
    setColor2,
    setColor3,
    setLabel1,
    setLabel2,
    setLabel3,
    setTraits,
    setMoves,
    setWants,
    setDislikes,
    setFlavorTitle,
    setFlavorItems,
  };
}
