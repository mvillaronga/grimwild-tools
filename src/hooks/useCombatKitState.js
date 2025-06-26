import { useState } from 'react';
import { createPoolThreat, createHazardThreat, convertThreatsToText } from '../utils/threatUtils';

const DEFAULT_COMBAT_KIT = {
  title: 'Boarding a Pirate Ship',
  features: 'Stormy waters, cramped decks',
  threats: [
    createPoolThreat('4', 'Waves Crashing'),
    createHazardThreat('Kraken Tentacles')
  ],
  monsters: '4d Deckhands (Mook Brutes)\n4d Rigging Archers (Mook Marksmen)\n3 Swashbucklers (Tough Marauders)\n4d | Pirate Captain (Elite Overseer)'
};

const EMPTY_COMBAT_KIT = {
  title: '',
  features: '',
  threats: [],
  monsters: ''
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

  // Direct threats management - no conversion needed
  const updateThreats = (threats) => {
    updateCombatKit({ threats });
  };

  return {
    combatKit,
    updateCombatKit,
    resetToDefaults,
    clearForm,
    // Direct threats access
    threats: combatKit.threats,
    updateThreats
  };
}
