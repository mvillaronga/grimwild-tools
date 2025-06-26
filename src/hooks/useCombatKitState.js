import { useState } from 'react';

const DEFAULT_COMBAT_KIT = {
  title: 'Boarding a Pirate Ship',
  tier: {
    id: 'tough',
    name: 'TOUGH',
    description: 'A typical, dangerous enemy',
    details: ['One action roll can take out one of them', 'Small groups can be a task pool']
  },
  role: 'MARKSMAN',
  challengeRating: '2-4d',
  battlegroundTitle: 'Boarding a Pirate Ship',
  features: 'Stormy waters, cramped decks\nKraken Tentacles',
  threats: '4d Waves Crashing\nKraken Tentacles',
  additionalEnemies: '4d Deckhands (Mook Brutes)\n4d Rigging Archers (Mook Marksmen)\n3 Swashbucklers (Tough Marauders)\n4d | Pirate Captain (Elite Overseer)'
};

const EMPTY_COMBAT_KIT = {
  title: '',
  tier: null,
  role: '',
  challengeRating: '',
  battlegroundTitle: '',
  features: '',
  threats: '',
  additionalEnemies: ''
};

export function useCombatKitState() {
  const [combatKit, setCombatKit] = useState(DEFAULT_COMBAT_KIT);

  const updateCombatKit = (updates) => {
    setCombatKit(prev => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setCombatKit(DEFAULT_COMBAT_KIT);
  };

  const clearForm = () => {
    setCombatKit(EMPTY_COMBAT_KIT);
  };

  return {
    combatKit,
    updateCombatKit,
    resetToDefaults,
    clearForm
  };
}
