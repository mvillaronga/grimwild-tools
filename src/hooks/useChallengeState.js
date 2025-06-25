import { useState, useMemo } from 'react';

export function useChallengeState() {
  const [pool, setPool] = useState('4');
  const [title, setTitle] = useState('');
  const [traits, setTraits] = useState('');
  const [moves, setMoves] = useState('');
  const [failPool, setFailPool] = useState('0');
  const [failDesc, setFailDesc] = useState('');

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
