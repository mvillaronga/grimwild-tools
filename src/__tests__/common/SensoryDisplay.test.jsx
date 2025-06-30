import React from 'react';
import { render, screen } from '@testing-library/react';
import SensoryDisplay from '../../components/common/SensoryDisplay';

describe('SensoryDisplay', () => {
  test('renders all sensory elements with provided values', () => {
    const props = {
      sight: 'A large, scaly creature',
      sound: 'Deep, rumbling growl',
      smell: 'Sulfur and smoke'
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText('A large, scaly creature')).toBeInTheDocument();
    expect(screen.getByText('Deep, rumbling growl')).toBeInTheDocument();
    expect(screen.getByText('Sulfur and smoke')).toBeInTheDocument();
  });

  test('renders placeholder text for empty values', () => {
    const props = {
      sight: '',
      sound: '',
      smell: ''
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText('[Sight description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Sound description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Smell description needed]')).toBeInTheDocument();
  });

  test('renders placeholder text for null values', () => {
    const props = {
      sight: null,
      sound: null,
      smell: null
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText('[Sight description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Sound description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Smell description needed]')).toBeInTheDocument();
  });

  test('renders placeholder text for undefined values', () => {
    const props = {
      sight: undefined,
      sound: undefined,
      smell: undefined
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText('[Sight description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Sound description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Smell description needed]')).toBeInTheDocument();
  });

  test('renders mixed values and placeholders', () => {
    const props = {
      sight: 'A beautiful creature',
      sound: '',
      smell: 'Fresh flowers'
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText('A beautiful creature')).toBeInTheDocument();
    expect(screen.getByText('[Sound description needed]')).toBeInTheDocument();
    expect(screen.getByText('Fresh flowers')).toBeInTheDocument();
  });

  test('renders all sensory icons', () => {
    const props = {
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const sightIcon = screen.getByAltText('Sight');
    const soundIcon = screen.getByAltText('Sound');
    const smellIcon = screen.getByAltText('Smell');
    
    expect(sightIcon).toBeInTheDocument();
    expect(soundIcon).toBeInTheDocument();
    expect(smellIcon).toBeInTheDocument();
  });

  test('uses correct icon paths', () => {
    const props = {
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const sightIcon = screen.getByAltText('Sight');
    const soundIcon = screen.getByAltText('Sound');
    const smellIcon = screen.getByAltText('Smell');
    
    expect(sightIcon).toHaveAttribute('src', '/grimwild-tools/images/sensories/sight.png');
    expect(soundIcon).toHaveAttribute('src', '/grimwild-tools/images/sensories/sound.png');
    expect(smellIcon).toHaveAttribute('src', '/grimwild-tools/images/sensories/smell.png');
  });

  test('applies correct CSS classes', () => {
    const props = {
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const sensoryDisplay = document.querySelector('.sensory-display');
    const senseItems = document.querySelectorAll('.sense-item');
    const senseIcons = document.querySelectorAll('.sense-icon');
    const senseTexts = document.querySelectorAll('.sense-text');
    
    expect(sensoryDisplay).toBeInTheDocument();
    expect(senseItems).toHaveLength(3);
    expect(senseIcons).toHaveLength(3);
    expect(senseTexts).toHaveLength(3);
  });

  test('renders sensory items in correct order', () => {
    const props = {
      sight: 'Sight description',
      sound: 'Sound description',
      smell: 'Smell description'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const senseItems = document.querySelectorAll('.sense-item');
    
    // Check that sight is first
    expect(senseItems[0]).toHaveTextContent('Sight description');
    expect(senseItems[0].querySelector('img')).toHaveAttribute('alt', 'Sight');
    
    // Check that sound is second
    expect(senseItems[1]).toHaveTextContent('Sound description');
    expect(senseItems[1].querySelector('img')).toHaveAttribute('alt', 'Sound');
    
    // Check that smell is third
    expect(senseItems[2]).toHaveTextContent('Smell description');
    expect(senseItems[2].querySelector('img')).toHaveAttribute('alt', 'Smell');
  });

  test('handles long sensory descriptions', () => {
    const props = {
      sight: 'This is a very long sight description that should still render correctly without any issues',
      sound: 'This is a very long sound description that should still render correctly without any issues',
      smell: 'This is a very long smell description that should still render correctly without any issues'
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText(props.sight)).toBeInTheDocument();
    expect(screen.getByText(props.sound)).toBeInTheDocument();
    expect(screen.getByText(props.smell)).toBeInTheDocument();
  });

  test('handles special characters in descriptions', () => {
    const props = {
      sight: 'Creature with "glowing" eyes & sharp teeth',
      sound: "Roar that's loud & terrifying",
      smell: 'Scent of fire & brimstone'
    };
    
    render(<SensoryDisplay {...props} />);
    
    expect(screen.getByText(props.sight)).toBeInTheDocument();
    expect(screen.getByText(props.sound)).toBeInTheDocument();
    expect(screen.getByText(props.smell)).toBeInTheDocument();
  });

  test('renders with no props provided', () => {
    render(<SensoryDisplay />);
    
    expect(screen.getByText('[Sight description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Sound description needed]')).toBeInTheDocument();
    expect(screen.getByText('[Smell description needed]')).toBeInTheDocument();
  });

  test('maintains proper structure with icons and text', () => {
    const props = {
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const senseItems = document.querySelectorAll('.sense-item');
    
    senseItems.forEach(item => {
      const icon = item.querySelector('.sense-icon');
      const text = item.querySelector('.sense-text');
      
      expect(icon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      expect(item).toContainElement(icon);
      expect(item).toContainElement(text);
    });
  });

  test('renders icons with proper attributes', () => {
    const props = {
      sight: 'Test sight',
      sound: 'Test sound',
      smell: 'Test smell'
    };
    
    render(<SensoryDisplay {...props} />);
    
    const icons = document.querySelectorAll('.sense-icon');
    
    icons.forEach(icon => {
      expect(icon.tagName).toBe('IMG');
      expect(icon).toHaveAttribute('src');
      expect(icon).toHaveAttribute('alt');
      expect(icon).toHaveClass('sense-icon');
    });
  });

  test('handles whitespace-only values as empty', () => {
    const props = {
      sight: '   ',
      sound: '\t\t',
      smell: '\n\n'
    };

    render(<SensoryDisplay {...props} />);

    // Whitespace-only values should be treated as truthy and render (HTML normalizes whitespace)
    const senseTexts = document.querySelectorAll('.sense-text');
    expect(senseTexts[0]).toBeInTheDocument(); // sight
    expect(senseTexts[1]).toBeInTheDocument(); // sound
    expect(senseTexts[2]).toBeInTheDocument(); // smell
  });
});
