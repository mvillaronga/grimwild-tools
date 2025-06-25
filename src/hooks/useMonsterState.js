import { useState, useMemo } from 'react';
import { monsterColourHex } from '../utils/colors';

export function useMonsterState() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color1, setColor1] = useState('');
  const [label1, setLabel1] = useState('');
  const [color2, setColor2] = useState('');
  const [label2, setLabel2] = useState('');
  const [color3, setColor3] = useState('');
  const [label3, setLabel3] = useState('');
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState('');
  const [moves, setMoves] = useState('');
  const [wants, setWants] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [flavorTitle, setFlavorTitle] = useState('');
  const [flavorItems, setFlavorItems] = useState('');

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
    flavorTitle,
    setFlavorTitle,
    flavorItems,
    setFlavorItems,
    // Computed values
    colors,
    colorHexes
  };
}
