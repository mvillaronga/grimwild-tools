import { useState, useMemo } from 'react';
import { monsterColourHex } from '../utils/colors';

// Default data for local development
const isDevelopment = import.meta.env.DEV;

const defaultMonsterData = {
  name: 'Forest Basilisk',
  type: 'Beast',
  color1: 'scaly green',
  label1: 'scales',
  color2: 'mossy brown',
  label2: 'hide',
  color3: 'rocky gray',
  label3: 'claws',
  description: 'A serpentine creature with a deadly gaze, dwelling in ancient forests where stone statues mark its territory.',
  traits: 'Petrifying Gaze\nVenomous Bite\nArmored Scales',
  moves: 'Stone Stare - paralyze with gaze\nVenom Strike - poisonous bite\nTail Sweep - knock prone',
  wants: 'Solitude and territory',
  dislikes: 'Bright lights and mirrors',
  sight: 'Glowing yellow eyes that pierce through darkness',
  sound: 'Low hissing and scraping of scales on stone',
  smell: 'Musty earth and ancient decay',
  flavorTitle: 'What they guard',
  flavorItems: 'Ancient treasure hoard\nPetrified adventurers\nRare magical herbs\nCrystal formations\nForgotten ruins\nSacred grove'
};

export function useMonsterState() {
  const [name, setName] = useState(isDevelopment ? defaultMonsterData.name : '');
  const [type, setType] = useState(isDevelopment ? defaultMonsterData.type : '');
  const [color1, setColor1] = useState(isDevelopment ? defaultMonsterData.color1 : '');
  const [label1, setLabel1] = useState(isDevelopment ? defaultMonsterData.label1 : '');
  const [color2, setColor2] = useState(isDevelopment ? defaultMonsterData.color2 : '');
  const [label2, setLabel2] = useState(isDevelopment ? defaultMonsterData.label2 : '');
  const [color3, setColor3] = useState(isDevelopment ? defaultMonsterData.color3 : '');
  const [label3, setLabel3] = useState(isDevelopment ? defaultMonsterData.label3 : '');
  const [description, setDescription] = useState(isDevelopment ? defaultMonsterData.description : '');
  const [traits, setTraits] = useState(isDevelopment ? defaultMonsterData.traits : '');
  const [moves, setMoves] = useState(isDevelopment ? defaultMonsterData.moves : '');
  const [wants, setWants] = useState(isDevelopment ? defaultMonsterData.wants : '');
  const [dislikes, setDislikes] = useState(isDevelopment ? defaultMonsterData.dislikes : '');
  const [sight, setSight] = useState(isDevelopment ? defaultMonsterData.sight : '');
  const [sound, setSound] = useState(isDevelopment ? defaultMonsterData.sound : '');
  const [smell, setSmell] = useState(isDevelopment ? defaultMonsterData.smell : '');
  const [flavorTitle, setFlavorTitle] = useState(isDevelopment ? defaultMonsterData.flavorTitle : '');
  const [flavorItems, setFlavorItems] = useState(isDevelopment ? defaultMonsterData.flavorItems : '');

  // Computed values for display
  const colors = useMemo(() => {
    const colorLabels = [label1, label2, label3].filter(Boolean);
    return colorLabels.join(', ');
  }, [label1, label2, label3]);

  const colorHexes = useMemo(() => {
    const hexValues = [];
    if (color1 && monsterColourHex[color1]) hexValues.push(monsterColourHex[color1]);
    if (color2 && monsterColourHex[color2]) hexValues.push(monsterColourHex[color2]);
    if (color3 && monsterColourHex[color3]) hexValues.push(monsterColourHex[color3]);
    return hexValues;
  }, [color1, color2, color3]);

  return {
    name,
    setName,
    type,
    setType,
    color1,
    setColor1,
    label1,
    setLabel1,
    color2,
    setColor2,
    label2,
    setLabel2,
    color3,
    setColor3,
    label3,
    setLabel3,
    description,
    setDescription,
    traits,
    setTraits,
    moves,
    setMoves,
    wants,
    setWants,
    dislikes,
    setDislikes,
    sight,
    setSight,
    sound,
    setSound,
    smell,
    setSmell,
    flavorTitle,
    setFlavorTitle,
    flavorItems,
    setFlavorItems,
    // Computed values
    colors,
    colorHexes
  };
}
