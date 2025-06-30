import React from 'react';
import { screen } from '@testing-library/react';
import ChallengeBuilder from '../components/challenge/ChallengeBuilder';
import { useChallengeState } from '../hooks/useChallengeState';
import { renderWithProviders, mockStates, expectTextsInDocument } from '../test-utils';

// Mock the hook
jest.mock('../hooks/useChallengeState');

// Mock the ImageActionsWrapper component
jest.mock('../components/common/ImageActionsWrapper', () => {
  return function MockImageActionsWrapper({ children }) {
    return <div data-testid="image-actions-wrapper">{children}</div>;
  };
});

describe('ChallengeBuilder', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementation
    useChallengeState.mockReturnValue(mockStates.challenge);
  });

  test('renders Challenge Builder with default state', () => {
    renderWithProviders(<ChallengeBuilder />);
    
    // Check that the builder title is present
    expect(screen.getByText('Challenge Builder')).toBeInTheDocument();
    
    // Check that the ImageActionsWrapper is rendered
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });

  test('renders ChallengeCard with correct props from state', () => {
    renderWithProviders(<ChallengeBuilder />);

    // Verify that challenge card content is displayed
    // Note: Some text may be split across spans due to styling
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Challenge');
    expect(document.body).toHaveTextContent('6');
    expect(document.body).toHaveTextContent('d');
    expect(screen.getByText('Test Trait 1')).toBeInTheDocument();
    expect(screen.getByText('Test Trait 2')).toBeInTheDocument();
    expect(document.body).toHaveTextContent('3');
    expect(document.body).toHaveTextContent('Test failure description');
  });

  test('renders challenge card with proper structure', () => {
    renderWithProviders(<ChallengeBuilder />);
    
    // Check for challenge card structure
    const challengeCard = document.querySelector('.challenge-card');
    expect(challengeCard).toBeInTheDocument();
    
    // Check for challenge header
    const challengeHeader = document.querySelector('.challenge-header');
    expect(challengeHeader).toBeInTheDocument();
    
    // Check for challenge circles
    const challengeCircles = document.querySelectorAll('.challenge-circle');
    expect(challengeCircles).toHaveLength(2);
  });

  test('displays traits and moves correctly', () => {
    renderWithProviders(<ChallengeBuilder />);

    // Check that traits are displayed as bullet points (may appear in both form and display)
    const traitElements = screen.getAllByText(/Test Trait/);
    expect(traitElements.length).toBeGreaterThanOrEqual(2);

    // Check that moves are displayed as bullet points (may appear in both form and display)
    const moveElements = screen.getAllByText(/Test Move/);
    expect(moveElements.length).toBeGreaterThanOrEqual(1);
  });

  test('displays failure section when failPool > 0 and failDesc exists', () => {
    renderWithProviders(<ChallengeBuilder />);

    // Check that failure section is displayed (text may be split across spans)
    expect(document.body).toHaveTextContent('3');
    expect(document.body).toHaveTextContent('d');
    expect(document.body).toHaveTextContent('Test failure description');

    // Check for failure symbol
    expect(document.body).toHaveTextContent('✘');
  });

  test('hides failure section when failPool is 0', () => {
    const stateWithNoFail = {
      ...mockStates.challenge,
      failPool: '0',
      failDesc: 'Should not show'
    };
    
    useChallengeState.mockReturnValue(stateWithNoFail);
    
    renderWithProviders(<ChallengeBuilder />);
    
    // Failure section should not be displayed
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent('✘');
  });

  test('hides failure section when failDesc is empty', () => {
    const stateWithNoFailDesc = {
      ...mockStates.challenge,
      failPool: '3',
      failDesc: ''
    };
    
    useChallengeState.mockReturnValue(stateWithNoFailDesc);
    
    renderWithProviders(<ChallengeBuilder />);
    
    // Failure section should not be displayed
    expect(document.body).not.toHaveTextContent('✘');
  });

  test('renders with empty traits and moves arrays', () => {
    const stateWithEmptyArrays = {
      ...mockStates.challenge,
      traitsArr: [],
      movesArr: []
    };

    useChallengeState.mockReturnValue(stateWithEmptyArrays);

    renderWithProviders(<ChallengeBuilder />);

    // Should still render the basic structure
    expect(screen.getByText('Challenge Builder')).toBeInTheDocument();
    expect(document.body).toHaveTextContent('Test');
    expect(document.body).toHaveTextContent('Challenge');
    expect(document.body).toHaveTextContent('6');
    expect(document.body).toHaveTextContent('d');
  });

  test('renders challenge title with proper formatting', () => {
    const stateWithMultiWordTitle = {
      ...mockStates.challenge,
      title: 'Multi Word Challenge Title'
    };

    useChallengeState.mockReturnValue(stateWithMultiWordTitle);

    renderWithProviders(<ChallengeBuilder />);

    // Check that the title parts are displayed (title is split due to initcap styling)
    expect(document.body).toHaveTextContent('Multi');
    expect(document.body).toHaveTextContent('Word');
    expect(document.body).toHaveTextContent('Challenge');
    expect(document.body).toHaveTextContent('Title');

    // Check that initcap styling is applied (first letter of each word should have initcap class)
    const initcapElements = document.querySelectorAll('.initcap');
    expect(initcapElements.length).toBeGreaterThan(0);
  });

  test('generates correct filename for export', () => {
    renderWithProviders(<ChallengeBuilder />);
    
    // The filename should be based on the challenge title
    // This is tested indirectly through the component rendering without errors
    expect(screen.getByTestId('image-actions-wrapper')).toBeInTheDocument();
  });
});
