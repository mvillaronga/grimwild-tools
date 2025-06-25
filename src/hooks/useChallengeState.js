import { useState, useMemo, useCallback } from 'react';

// Default data for all environments
const defaultChallengeData = {
  pool: '6',
  title: 'Goblin Ambush',
  traits: 'Sneaky\nCowardly\nPack Tactics',
  moves: 'Surprise Attack\nFlee when outnumbered\nCall for reinforcements',
  failPool: '3',
  failDesc: 'Goblins scatter and regroup'
};

export function useChallengeState() {
  const [pool, setPool] = useState(defaultChallengeData.pool);
  const [title, setTitle] = useState(defaultChallengeData.title);
  const [traits, setTraits] = useState(defaultChallengeData.traits);
  const [moves, setMoves] = useState(defaultChallengeData.moves);
  const [failPool, setFailPool] = useState(defaultChallengeData.failPool);
  const [failDesc, setFailDesc] = useState(defaultChallengeData.failDesc);

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

  // Function to reset all fields to default values
  const resetToDefaults = useCallback(() => {
    setPool(defaultChallengeData.pool);
    setTitle(defaultChallengeData.title);
    setTraits(defaultChallengeData.traits);
    setMoves(defaultChallengeData.moves);
    setFailPool(defaultChallengeData.failPool);
    setFailDesc(defaultChallengeData.failDesc);
  }, []);

  // Function to clear all fields
  const clearForm = useCallback(() => {
    setPool('4');
    setTitle('');
    setTraits('');
    setMoves('');
    setFailPool('0');
    setFailDesc('');
  }, []);

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
    setFailDesc,
    resetToDefaults,
    clearForm
  };
}
