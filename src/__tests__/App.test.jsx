import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';

// Mock all the builder components
jest.mock('../components/challenge/ChallengeBuilder', () => {
  return function MockChallengeBuilder() {
    return <div data-testid="challenge-builder">Challenge Builder Component</div>;
  };
});

jest.mock('../components/monster/MonsterBuilder', () => {
  return function MockMonsterBuilder() {
    return <div data-testid="monster-builder">Monster Builder Component</div>;
  };
});

jest.mock('../components/combatkit/CombatKitBuilder', () => {
  return function MockCombatKitBuilder() {
    return <div data-testid="combatkit-builder">Combat Kit Builder Component</div>;
  };
});

jest.mock('../components/factionpool/FactionPoolBuilder', () => {
  return function MockFactionPoolBuilder() {
    return <div data-testid="factionpool-builder">Faction Pool Builder Component</div>;
  };
});

jest.mock('../components/fictionpillar/FictionPillarBuilder', () => {
  return function MockFictionPillarBuilder() {
    return <div data-testid="fictionpillar-builder">Fiction Pillar Builder Component</div>;
  };
});

describe('App', () => {
  test('renders main app title', () => {
    renderWithProviders(<App />);
    
    // Check that the main title is present
    expect(screen.getByText('Grimwild Tools')).toBeInTheDocument();
  });

  test('renders all five tab buttons', () => {
    renderWithProviders(<App />);
    
    // Check that all tab buttons are present
    expect(screen.getByText('Challenge')).toBeInTheDocument();
    expect(screen.getByText('Monsters')).toBeInTheDocument();
    expect(screen.getByText('Combat Kit')).toBeInTheDocument();
    expect(screen.getByText('Faction Pools')).toBeInTheDocument();
    expect(screen.getByText('Fiction Pillars')).toBeInTheDocument();
  });

  test('renders Challenge tab as active by default', () => {
    renderWithProviders(<App />);
    
    // Challenge tab should be active by default
    const challengeTab = screen.getByText('Challenge');
    expect(challengeTab).toHaveClass('active');
    
    // Challenge builder should be displayed
    expect(screen.getByTestId('challenge-builder')).toBeInTheDocument();
    
    // Other builders should not be displayed
    expect(screen.queryByTestId('monster-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('combatkit-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('factionpool-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fictionpillar-builder')).not.toBeInTheDocument();
  });

  test('switches to Monsters tab when clicked', () => {
    renderWithProviders(<App />);
    
    // Click on Monsters tab
    const monstersTab = screen.getByText('Monsters');
    fireEvent.click(monstersTab);
    
    // Monsters tab should now be active
    expect(monstersTab).toHaveClass('active');
    
    // Challenge tab should no longer be active
    const challengeTab = screen.getByText('Challenge');
    expect(challengeTab).not.toHaveClass('active');
    
    // Monster builder should be displayed
    expect(screen.getByTestId('monster-builder')).toBeInTheDocument();
    
    // Other builders should not be displayed
    expect(screen.queryByTestId('challenge-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('combatkit-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('factionpool-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fictionpillar-builder')).not.toBeInTheDocument();
  });

  test('switches to Combat Kit tab when clicked', () => {
    renderWithProviders(<App />);
    
    // Click on Combat Kit tab
    const combatKitTab = screen.getByText('Combat Kit');
    fireEvent.click(combatKitTab);
    
    // Combat Kit tab should now be active
    expect(combatKitTab).toHaveClass('active');
    
    // Combat Kit builder should be displayed
    expect(screen.getByTestId('combatkit-builder')).toBeInTheDocument();
    
    // Other builders should not be displayed
    expect(screen.queryByTestId('challenge-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monster-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('factionpool-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fictionpillar-builder')).not.toBeInTheDocument();
  });

  test('switches to Faction Pools tab when clicked', () => {
    renderWithProviders(<App />);
    
    // Click on Faction Pools tab
    const factionPoolsTab = screen.getByText('Faction Pools');
    fireEvent.click(factionPoolsTab);
    
    // Faction Pools tab should now be active
    expect(factionPoolsTab).toHaveClass('active');
    
    // Faction Pool builder should be displayed
    expect(screen.getByTestId('factionpool-builder')).toBeInTheDocument();
    
    // Other builders should not be displayed
    expect(screen.queryByTestId('challenge-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monster-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('combatkit-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fictionpillar-builder')).not.toBeInTheDocument();
  });

  test('switches to Fiction Pillars tab when clicked', () => {
    renderWithProviders(<App />);
    
    // Click on Fiction Pillars tab
    const fictionPillarsTab = screen.getByText('Fiction Pillars');
    fireEvent.click(fictionPillarsTab);
    
    // Fiction Pillars tab should now be active
    expect(fictionPillarsTab).toHaveClass('active');
    
    // Fiction Pillar builder should be displayed
    expect(screen.getByTestId('fictionpillar-builder')).toBeInTheDocument();
    
    // Other builders should not be displayed
    expect(screen.queryByTestId('challenge-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('monster-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('combatkit-builder')).not.toBeInTheDocument();
    expect(screen.queryByTestId('factionpool-builder')).not.toBeInTheDocument();
  });

  test('can switch between multiple tabs', () => {
    renderWithProviders(<App />);
    
    // Start with Challenge (default)
    expect(screen.getByTestId('challenge-builder')).toBeInTheDocument();
    
    // Switch to Monsters
    fireEvent.click(screen.getByText('Monsters'));
    expect(screen.getByTestId('monster-builder')).toBeInTheDocument();
    expect(screen.queryByTestId('challenge-builder')).not.toBeInTheDocument();
    
    // Switch to Combat Kit
    fireEvent.click(screen.getByText('Combat Kit'));
    expect(screen.getByTestId('combatkit-builder')).toBeInTheDocument();
    expect(screen.queryByTestId('monster-builder')).not.toBeInTheDocument();
    
    // Switch back to Challenge
    fireEvent.click(screen.getByText('Challenge'));
    expect(screen.getByTestId('challenge-builder')).toBeInTheDocument();
    expect(screen.queryByTestId('combatkit-builder')).not.toBeInTheDocument();
  });

  test('maintains proper tab styling', () => {
    renderWithProviders(<App />);
    
    // Initially, Challenge should be active
    const challengeTab = screen.getByText('Challenge');
    const monstersTab = screen.getByText('Monsters');
    
    expect(challengeTab).toHaveClass('active');
    expect(monstersTab).not.toHaveClass('active');
    
    // Click Monsters tab
    fireEvent.click(monstersTab);
    
    // Now Monsters should be active, Challenge should not
    expect(monstersTab).toHaveClass('active');
    expect(challengeTab).not.toHaveClass('active');
  });

  test('renders tab container and tab bar structure', () => {
    renderWithProviders(<App />);
    
    // Check for tab container structure
    const tabContainer = document.querySelector('.tabContainer');
    expect(tabContainer).toBeInTheDocument();
    
    const tabBar = document.querySelector('.tabBar');
    expect(tabBar).toBeInTheDocument();
    
    // Check for tab content area
    const tabContent = document.querySelector('.tabContent');
    expect(tabContent).toBeInTheDocument();
  });

  test('renders app with proper structure', () => {
    renderWithProviders(<App />);
    
    // Check for main app container
    const appContainer = document.querySelector('.app');
    expect(appContainer).toBeInTheDocument();
    
    // Check for title
    const title = document.querySelector('.title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Grimwild Tools');
  });

  test('all tabs are clickable buttons', () => {
    renderWithProviders(<App />);
    
    // All tab elements should be buttons
    const challengeTab = screen.getByText('Challenge');
    const monstersTab = screen.getByText('Monsters');
    const combatKitTab = screen.getByText('Combat Kit');
    const factionPoolsTab = screen.getByText('Faction Pools');
    const fictionPillarsTab = screen.getByText('Fiction Pillars');
    
    expect(challengeTab.tagName).toBe('BUTTON');
    expect(monstersTab.tagName).toBe('BUTTON');
    expect(combatKitTab.tagName).toBe('BUTTON');
    expect(factionPoolsTab.tagName).toBe('BUTTON');
    expect(fictionPillarsTab.tagName).toBe('BUTTON');
  });
});
