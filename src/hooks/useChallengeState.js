import { useState, useMemo } from 'react';

// Default data for local development
const isDevelopment = import.meta.env.DEV;

const defaultChallengeData = {
  pool: '6',
  title: 'Goblin Ambush',
  traits: 'Sneaky\nCowardly\nPack Tactics',
  moves: 'Surprise Attack\nFlee when outnumbered\nCall for reinforcements',
  failPool: '3',
  failDesc: 'Goblins scatter and regroup'
};

export function useChallengeState() {
  const [pool, setPool] = useState(isDevelopment ? defaultChallengeData.pool : '4');
  const [title, setTitle] = useState(isDevelopment ? defaultChallengeData.title : '');
  const [traits, setTraits] = useState(isDevelopment ? defaultChallengeData.traits : '');
  const [moves, setMoves] = useState(isDevelopment ? defaultChallengeData.moves : '');
  const [failPool, setFailPool] = useState(isDevelopment ? defaultChallengeData.failPool : '0');
  const [failDesc, setFailDesc] = useState(isDevelopment ? defaultChallengeData.failDesc : '');

  // Convert text inputs to arrays for display
  const traitsArr = useMemo(() => {
    return traits
      .split('\n')
      .map(trait => trait.trim())
      .filter(trait => trait.length > 0);
  }, [traits]);

  const movesArr = useMemo(() => {
    return moves
      .split('\n')
      .map(move => move.trim())
      .filter(move => move.length > 0);
  }, [moves]);

  return {
    pool,
    setPool,
    title,
    setTitle,
    traits,
    setTraits,
    traitsArr,
    moves,
    setMoves,
    movesArr,
    failPool,
    setFailPool,
    failDesc,
    setFailDesc
  };
}
