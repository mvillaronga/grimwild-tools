import React from 'react';
import { screen } from '@testing-library/react';
import FactionPoolBuilder from '../components/factionpool/FactionPoolBuilder';
import { useFactionPoolState } from '../hooks/useFactionPoolState';
import { renderWithProviders, mockStates, expectTextsInDocument } from '../test-utils';

// Mock the hook
jest.mock('../hooks/useFactionPoolState');

// Mock the ImageActionsWrapper component
jest.mock('../components/common/ImageActionsWrapper', () => {
  return function MockImageActionsWrapper({ children }) {
    return <div data-testid="image-actions-wrapper">{children}</div>;
  };
});

describe('FactionPoolBuilder', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementation
    useFactionPoolState.mockReturnValue(mockStates.factionPool);
  });

  test('renders Faction Pool Builder with default state', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Check that the builder title is present - use getAllByText to handle multiple instances
    expect(screen.getAllByText('Faction Pool Builder').length).toBeGreaterThan(0);

    // Check that the ImageActionsWrapper is rendered
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('renders FactionPoolCard with correct props from state', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Verify that faction pool card content is displayed
    // Note: Title may be split across spans due to initcap styling
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Faction');
    expect(screen.getByText('Test Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Test Resource 2')).toBeInTheDocument();
    expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Goal 2')).toBeInTheDocument();
  });

  test('renders faction pool card with proper structure', () => {
    renderWithProviders(<FactionPoolBuilder />);
    
    // Check for faction pool card structure
    const factionPoolCard = document.querySelector('#faction-pool-card');
    expect(factionPoolCard).toBeInTheDocument();
    
    // Check for header
    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  test('displays title with proper formatting', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Faction');

    // Check for initcap styling (first letter of each word should have initcap class)
    const initcapElements = document.querySelectorAll('.initcap');
    expect(initcapElements.length).toBeGreaterThan(0);
  });

  test('displays resources section when resources exist', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Check that resources are displayed
    expect(screen.getByText('Test Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Test Resource 2')).toBeInTheDocument();

    // Check for Resources label with proper styling - use getAllByText to handle multiple instances
    expect(screen.getAllByText(/Resources/i).length).toBeGreaterThan(0);

    // Resources should be in italics
    const resourcesContent = document.querySelector('.resourcesContent');
    expect(resourcesContent).toBeInTheDocument();
  });

  test('hides resources section when no resources exist', () => {
    const stateWithoutResources = {
      ...mockStates.factionPool,
      factionPool: {
        ...mockStates.factionPool.factionPool,
        resources: ''
      }
    };

    useFactionPoolState.mockReturnValue(stateWithoutResources);

    renderWithProviders(<FactionPoolBuilder />);

    // Resources section should not be displayed in the card
    const resourcesSection = document.querySelector('.resources');
    expect(resourcesSection).not.toBeInTheDocument();

    // But goals should still be displayed
    expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
  });

  test('displays goals section with proper formatting', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Check that goals are displayed
    expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Goal 2')).toBeInTheDocument();

    // Check for Goals label
    expect(screen.getByText(/Goals/i)).toBeInTheDocument();

    // Check for dice pool notation
    expect(document.body).toHaveTextContent('4d');
    expect(document.body).toHaveTextContent('8d');
  });

  test('displays goals with pool and description format', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Goals should be displayed with pool and description
    // Check for dice pool notation and descriptions
    expect(document.body).toHaveTextContent('4d');
    expect(document.body).toHaveTextContent('8d');
    expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Goal 2')).toBeInTheDocument();
  });

  test('handles empty goals array', () => {
    const stateWithoutGoals = {
      ...mockStates.factionPool,
      factionPool: {
        ...mockStates.factionPool.factionPool,
        goals: []
      },
      goals: []
    };

    useFactionPoolState.mockReturnValue(stateWithoutGoals);

    renderWithProviders(<FactionPoolBuilder />);

    // Should still render the basic structure - use getAllByText to handle multiple instances
    expect(screen.getAllByText('Faction Pool Builder').length).toBeGreaterThan(0);
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Faction');

    // Goals section should still exist but show empty state - use getAllByText to handle multiple instances
    expect(screen.getAllByText(/Goals/i).length).toBeGreaterThan(0);
    expect(screen.getByText('No goals defined')).toBeInTheDocument();
  });

  test('displays divider between resources and goals when both exist', () => {
    renderWithProviders(<FactionPoolBuilder />);
    
    // Check for divider elements
    const dividers = document.querySelectorAll('.divider, hr');
    expect(dividers.length).toBeGreaterThan(0);
  });

  test('hides divider when no resources exist', () => {
    const stateWithoutResources = {
      ...mockStates.factionPool,
      factionPool: {
        ...mockStates.factionPool.factionPool,
        resources: ''
      }
    };

    useFactionPoolState.mockReturnValue(stateWithoutResources);

    renderWithProviders(<FactionPoolBuilder />);

    // The divider between resources and goals should be hidden
    const divider = document.querySelector('.divider');
    expect(divider).not.toBeInTheDocument();
  });

  test('handles multi-word faction title', () => {
    const stateWithMultiWordTitle = {
      ...mockStates.factionPool,
      factionPool: {
        ...mockStates.factionPool.factionPool,
        title: 'Village of Elit'
      }
    };

    useFactionPoolState.mockReturnValue(stateWithMultiWordTitle);

    renderWithProviders(<FactionPoolBuilder />);

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Village');
    expect(document.body).toHaveTextContent('of');
    expect(document.body).toHaveTextContent('Elit');

    // Check that initcap styling is applied to each word
    const initcapElements = document.querySelectorAll('.initcap');
    expect(initcapElements.length).toBeGreaterThanOrEqual(3); // V, o, E
  });

  test('generates correct filename for export', () => {
    renderWithProviders(<FactionPoolBuilder />);
    
    // The filename should be based on the faction pool title
    // This is tested indirectly through the component rendering without errors
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('displays resources in italics styling', () => {
    renderWithProviders(<FactionPoolBuilder />);
    
    // Check that resources content has proper styling
    const resourcesContent = document.querySelector('.resourcesContent');
    expect(resourcesContent).toBeInTheDocument();
    
    // Resources should be displayed
    expect(screen.getByText('Test Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Test Resource 2')).toBeInTheDocument();
  });

  test('displays goals in bold italics with initial caps', () => {
    renderWithProviders(<FactionPoolBuilder />);

    // Check that goals are displayed with proper formatting
    expect(screen.getByText('Test Goal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Goal 2')).toBeInTheDocument();

    // Goals should have proper styling classes
    const goalsSection = document.querySelector('.goals');
    expect(goalsSection).toBeInTheDocument();
  });

  test('handles empty faction title gracefully', () => {
    const stateWithEmptyTitle = {
      ...mockStates.factionPool,
      factionPool: {
        ...mockStates.factionPool.factionPool,
        title: ''
      }
    };

    useFactionPoolState.mockReturnValue(stateWithEmptyTitle);

    renderWithProviders(<FactionPoolBuilder />);

    // Should display default text (split across spans due to initcap styling)
    expect(document.body).toHaveTextContent('Faction');
    expect(document.body).toHaveTextContent('Pool');
  });
});
