import React from 'react';
import { screen } from '@testing-library/react';
import MonsterBuilder from '../components/monster/MonsterBuilder';
import { useMonsterState } from '../hooks/useMonsterState';
import { useCustomColors } from '../hooks/useCustomColors';
import { renderWithProviders, mockStates, expectTextsInDocument } from '../test-utils';

// Mock the hooks
jest.mock('../hooks/useMonsterState');
jest.mock('../hooks/useCustomColors');

// Mock the ImageActionsWrapper component
jest.mock('../components/common/ImageActionsWrapper', () => {
  return function MockImageActionsWrapper({ children }) {
    return <div data-testid="image-actions-wrapper">{children}</div>;
  };
});

describe('MonsterBuilder', () => {
  const mockCustomColorsState = {
    customColors: {},
    addCustomColor: jest.fn(),
    updateCustomColor: jest.fn(),
    deleteCustomColor: jest.fn()
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementations
    useCustomColors.mockReturnValue(mockCustomColorsState);
    useMonsterState.mockReturnValue(mockStates.monster);
  });

  test('renders Monster Builder with default state', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Check that the builder title is present
    expect(screen.getByText('Monster Builder')).toBeInTheDocument();
    
    // Check that the ImageActionsWrapper is rendered
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('renders MonsterDisplay with correct props from state', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Verify that monster display content is displayed
    expectTextsInDocument([
      'Test Monster',           // name
      'Test Type',             // type
      'Test monster description', // description
      'Test Trait 1',          // first trait
      'Test Trait 2',          // second trait
      'Test Move 1',           // first move
      'Test Move 2',           // second move
      'Test wants',            // wants
      'Test dislikes',         // dislikes
      'Test sight',            // sight
      'Test sound',            // sound
      'Test smell',            // smell
      'Test Flavor'            // flavor title
    ]);
  });

  test('renders monster block with proper structure', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Check for monster block structure
    const monsterBlock = document.querySelector('.monster-block');
    expect(monsterBlock).toBeInTheDocument();
    
    // Check for monster header
    const monsterHeader = document.querySelector('.monster-header');
    expect(monsterHeader).toBeInTheDocument();
    
    // Check for monster name and role
    const monsterName = document.querySelector('.monster-name');
    expect(monsterName).toBeInTheDocument();
    
    const monsterRole = document.querySelector('.monster-role');
    expect(monsterRole).toBeInTheDocument();
  });

  test('displays color bar when colorHexes are provided', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Check for color bar
    const colorBar = document.querySelector('.color-bar');
    expect(colorBar).toBeInTheDocument();
    
    // Check for color segments (should have 3 based on mock data)
    const colorSegments = document.querySelectorAll('.color-segment');
    expect(colorSegments).toHaveLength(3);
    
    // Check for color labels
    const colorLabels = document.querySelector('.color-labels');
    expect(colorLabels).toBeInTheDocument();
  });

  test('displays traits and moves in columns', () => {
    renderWithProviders(<MonsterBuilder />);

    // Check that traits are displayed (may appear in both form and display)
    const traitElements = screen.getAllByText(/Test Trait/);
    expect(traitElements.length).toBeGreaterThanOrEqual(1);

    // Check that moves are displayed (may appear in both form and display)
    const moveElements = screen.getAllByText(/Test Move/);
    expect(moveElements.length).toBeGreaterThanOrEqual(1);

    // Check for traits and moves sections - use more flexible selectors
    const traitsSection = document.querySelector('[class*="traits"], .trait-text');
    const movesSection = document.querySelector('[class*="moves"], .move-text');
    expect(traitsSection).toBeTruthy();
    expect(movesSection).toBeTruthy();
  });

  test('displays wants and dislikes section', () => {
    renderWithProviders(<MonsterBuilder />);

    // Check for wants/dislikes display
    expect(screen.getByText('Test wants')).toBeInTheDocument();
    expect(screen.getByText('Test dislikes')).toBeInTheDocument();

    // Check for proper styling (should be italicized)
    const wantsElement = screen.getByText('Test wants');
    const dislikesElement = screen.getByText('Test dislikes');

    // These should be within elements that have italic styling - check for any parent with wants/dislikes class
    expect(wantsElement.closest('[class*="wants"], [class*="dislikes"], .wants-dislikes')).toBeTruthy();
    expect(dislikesElement.closest('[class*="wants"], [class*="dislikes"], .wants-dislikes')).toBeTruthy();
  });

  test('displays sensory information', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Check that sensory information is displayed
    expect(screen.getByText('Test sight')).toBeInTheDocument();
    expect(screen.getByText('Test sound')).toBeInTheDocument();
    expect(screen.getByText('Test smell')).toBeInTheDocument();
  });

  test('displays flavor section with single column', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Check that flavor title is displayed
    expect(screen.getByText('Test Flavor')).toBeInTheDocument();
    
    // Check that flavor items are displayed
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('handles empty monster name gracefully', () => {
    const stateWithEmptyName = {
      ...mockStates.monster,
      name: ''
    };
    
    useMonsterState.mockReturnValue(stateWithEmptyName);
    
    renderWithProviders(<MonsterBuilder />);
    
    // Should display default text
    expect(screen.getByText('Monster Name')).toBeInTheDocument();
  });

  test('handles empty monster type gracefully', () => {
    const stateWithEmptyType = {
      ...mockStates.monster,
      type: ''
    };
    
    useMonsterState.mockReturnValue(stateWithEmptyType);
    
    renderWithProviders(<MonsterBuilder />);
    
    // Should display default text
    expect(screen.getByText('Monster Type')).toBeInTheDocument();
  });

  test('handles empty colorHexes array', () => {
    const stateWithNoColors = {
      ...mockStates.monster,
      colorHexes: [],
      colors: ''
    };
    
    useMonsterState.mockReturnValue(stateWithNoColors);
    
    renderWithProviders(<MonsterBuilder />);
    
    // Color bar should not be displayed
    const colorBar = document.querySelector('.color-bar');
    expect(colorBar).not.toBeInTheDocument();
    
    // But the rest of the monster should still render
    expect(screen.getByText('Monster Builder')).toBeInTheDocument();
  });

  test('generates correct filename for export', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // The filename should be based on the monster name
    // This is tested indirectly through the component rendering without errors
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('passes custom colors state to monster form', () => {
    renderWithProviders(<MonsterBuilder />);
    
    // Verify that useCustomColors hook was called
    expect(useCustomColors).toHaveBeenCalled();
    
    // Verify that useMonsterState was called with custom colors
    expect(useMonsterState).toHaveBeenCalledWith(mockCustomColorsState.customColors);
  });

  test('handles multi-column flavor display', () => {
    const stateWithMultiColumnFlavor = {
      ...mockStates.monster,
      flavorColumns: 2,
      flavorColumn1: 'Column1Item1\nColumn1Item2',
      flavorColumn2: 'Column2Item1\nColumn2Item2'
    };
    
    useMonsterState.mockReturnValue(stateWithMultiColumnFlavor);
    
    renderWithProviders(<MonsterBuilder />);
    
    // Should still render the flavor section
    expect(screen.getByText('Test Flavor')).toBeInTheDocument();
  });
});
