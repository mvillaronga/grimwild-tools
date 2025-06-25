import { useState, useMemo, useCallback } from 'react';
import { monsterColourHex } from '../utils/colors';

// Default data for all environments
const defaultMonsterData = {
  name: 'Forest Basilisk',
  type: 'Beast',
  color1: 'scaly green',
  label1: 'scaly green',
  color2: 'mossy brown',
  label2: 'mossy brown',
  color3: 'rocky gray',
  label3: 'rocky gray',
  description: 'A serpentine creature with a deadly gaze, dwelling in ancient forests where stone statues mark its territory.',
  traits: 'Petrifying Gaze\nVenomous Bite\nArmored Scales',
  moves: 'Stone Stare\nVenom Strike\nTail Sweep',
  wants: 'Solitude and territory',
  dislikes: 'Bright lights and mirrors',
  sight: 'Glowing yellow eyes that pierce through darkness',
  sound: 'Low hissing and scraping of scales on stone',
  smell: 'Musty earth and ancient decay',
  flavorTitle: 'What they guard',
  flavorItems: 'Ancient treasure hoard\nPetrified adventurers\nRare magical herbs\nCrystal formations\nForgotten ruins\nSacred grove'
};

export function useMonsterState(customColors = {}) {
  const [name, setName] = useState(defaultMonsterData.name);
  const [type, setType] = useState(defaultMonsterData.type);
  const [color1, setColor1] = useState(defaultMonsterData.color1);
  const [label1, setLabel1] = useState(defaultMonsterData.label1);
  const [color2, setColor2] = useState(defaultMonsterData.color2);
  const [label2, setLabel2] = useState(defaultMonsterData.label2);
  const [color3, setColor3] = useState(defaultMonsterData.color3);
  const [label3, setLabel3] = useState(defaultMonsterData.label3);
  const [description, setDescription] = useState(defaultMonsterData.description);
  const [traits, setTraits] = useState(defaultMonsterData.traits);
  const [moves, setMoves] = useState(defaultMonsterData.moves);
  const [wants, setWants] = useState(defaultMonsterData.wants);
  const [dislikes, setDislikes] = useState(defaultMonsterData.dislikes);
  const [sight, setSight] = useState(defaultMonsterData.sight);
  const [sound, setSound] = useState(defaultMonsterData.sound);
  const [smell, setSmell] = useState(defaultMonsterData.smell);
  const [flavorTitle, setFlavorTitle] = useState(defaultMonsterData.flavorTitle);
  const [flavorItems, setFlavorItems] = useState(defaultMonsterData.flavorItems);

  // Computed values for display
  const colors = useMemo(() => {
    const colorLabels = [label1, label2, label3].filter(Boolean);
    return colorLabels.join(', ');
  }, [label1, label2, label3]);

  const colorHexes = useMemo(() => {
    const hexValues = [];
    const allColors = { ...monsterColourHex, ...customColors };

    // Helper function to get hex value from color (predefined or custom)
    const getHexValue = (color) => {
      if (!color) return null;

      // Check if it's in our combined color palette
      if (allColors[color]) {
        return allColors[color];
      }

      return null;
    };

    const hex1 = getHexValue(color1);
    const hex2 = getHexValue(color2);
    const hex3 = getHexValue(color3);

    if (hex1) hexValues.push(hex1);
    if (hex2) hexValues.push(hex2);
    if (hex3) hexValues.push(hex3);

    return hexValues;
  }, [color1, color2, color3, customColors]);

  // Function to reset all fields to default values
  const resetToDefaults = useCallback(() => {
    setName(defaultMonsterData.name);
    setType(defaultMonsterData.type);
    setColor1(defaultMonsterData.color1);
    setLabel1(defaultMonsterData.label1);
    setColor2(defaultMonsterData.color2);
    setLabel2(defaultMonsterData.label2);
    setColor3(defaultMonsterData.color3);
    setLabel3(defaultMonsterData.label3);
    setDescription(defaultMonsterData.description);
    setTraits(defaultMonsterData.traits);
    setMoves(defaultMonsterData.moves);
    setWants(defaultMonsterData.wants);
    setDislikes(defaultMonsterData.dislikes);
    setSight(defaultMonsterData.sight);
    setSound(defaultMonsterData.sound);
    setSmell(defaultMonsterData.smell);
    setFlavorTitle(defaultMonsterData.flavorTitle);
    setFlavorItems(defaultMonsterData.flavorItems);
  }, []);

  // Function to clear all fields
  const clearForm = useCallback(() => {
    setName('');
    setType('');
    setColor1('');
    setLabel1('');
    setColor2('');
    setLabel2('');
    setColor3('');
    setLabel3('');
    setDescription('');
    setTraits('');
    setMoves('');
    setWants('');
    setDislikes('');
    setSight('');
    setSound('');
    setSmell('');
    setFlavorTitle('');
    setFlavorItems('');
  }, []);

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
    colorHexes,
    resetToDefaults,
    clearForm
  };
}
