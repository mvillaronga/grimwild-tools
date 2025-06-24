import { useState } from "react";

export function useChallengeState() {
  const [pool, setPool] = useState("4");
  const [title, setTitle] = useState("Goblin Raider");
  const [traits, setTraits] = useState("Sneaky\nCowardly");
  const [moves, setMoves] = useState("Ambush\nPack Tactics\nFlee into Shadows");
  const [failPool, setFailPool] = useState("3");
  const [failDesc, setFailDesc] = useState("Goblins Scatter");

  // Derived state - processed arrays
  const traitsArr = traits.split("\n").filter(Boolean);
  const movesArr = moves.split("\n").filter(Boolean);

  // Return state and setters as an object
  return {
    // Raw state
    pool,
    title,
    traits,
    moves,
    failPool,
    failDesc,
    
    // Setters
    setPool,
    setTitle,
    setTraits,
    setMoves,
    setFailPool,
    setFailDesc,
    
    // Processed state
    traitsArr,
    movesArr,
  };
}
