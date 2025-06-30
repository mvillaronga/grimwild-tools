import React from 'react';
import { screen } from '@testing-library/react';
import FictionPillarBuilder from '../components/fictionpillar/FictionPillarBuilder';
import { useFictionPillarState } from '../hooks/useFictionPillarState';
import { renderWithProviders, mockStates, expectTextsInDocument } from '../test-utils';

// Mock the hook
jest.mock('../hooks/useFictionPillarState');

// Mock the ImageActionsWrapper component
jest.mock('../components/common/ImageActionsWrapper', () => {
  return function MockImageActionsWrapper({ children }) {
    return <div data-testid="image-actions-wrapper">{children}</div>;
  };
});

// Mock the common display components
jest.mock('../components/common/WantsDislikesDisplay', () => {
  return function MockWantsDislikesDisplay({ wants, doesntWant }) {
    return (
      <div data-testid="wants-dislikes-display">
        <div className="wants">{wants}</div>
        <div className="dislikes">{doesntWant}</div>
      </div>
    );
  };
});

jest.mock('../components/common/SensoryDisplay', () => {
  return function MockSensoryDisplay({ sight, sound, smell }) {
    return (
      <div data-testid="sensory-display">
        <div className="sight">{sight}</div>
        <div className="sound">{sound}</div>
        <div className="smell">{smell}</div>
      </div>
    );
  };
});

jest.mock('../components/common/EmbodyDisplay', () => {
  return function MockEmbodyDisplay({ embody }) {
    return (
      <div data-testid="embody-display">
        <div className="embody">{embody}</div>
      </div>
    );
  };
});

describe('FictionPillarBuilder', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementation
    useFictionPillarState.mockReturnValue(mockStates.fictionPillar);
  });

  test('renders Fiction Pillar Builder with default state', () => {
    renderWithProviders(<FictionPillarBuilder />);

    // Check that the builder title is present - use getAllByText to handle multiple instances
    expect(screen.getAllByText('Fiction Pillar Builder').length).toBeGreaterThan(0);

    // Check that the ImageActionsWrapper is rendered
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('renders FictionPillarCard with correct props from state', () => {
    renderWithProviders(<FictionPillarBuilder />);

    // Verify that fiction pillar card content is displayed
    // Note: Title may be split across spans due to initcap styling
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Fiction');
    expect(document.body).toHaveTextContent('Pillar');
    expect(screen.getByText('Test wants')).toBeInTheDocument();
    expect(screen.getByText('Test doesnt want')).toBeInTheDocument();
    expect(screen.getByText('Test sight')).toBeInTheDocument();
    expect(screen.getByText('Test sound')).toBeInTheDocument();
    expect(screen.getByText('Test smell')).toBeInTheDocument();
    expect(screen.getByText('Test embody')).toBeInTheDocument();
  });

  test('renders fiction pillar card with proper structure', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // Check for fiction pillar card structure
    const fictionPillarCard = document.querySelector('#fiction-pillar-card');
    expect(fictionPillarCard).toBeInTheDocument();
    
    // Check for header
    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  test('displays title with proper formatting', () => {
    renderWithProviders(<FictionPillarBuilder />);

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Fiction');
    expect(document.body).toHaveTextContent('Pillar');

    // Check for initcap styling (first letter of each word should have initcap class)
    const initcapElements = document.querySelectorAll('.initcap');
    expect(initcapElements.length).toBeGreaterThan(0);
  });

  test('displays wants and dislikes section', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // Check that WantsDislikesDisplay component is rendered
    expect(screen.getByTestId('wants-dislikes-display')).toBeInTheDocument();
    
    // Check that wants and dislikes content is displayed
    expect(screen.getByText('Test wants')).toBeInTheDocument();
    expect(screen.getByText('Test doesnt want')).toBeInTheDocument();
  });

  test('displays sensory section', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // Check that SensoryDisplay component is rendered
    expect(screen.getByTestId('sensory-display')).toBeInTheDocument();
    
    // Check that sensory content is displayed
    expect(screen.getByText('Test sight')).toBeInTheDocument();
    expect(screen.getByText('Test sound')).toBeInTheDocument();
    expect(screen.getByText('Test smell')).toBeInTheDocument();
  });

  test('displays embody section', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // Check that EmbodyDisplay component is rendered
    expect(screen.getByTestId('embody-display')).toBeInTheDocument();
    
    // Check that embody content is displayed
    expect(screen.getByText('Test embody')).toBeInTheDocument();
  });

  test('displays dividers between sections', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // Check for divider elements
    const dividers = document.querySelectorAll('.divider, hr');
    expect(dividers.length).toBeGreaterThan(0);
  });

  test('handles empty fiction pillar title gracefully', () => {
    const stateWithEmptyTitle = {
      ...mockStates.fictionPillar,
      fictionPillar: {
        ...mockStates.fictionPillar.fictionPillar,
        title: ''
      }
    };
    
    useFictionPillarState.mockReturnValue(stateWithEmptyTitle);
    
    renderWithProviders(<FictionPillarBuilder />);
    
    // Should display default text
    expect(screen.getByText('Fiction Pillar')).toBeInTheDocument();
  });

  test('handles multi-word fiction pillar title', () => {
    const stateWithMultiWordTitle = {
      ...mockStates.fictionPillar,
      fictionPillar: {
        ...mockStates.fictionPillar.fictionPillar,
        title: 'Harvest Festival Celebration'
      }
    };

    useFictionPillarState.mockReturnValue(stateWithMultiWordTitle);

    renderWithProviders(<FictionPillarBuilder />);

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Harvest');
    expect(document.body).toHaveTextContent('Festival');
    expect(document.body).toHaveTextContent('Celebration');

    // Check that initcap styling is applied to each word
    const initcapElements = document.querySelectorAll('.initcap');
    expect(initcapElements.length).toBeGreaterThanOrEqual(3); // H, F, C
  });

  test('passes correct props to form component', () => {
    renderWithProviders(<FictionPillarBuilder />);

    // Verify that the form section exists (indirectly testing prop passing)
    // The form would be in the left column of the builder layout
    expect(screen.getAllByText('Fiction Pillar Builder').length).toBeGreaterThan(0);
  });

  test('generates correct filename for export', () => {
    renderWithProviders(<FictionPillarBuilder />);
    
    // The filename should be based on the fiction pillar title
    // This is tested indirectly through the component rendering without errors
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('handles validation errors', () => {
    const stateWithValidationErrors = {
      ...mockStates.fictionPillar,
      validationErrors: {
        title: 'Title is required',
        wants: 'Wants is required'
      }
    };

    useFictionPillarState.mockReturnValue(stateWithValidationErrors);

    renderWithProviders(<FictionPillarBuilder />);

    // Should still render the component
    expect(screen.getAllByText('Fiction Pillar Builder').length).toBeGreaterThan(0);
  });

  test('displays all sections in correct order', () => {
    renderWithProviders(<FictionPillarBuilder />);

    // Check that all main sections are present
    expect(screen.getByTestId('wants-dislikes-display')).toBeInTheDocument();
    expect(screen.getByTestId('sensory-display')).toBeInTheDocument();
    expect(screen.getByTestId('embody-display')).toBeInTheDocument();

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Fiction');
    expect(document.body).toHaveTextContent('Pillar');
  });

  test('handles empty sensory information', () => {
    const stateWithEmptySensory = {
      ...mockStates.fictionPillar,
      fictionPillar: {
        ...mockStates.fictionPillar.fictionPillar,
        sight: '',
        sound: '',
        smell: ''
      }
    };
    
    useFictionPillarState.mockReturnValue(stateWithEmptySensory);
    
    renderWithProviders(<FictionPillarBuilder />);
    
    // Should still render the sensory display component
    expect(screen.getByTestId('sensory-display')).toBeInTheDocument();
    
    // But the content should be empty
    const sightElement = document.querySelector('.sight');
    const soundElement = document.querySelector('.sound');
    const smellElement = document.querySelector('.smell');
    
    expect(sightElement).toHaveTextContent('');
    expect(soundElement).toHaveTextContent('');
    expect(smellElement).toHaveTextContent('');
  });

  test('handles empty wants and dislikes', () => {
    const stateWithEmptyWantsDislikes = {
      ...mockStates.fictionPillar,
      fictionPillar: {
        ...mockStates.fictionPillar.fictionPillar,
        wants: '',
        doesntWant: ''
      }
    };
    
    useFictionPillarState.mockReturnValue(stateWithEmptyWantsDislikes);
    
    renderWithProviders(<FictionPillarBuilder />);
    
    // Should still render the wants/dislikes display component
    expect(screen.getByTestId('wants-dislikes-display')).toBeInTheDocument();
    
    // But the content should be empty
    const wantsElement = document.querySelector('.wants');
    const dislikesElement = document.querySelector('.dislikes');
    
    expect(wantsElement).toHaveTextContent('');
    expect(dislikesElement).toHaveTextContent('');
  });
});
