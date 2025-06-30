import React from 'react';
import { render } from '@testing-library/react';

/**
 * Custom render function that provides common test setup
 */
export function renderWithProviders(ui, options = {}) {
  return render(ui, {
    ...options,
  });
}

/**
 * Mock hook factory for creating consistent mock implementations
 */
export function createMockHook(defaultReturnValue) {
  return jest.fn(() => defaultReturnValue);
}

/**
 * Helper to create mock state objects for testing
 */
export const mockStates = {
  challenge: {
    pool: '6',
    title: 'Test Challenge',
    traits: 'Test Trait 1\nTest Trait 2',
    traitsArr: ['Test Trait 1', 'Test Trait 2'],
    moves: 'Test Move 1\nTest Move 2',
    movesArr: ['Test Move 1', 'Test Move 2'],
    failPool: '3',
    failDesc: 'Test failure description',
    setPool: jest.fn(),
    setTitle: jest.fn(),
    setTraits: jest.fn(),
    setMoves: jest.fn(),
    setFailPool: jest.fn(),
    setFailDesc: jest.fn(),
    resetToDefaults: jest.fn(),
    clearForm: jest.fn()
  },
  
  monster: {
    name: 'Test Monster',
    type: 'Test Type',
    colors: 'red, blue, green',
    colorHexes: ['#ff0000', '#0000ff', '#00ff00'],
    description: 'Test monster description',
    traits: 'Test Trait 1\nTest Trait 2',
    moves: 'Test Move 1\nTest Move 2',
    wants: 'Test wants',
    dislikes: 'Test dislikes',
    sight: 'Test sight',
    sound: 'Test sound',
    smell: 'Test smell',
    flavorTitle: 'Test Flavor',
    flavorItems: 'Item 1\nItem 2\nItem 3',
    flavorColumns: 1,
    flavorColumn1: 'Item 1\nItem 2\nItem 3',
    flavorColumn2: '',
    flavorColumn3: '',
    setName: jest.fn(),
    setType: jest.fn(),
    setDescription: jest.fn(),
    setTraits: jest.fn(),
    setMoves: jest.fn(),
    setWants: jest.fn(),
    setDislikes: jest.fn(),
    setSight: jest.fn(),
    setSound: jest.fn(),
    setSmell: jest.fn(),
    setFlavorTitle: jest.fn(),
    setFlavorItems: jest.fn(),
    setFlavorColumns: jest.fn(),
    setFlavorColumn1: jest.fn(),
    setFlavorColumn2: jest.fn(),
    setFlavorColumn3: jest.fn(),
    resetToDefaults: jest.fn(),
    clearForm: jest.fn()
  },
  
  combatKit: {
    combatKit: {
      title: 'Test Combat Kit',
      features: 'Test features',
      threats: [
        { id: 'threat1', type: 'pool', pool: '4', name: 'Test Pool Threat' },
        { id: 'threat2', type: 'hazard', name: 'Test Hazard' }
      ],
      monsters: [
        { id: 'monster1', size: 4, name: 'Test Monster', tier: 'Mook', role: 'Brute' }
      ]
    },
    threats: [
      { id: 'threat1', type: 'pool', pool: '4', name: 'Test Pool Threat' },
      { id: 'threat2', type: 'hazard', name: 'Test Hazard' }
    ],
    monsters: [
      { id: 'monster1', size: 4, name: 'Test Monster', tier: 'Mook', role: 'Brute' }
    ],
    updateCombatKit: jest.fn(),
    resetToDefaults: jest.fn(),
    clearForm: jest.fn(),
    updateThreats: jest.fn(),
    updateMonsters: jest.fn()
  },
  
  factionPool: {
    factionPool: {
      title: 'Test Faction',
      resources: 'Test Resource 1\nTest Resource 2',
      goals: [
        { id: 'goal1', pool: '4', description: 'Test Goal 1' },
        { id: 'goal2', pool: '8', description: 'Test Goal 2' }
      ]
    },
    goals: [
      { id: 'goal1', pool: '4', description: 'Test Goal 1' },
      { id: 'goal2', pool: '8', description: 'Test Goal 2' }
    ],
    updateFactionPool: jest.fn(),
    resetToDefaults: jest.fn(),
    clearForm: jest.fn(),
    addGoal: jest.fn(),
    updateGoal: jest.fn(),
    deleteGoal: jest.fn(),
    moveGoal: jest.fn(),
    updateResources: jest.fn()
  },
  
  fictionPillar: {
    fictionPillar: {
      title: 'Test Fiction Pillar',
      wants: 'Test wants',
      doesntWant: 'Test doesnt want',
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell',
      embody: 'Test embody'
    },
    setTitle: jest.fn(),
    setWants: jest.fn(),
    setDoesntWant: jest.fn(),
    setSight: jest.fn(),
    setSound: jest.fn(),
    setSmell: jest.fn(),
    setEmbody: jest.fn(),
    resetToDefaults: jest.fn(),
    clearForm: jest.fn(),
    validationErrors: {}
  }
};

/**
 * Helper to verify that text content appears in the document
 */
export function expectTextInDocument(text) {
  expect(document.body).toHaveTextContent(text);
}

/**
 * Helper to verify that multiple text contents appear in the document
 */
export function expectTextsInDocument(texts) {
  texts.forEach(text => {
    expect(document.body).toHaveTextContent(text);
  });
}
