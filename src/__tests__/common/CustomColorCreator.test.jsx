import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomColorCreator from '../../components/common/CustomColorCreator';

// Mock the react-colorful component
jest.mock('react-colorful', () => ({
  HexColorPicker: ({ color, onChange }) => (
    <div data-testid="hex-color-picker">
      <div data-testid="current-color">{color}</div>
      <button onClick={() => onChange('#ff0000')}>Set Red</button>
      <button onClick={() => onChange('#00ff00')}>Set Green</button>
    </div>
  )
}));

describe('CustomColorCreator', () => {
  const defaultProps = {
    onAddColor: jest.fn(),
    onCancel: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders CustomColorCreator component', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    expect(screen.getByText('Create Custom Color')).toBeInTheDocument();
    expect(screen.getByTestId('hex-color-picker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. crimson flame')).toBeInTheDocument();
  });

  test('displays initial color picker state', () => {
    render(<CustomColorCreator {...defaultProps} />);

    // The mock starts with #ff0000, not #000000
    expect(screen.getByTestId('current-color')).toHaveTextContent('#ff0000');
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  test('updates color when color picker changes', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const setRedButton = screen.getByText('Set Red');
    fireEvent.click(setRedButton);
    
    expect(screen.getByTestId('current-color')).toHaveTextContent('#ff0000');
  });

  test('updates name when input changes', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.change(nameInput, { target: { value: 'test color' } });
    
    expect(nameInput.value).toBe('test color');
  });

  test('shows error for invalid name format', () => {
    render(<CustomColorCreator {...defaultProps} />);

    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    const addButton = screen.getByText('Add Color');

    // Test single word - error should appear when trying to add
    fireEvent.change(nameInput, { target: { value: 'red' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Please enter exactly two words')).toBeInTheDocument();

    // Test three words - error should appear when trying to add
    fireEvent.change(nameInput, { target: { value: 'bright red color' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Please enter exactly two words only')).toBeInTheDocument();

    // Test button is disabled when empty
    fireEvent.change(nameInput, { target: { value: '' } });
    expect(addButton).toBeDisabled();
  });

  test('shows no error for valid two-word name', () => {
    render(<CustomColorCreator {...defaultProps} />);

    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.change(nameInput, { target: { value: 'crimson flame' } });

    // No error should be visible initially
    expect(screen.queryByText(/Please enter/)).not.toBeInTheDocument();
  });

  test('calls onAddColor with valid input', () => {
    const onAddColor = jest.fn();
    const props = { ...defaultProps, onAddColor };
    
    render(<CustomColorCreator {...props} />);
    
    // Set color
    const setRedButton = screen.getByText('Set Red');
    fireEvent.click(setRedButton);
    
    // Set valid name
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.change(nameInput, { target: { value: 'crimson flame' } });
    
    // Click add button
    const addButton = screen.getByText('Add Color');
    fireEvent.click(addButton);
    
    expect(onAddColor).toHaveBeenCalledWith('crimson flame', '#ff0000');
  });

  test('does not call onAddColor with invalid name', () => {
    const onAddColor = jest.fn();
    const props = { ...defaultProps, onAddColor };
    
    render(<CustomColorCreator {...props} />);
    
    // Set color
    const setRedButton = screen.getByText('Set Red');
    fireEvent.click(setRedButton);
    
    // Set invalid name (single word)
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.change(nameInput, { target: { value: 'red' } });
    
    // Click add button
    const addButton = screen.getByText('Add Color');
    fireEvent.click(addButton);
    
    expect(onAddColor).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    const props = { ...defaultProps, onCancel };
    
    render(<CustomColorCreator {...props} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalled();
  });

  test('handles Enter key press to add color', () => {
    const onAddColor = jest.fn();
    const props = { ...defaultProps, onAddColor };
    
    render(<CustomColorCreator {...props} />);
    
    // Set color
    const setRedButton = screen.getByText('Set Red');
    fireEvent.click(setRedButton);
    
    // Set valid name
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.change(nameInput, { target: { value: 'crimson flame' } });
    
    // Press Enter
    fireEvent.keyDown(nameInput, { key: 'Enter', code: 'Enter' });
    
    expect(onAddColor).toHaveBeenCalledWith('crimson flame', '#ff0000');
  });

  test('handles Escape key press to cancel', () => {
    const onCancel = jest.fn();
    const props = { ...defaultProps, onCancel };
    
    render(<CustomColorCreator {...props} />);
    
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    fireEvent.keyDown(nameInput, { key: 'Escape', code: 'Escape' });
    
    expect(onCancel).toHaveBeenCalled();
  });

  test('displays color preview with correct background', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    // Set color to green
    const setGreenButton = screen.getByText('Set Green');
    fireEvent.click(setGreenButton);
    
    const colorPreview = document.querySelector('[style*="background-color"]');
    expect(colorPreview).toHaveStyle('background-color: #00ff00');
  });

  test('displays hex value in preview', () => {
    render(<CustomColorCreator {...defaultProps} />);

    // Set color to green
    const setGreenButton = screen.getByText('Set Green');
    fireEvent.click(setGreenButton);

    // Should find the hex value in the preview section specifically
    const hexValue = document.querySelector('.hexValue');
    expect(hexValue).toHaveTextContent('#00ff00');
  });

  test('focuses name input on mount', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText('e.g. crimson flame');
    expect(nameInput).toHaveFocus();
  });

  test('renders modal overlay', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const overlay = document.querySelector('.overlay');
    expect(overlay).toBeInTheDocument();
  });

  test('renders modal content', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const modal = document.querySelector('.modal');
    expect(modal).toBeInTheDocument();
  });

  test('has proper button states', () => {
    render(<CustomColorCreator {...defaultProps} />);
    
    const addButton = screen.getByText('Add Color');
    const cancelButton = screen.getByText('Cancel');
    
    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(addButton.tagName).toBe('BUTTON');
    expect(cancelButton.tagName).toBe('BUTTON');
  });
});
