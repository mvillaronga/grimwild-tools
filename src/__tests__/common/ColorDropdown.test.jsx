import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ColorDropdown from '../../components/common/ColorDropdown';
import { monsterColourHex } from '../../utils/colors';

// Mock the CustomColorCreator component
jest.mock('../../components/common/CustomColorCreator', () => {
  return function MockCustomColorCreator({ onAddColor, onCancel }) {
    return (
      <div data-testid="custom-color-creator">
        <button onClick={() => onAddColor('test color', '#123456')}>Add Color</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe('ColorDropdown', () => {
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

  test('renders dropdown trigger with default state', () => {
    render(<ColorDropdown {...defaultProps} />);

    expect(screen.getByText('Select a color')).toBeInTheDocument();
    expect(document.querySelector('.dropdownTrigger')).toBeInTheDocument();
  });

  test('displays selected color name when colorValue is set', () => {
    const props = {
      ...defaultProps,
      colorValue: 'red',
      labelValue: 'red'
    };
    
    render(<ColorDropdown {...props} />);
    
    expect(screen.getByText('red')).toBeInTheDocument();
  });

  test('opens dropdown menu when trigger is clicked', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Create Custom Color')).toBeInTheDocument();
    expect(screen.getAllByText('Select a color')).toHaveLength(2); // One in trigger, one in dropdown
  });

  test('displays predefined colors in dropdown', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    // Check for some predefined colors from the actual palette
    expect(screen.getByText('blood red')).toBeInTheDocument();
    expect(screen.getByText('azure blue')).toBeInTheDocument();
    expect(screen.getByText('scaly green')).toBeInTheDocument();
  });

  test('displays custom colors in dropdown', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    expect(screen.getByText('custom red')).toBeInTheDocument();
    expect(screen.getByText('custom blue')).toBeInTheDocument();
  });

  test('calls onColorChange when color is selected', () => {
    const onColorChange = jest.fn();
    const onLabelChange = jest.fn();
    const props = {
      ...defaultProps,
      onColorChange,
      onLabelChange
    };

    render(<ColorDropdown {...props} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    const redOption = screen.getByText('blood red');
    fireEvent.click(redOption);

    expect(onColorChange).toHaveBeenCalledWith('blood red');
    expect(onLabelChange).toHaveBeenCalledWith('blood red');
  });

  test('opens custom color creator when "Create Custom Color" is clicked', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    const createCustomOption = screen.getByText('Create Custom Color');
    fireEvent.click(createCustomOption);

    expect(screen.getByTestId('custom-color-creator')).toBeInTheDocument();
  });

  test('handles custom color creation', () => {
    const addCustomColor = jest.fn();
    const props = {
      ...defaultProps,
      customColorsState: {
        ...mockCustomColorsState,
        addCustomColor
      }
    };

    render(<ColorDropdown {...props} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    const createCustomOption = screen.getByText('Create Custom Color');
    fireEvent.click(createCustomOption);

    const addColorButton = screen.getByText('Add Color');
    fireEvent.click(addColorButton);

    expect(addCustomColor).toHaveBeenCalledWith('test color', '#123456');
  });

  test('closes custom color creator when cancelled', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    const createCustomOption = screen.getByText('Create Custom Color');
    fireEvent.click(createCustomOption);

    expect(screen.getByTestId('custom-color-creator')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId('custom-color-creator')).not.toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', async () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Create Custom Color')).toBeInTheDocument();

    // Click outside the dropdown
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Create Custom Color')).not.toBeInTheDocument();
    });
  });

  test('resets selection when empty option is selected', () => {
    const onColorChange = jest.fn();
    const onLabelChange = jest.fn();
    const props = {
      ...defaultProps,
      colorValue: 'blood red',
      labelValue: 'blood red',
      onColorChange,
      onLabelChange
    };

    render(<ColorDropdown {...props} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    const selectOption = document.querySelector('.dropdownItem'); // First dropdown item is "Select a color"
    fireEvent.click(selectOption);

    expect(onColorChange).toHaveBeenCalledWith('');
    expect(onLabelChange).toHaveBeenCalledWith('');
  });

  test('shows custom badge for custom colors', () => {
    render(<ColorDropdown {...defaultProps} />);

    const trigger = document.querySelector('.dropdownTrigger');
    fireEvent.click(trigger);

    expect(screen.getAllByText('custom')).toHaveLength(2); // Two custom colors in mock data
  });

  test('displays color preview with correct background color', () => {
    const props = {
      ...defaultProps,
      colorValue: 'blood red',
      labelValue: 'blood red'
    };

    render(<ColorDropdown {...props} />);

    const colorPreview = document.querySelector('.colorPreview');
    expect(colorPreview).toHaveStyle(`background-color: ${monsterColourHex['blood red']}`);
  });

  test('syncs label with color value when color changes', () => {
    const onLabelChange = jest.fn();

    // First render with no color
    const { rerender } = render(<ColorDropdown {...defaultProps} onLabelChange={onLabelChange} />);

    // Then update with a color value that doesn't match label
    const props = {
      ...defaultProps,
      colorValue: 'azure blue',
      labelValue: 'old-label',
      onLabelChange
    };

    rerender(<ColorDropdown {...props} />);

    expect(onLabelChange).toHaveBeenCalledWith('azure blue');
  });
});
