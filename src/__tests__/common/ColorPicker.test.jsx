import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorPicker from '../../components/common/ColorPicker';

// Mock the ColorDropdown component
jest.mock('../../components/common/ColorDropdown', () => {
  return function MockColorDropdown({ 
    colorValue, 
    onColorChange, 
    labelValue, 
    onLabelChange, 
    customColorsState 
  }) {
    return (
      <div data-testid="color-dropdown">
        <div data-testid="color-value">{colorValue}</div>
        <div data-testid="label-value">{labelValue}</div>
        <button onClick={() => onColorChange('test-color')}>Change Color</button>
        <button onClick={() => onLabelChange('test-label')}>Change Label</button>
        <div data-testid="custom-colors-count">
          {Object.keys(customColorsState.customColors).length}
        </div>
      </div>
    );
  };
});

describe('ColorPicker', () => {
  const mockCustomColorsState = {
    customColors: {
      'custom red': '#ff0000',
      'custom blue': '#0000ff'
    },
    addCustomColor: jest.fn()
  };

  const defaultProps = {
    colorValue: '',
    onColorChange: jest.fn(),
    labelValue: '',
    onLabelChange: jest.fn(),
    customColorsState: mockCustomColorsState
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ColorPicker component', () => {
    render(<ColorPicker {...defaultProps} />);
    
    expect(screen.getByTestId('color-dropdown')).toBeInTheDocument();
  });

  test('passes all props to ColorDropdown', () => {
    const props = {
      colorValue: 'red',
      onColorChange: jest.fn(),
      labelValue: 'red-label',
      onLabelChange: jest.fn(),
      customColorsState: mockCustomColorsState
    };
    
    render(<ColorPicker {...props} />);
    
    expect(screen.getByTestId('color-value')).toHaveTextContent('red');
    expect(screen.getByTestId('label-value')).toHaveTextContent('red-label');
    expect(screen.getByTestId('custom-colors-count')).toHaveTextContent('2');
  });

  test('handles color change events', () => {
    const onColorChange = jest.fn();
    const props = {
      ...defaultProps,
      onColorChange
    };
    
    render(<ColorPicker {...props} />);
    
    const changeColorButton = screen.getByText('Change Color');
    changeColorButton.click();
    
    expect(onColorChange).toHaveBeenCalledWith('test-color');
  });

  test('handles label change events', () => {
    const onLabelChange = jest.fn();
    const props = {
      ...defaultProps,
      onLabelChange
    };
    
    render(<ColorPicker {...props} />);
    
    const changeLabelButton = screen.getByText('Change Label');
    changeLabelButton.click();
    
    expect(onLabelChange).toHaveBeenCalledWith('test-label');
  });

  test('renders with empty values', () => {
    render(<ColorPicker {...defaultProps} />);
    
    expect(screen.getByTestId('color-value')).toHaveTextContent('');
    expect(screen.getByTestId('label-value')).toHaveTextContent('');
  });

  test('renders with custom colors state', () => {
    const customColorsState = {
      customColors: {
        'custom green': '#00ff00',
        'custom yellow': '#ffff00',
        'custom purple': '#800080'
      },
      addCustomColor: jest.fn()
    };
    
    const props = {
      ...defaultProps,
      customColorsState
    };
    
    render(<ColorPicker {...props} />);
    
    expect(screen.getByTestId('custom-colors-count')).toHaveTextContent('3');
  });

  test('applies correct CSS class', () => {
    render(<ColorPicker {...defaultProps} />);
    
    const colorPicker = document.querySelector('.colorPicker');
    expect(colorPicker).toBeInTheDocument();
  });

  test('maintains component structure', () => {
    render(<ColorPicker {...defaultProps} />);
    
    // Check that the ColorPicker wraps the ColorDropdown
    const colorPicker = document.querySelector('.colorPicker');
    const colorDropdown = screen.getByTestId('color-dropdown');
    
    expect(colorPicker).toContainElement(colorDropdown);
  });
});
