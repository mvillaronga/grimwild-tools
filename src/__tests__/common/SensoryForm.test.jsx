import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SensoryForm from '../../components/common/SensoryForm';

describe('SensoryForm', () => {
  const defaultProps = {
    sight: '',
    setSight: jest.fn(),
    sound: '',
    setSound: jest.fn(),
    smell: '',
    setSmell: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all sensory input fields', () => {
    render(<SensoryForm {...defaultProps} />);
    
    expect(screen.getByLabelText('Sight')).toBeInTheDocument();
    expect(screen.getByLabelText('Sound')).toBeInTheDocument();
    expect(screen.getByLabelText('Smell')).toBeInTheDocument();
  });

  test('renders default section title', () => {
    render(<SensoryForm {...defaultProps} />);
    
    expect(screen.getByText('Sensory Information')).toBeInTheDocument();
  });

  test('renders custom section title', () => {
    const props = {
      ...defaultProps,
      sectionTitle: 'Custom Sensory Title'
    };
    
    render(<SensoryForm {...props} />);
    
    expect(screen.getByText('Custom Sensory Title')).toBeInTheDocument();
  });

  test('displays current values in input fields', () => {
    const props = {
      ...defaultProps,
      sight: 'Large creature',
      sound: 'Loud roar',
      smell: 'Sulfur scent'
    };
    
    render(<SensoryForm {...props} />);
    
    expect(screen.getByDisplayValue('Large creature')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Loud roar')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sulfur scent')).toBeInTheDocument();
  });

  test('calls setSight when sight input changes', () => {
    const setSight = jest.fn();
    const props = {
      ...defaultProps,
      setSight
    };
    
    render(<SensoryForm {...props} />);
    
    const sightInput = screen.getByLabelText('Sight');
    fireEvent.change(sightInput, { target: { value: 'New sight description' } });
    
    expect(setSight).toHaveBeenCalledWith('New sight description');
  });

  test('calls setSound when sound input changes', () => {
    const setSound = jest.fn();
    const props = {
      ...defaultProps,
      setSound
    };
    
    render(<SensoryForm {...props} />);
    
    const soundInput = screen.getByLabelText('Sound');
    fireEvent.change(soundInput, { target: { value: 'New sound description' } });
    
    expect(setSound).toHaveBeenCalledWith('New sound description');
  });

  test('calls setSmell when smell input changes', () => {
    const setSmell = jest.fn();
    const props = {
      ...defaultProps,
      setSmell
    };
    
    render(<SensoryForm {...props} />);
    
    const smellInput = screen.getByLabelText('Smell');
    fireEvent.change(smellInput, { target: { value: 'New smell description' } });
    
    expect(setSmell).toHaveBeenCalledWith('New smell description');
  });

  test('renders placeholder text for inputs', () => {
    render(<SensoryForm {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('What this looks like')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What this sounds like')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What this smells like')).toBeInTheDocument();
  });

  test('applies required attribute when required prop is true', () => {
    const props = {
      ...defaultProps,
      required: true
    };
    
    render(<SensoryForm {...props} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput).toBeRequired();
    expect(soundInput).toBeRequired();
    expect(smellInput).toBeRequired();
  });

  test('does not apply required attribute when required prop is false', () => {
    const props = {
      ...defaultProps,
      required: false
    };
    
    render(<SensoryForm {...props} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput).not.toBeRequired();
    expect(soundInput).not.toBeRequired();
    expect(smellInput).not.toBeRequired();
  });

  test('does not apply required attribute by default', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput).not.toBeRequired();
    expect(soundInput).not.toBeRequired();
    expect(smellInput).not.toBeRequired();
  });

  test('applies correct CSS classes', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const form = document.querySelector('.sensoryForm');
    const sectionHeader = document.querySelector('.sectionHeader');
    const labels = document.querySelectorAll('.label');
    const labelTexts = document.querySelectorAll('.labelText');
    const textInputs = document.querySelectorAll('.textInput');
    
    expect(form).toBeInTheDocument();
    expect(sectionHeader).toBeInTheDocument();
    expect(labels).toHaveLength(3);
    expect(labelTexts).toHaveLength(3);
    expect(textInputs).toHaveLength(3);
  });

  test('renders inputs as text type', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput).toHaveAttribute('type', 'text');
    expect(soundInput).toHaveAttribute('type', 'text');
    expect(smellInput).toHaveAttribute('type', 'text');
  });

  test('maintains proper form structure', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const form = document.querySelector('.sensoryForm');
    const sectionHeader = document.querySelector('.sectionHeader');
    const labels = document.querySelectorAll('.label');
    
    expect(form).toContainElement(sectionHeader);
    labels.forEach(label => {
      expect(form).toContainElement(label);
    });
  });

  test('handles empty string values', () => {
    const props = {
      ...defaultProps,
      sight: '',
      sound: '',
      smell: ''
    };
    
    render(<SensoryForm {...props} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput.value).toBe('');
    expect(soundInput.value).toBe('');
    expect(smellInput.value).toBe('');
  });

  test('handles long text values', () => {
    const longSightText = 'This is a very long sight description that should still work correctly in the input field';
    const longSoundText = 'This is a very long sound description that should still work correctly in the input field';
    const longSmellText = 'This is a very long smell description that should still work correctly in the input field';
    const props = {
      ...defaultProps,
      sight: longSightText,
      sound: longSoundText,
      smell: longSmellText
    };

    render(<SensoryForm {...props} />);

    expect(screen.getByDisplayValue(longSightText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(longSoundText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(longSmellText)).toBeInTheDocument();
  });

  test('handles special characters in values', () => {
    const props = {
      ...defaultProps,
      sight: 'Creature with "glowing" eyes & sharp teeth',
      sound: "Roar that's loud & terrifying",
      smell: 'Scent of fire & brimstone'
    };
    
    render(<SensoryForm {...props} />);
    
    expect(screen.getByDisplayValue('Creature with "glowing" eyes & sharp teeth')).toBeInTheDocument();
    expect(screen.getByDisplayValue("Roar that's loud & terrifying")).toBeInTheDocument();
    expect(screen.getByDisplayValue('Scent of fire & brimstone')).toBeInTheDocument();
  });

  test('renders label texts correctly', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const labelTexts = document.querySelectorAll('.labelText');
    
    expect(labelTexts[0]).toHaveTextContent('Sight');
    expect(labelTexts[1]).toHaveTextContent('Sound');
    expect(labelTexts[2]).toHaveTextContent('Smell');
  });

  test('associates labels with inputs correctly', () => {
    render(<SensoryForm {...defaultProps} />);
    
    const sightInput = screen.getByLabelText('Sight');
    const soundInput = screen.getByLabelText('Sound');
    const smellInput = screen.getByLabelText('Smell');
    
    expect(sightInput).toBeInTheDocument();
    expect(soundInput).toBeInTheDocument();
    expect(smellInput).toBeInTheDocument();
  });
});
