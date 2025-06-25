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
  flavorItems: 'Ancient *treasure* hoard\nPetrified *adventurers*\nRare magical *herbs*\n*Crystal* formations\nForgotten *ruins*\nSacred *grove*',
  flavorColumns: 1
};

// Sample data for different column layouts
export const flavorExamples = {
  singleColumn: {
    title: 'What they guard',
    items: 'Ancient *treasure* hoard\nPetrified *adventurers*\nRare magical *herbs*\n*Crystal* formations\nForgotten *ruins*\nSacred *grove*',
    columns: 1
  },
  twoColumn: {
    title: 'ELDRITCH MUTATIONS CRUCIBLE',
    items: 'acidic\nspiked\nreflective\nextendable\nglowing\nmagic-sensing\nshell\neyestalks\nwings\nantennae\ntail\nclaws',
    columns: 2
  },
  threeColumn: {
    title: 'MIGRATIONS',
    items: 'island\nhamlet\nvalley\ncity\nmines\nship\nmonastery\nindoors\ncrossroad\nchaos\ninside\nbay\nbattle\ncult\ngraveyard\nplague\nfleet\nsacrifices',
    columns: 3
  },
  feedingGrounds: {
    title: 'FEEDING GROUNDS',
    items: 'battle\ncult\ngraveyard\nplague\nfleet\nsacrifices\nhorror\ndeath\nthawed\nkilled\ndashed\nmass\nremnants\nresult\nrecently\nherds\ninvasion\nworshipped',
    columns: 3
  }
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
  const [flavorColumns, setFlavorColumns] = useState(defaultMonsterData.flavorColumns);
  const [flavorColumn1, setFlavorColumn1] = useState(defaultMonsterData.flavorItems);
  const [flavorColumn2, setFlavorColumn2] = useState('');
  const [flavorColumn3, setFlavorColumn3] = useState('');

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
    setFlavorColumns(defaultMonsterData.flavorColumns);
    setFlavorColumn1(defaultMonsterData.flavorItems);
    setFlavorColumn2('');
    setFlavorColumn3('');
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
    setFlavorColumns(1);
    setFlavorColumn1('');
    setFlavorColumn2('');
    setFlavorColumn3('');
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
    flavorColumns,
    setFlavorColumns,
    flavorColumn1,
    setFlavorColumn1,
    flavorColumn2,
    setFlavorColumn2,
    flavorColumn3,
    setFlavorColumn3,
    // Computed values
    colors,
    colorHexes,
    resetToDefaults,
    clearForm
  };
}
