import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WantsDislikesForm from '../../components/common/WantsDislikesForm';

describe('WantsDislikesForm', () => {
  const defaultProps = {
    wants: '',
    setWants: jest.fn(),
    doesntWant: '',
    setDoesntWant: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders wants and doesnt want input fields', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    expect(screen.getByLabelText('Wants')).toBeInTheDocument();
    expect(screen.getByLabelText("Doesn't Want")).toBeInTheDocument();
  });

  test('renders default section title', () => {
    render(<WantsDislikesForm {...defaultProps} />);
    
    expect(screen.getByText('Motivations')).toBeInTheDocument();
  });

  test('renders custom section title', () => {
    const props = {
      ...defaultProps,
      sectionTitle: 'Custom Motivations Title'
    };
    
    render(<WantsDislikesForm {...props} />);
    
    expect(screen.getByText('Custom Motivations Title')).toBeInTheDocument();
  });

  test('displays current values in input fields', () => {
    const props = {
      ...defaultProps,
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesForm {...props} />);
    
    expect(screen.getByDisplayValue('To find treasure')).toBeInTheDocument();
    expect(screen.getByDisplayValue('To be disturbed')).toBeInTheDocument();
  });

  test('calls setWants when wants input changes', () => {
    const setWants = jest.fn();
    const props = {
      ...defaultProps,
      setWants
    };
    
    render(<WantsDislikesForm {...props} />);
    
    const wantsInput = screen.getByLabelText('Wants');
    fireEvent.change(wantsInput, { target: { value: 'New wants value' } });
    
    expect(setWants).toHaveBeenCalledWith('New wants value');
  });

  test('calls setDoesntWant when doesnt want input changes', () => {
    const setDoesntWant = jest.fn();
    const props = {
      ...defaultProps,
      setDoesntWant
    };

    render(<WantsDislikesForm {...props} />);

    const doesntWantInput = screen.getByLabelText("Doesn't Want");
    fireEvent.change(doesntWantInput, { target: { value: 'New doesnt want value' } });

    expect(setDoesntWant).toHaveBeenCalledWith('New doesnt want value');
  });

  test('renders default placeholder text', () => {
    render(<WantsDislikesForm {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('What this wants to achieve')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What this wants to avoid')).toBeInTheDocument();
  });

  test('renders custom placeholder text', () => {
    const props = {
      ...defaultProps,
      wantsPlaceholder: 'Custom wants placeholder',
      doesntWantPlaceholder: 'Custom doesnt want placeholder'
    };
    
    render(<WantsDislikesForm {...props} />);
    
    expect(screen.getByPlaceholderText('Custom wants placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Custom doesnt want placeholder')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<WantsDislikesForm {...defaultProps} />);
    
    const form = document.querySelector('.wantsDislikesForm');
    const sectionHeader = document.querySelector('.sectionHeader');
    const labels = document.querySelectorAll('.label');
    const labelTexts = document.querySelectorAll('.labelText');
    const textInputs = document.querySelectorAll('.textInput');
    
    expect(form).toBeInTheDocument();
    expect(sectionHeader).toBeInTheDocument();
    expect(labels).toHaveLength(2);
    expect(labelTexts).toHaveLength(2);
    expect(textInputs).toHaveLength(2);
  });

  test('renders inputs as text type', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    expect(wantsInput).toHaveAttribute('type', 'text');
    expect(doesntWantInput).toHaveAttribute('type', 'text');
  });

  test('maintains proper form structure', () => {
    render(<WantsDislikesForm {...defaultProps} />);
    
    const form = document.querySelector('.wantsDislikesForm');
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
      wants: '',
      doesntWant: ''
    };

    render(<WantsDislikesForm {...props} />);

    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    expect(wantsInput.value).toBe('');
    expect(doesntWantInput.value).toBe('');
  });

  test('handles long text values', () => {
    const longWantsText = 'This is a very long wants description that should still work correctly in the input field';
    const longDoesntWantText = 'This is a very long doesnt want description that should still work correctly in the input field';
    const props = {
      ...defaultProps,
      wants: longWantsText,
      doesntWant: longDoesntWantText
    };

    render(<WantsDislikesForm {...props} />);

    const wantsInput = screen.getByDisplayValue(longWantsText);
    const doesntWantInput = screen.getByDisplayValue(longDoesntWantText);
    expect(wantsInput).toBeInTheDocument();
    expect(doesntWantInput).toBeInTheDocument();
  });

  test('handles special characters in values', () => {
    const props = {
      ...defaultProps,
      wants: 'To find "magical" treasure & gold',
      doesntWant: "To be disturbed by thieves & rogues"
    };
    
    render(<WantsDislikesForm {...props} />);
    
    expect(screen.getByDisplayValue('To find "magical" treasure & gold')).toBeInTheDocument();
    expect(screen.getByDisplayValue("To be disturbed by thieves & rogues")).toBeInTheDocument();
  });

  test('renders label texts correctly', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    const labelTexts = document.querySelectorAll('.labelText');

    expect(labelTexts[0]).toHaveTextContent('Wants');
    expect(labelTexts[1]).toHaveTextContent("Doesn't Want");
  });

  test('associates labels with inputs correctly', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    expect(wantsInput).toBeInTheDocument();
    expect(doesntWantInput).toBeInTheDocument();
  });

  test('handles multiple rapid changes', () => {
    const setWants = jest.fn();
    const setDoesntWant = jest.fn();
    const props = {
      ...defaultProps,
      setWants,
      setDoesntWant
    };

    render(<WantsDislikesForm {...props} />);

    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    fireEvent.change(wantsInput, { target: { value: 'First' } });
    fireEvent.change(wantsInput, { target: { value: 'Second' } });
    fireEvent.change(doesntWantInput, { target: { value: 'Third' } });

    expect(setWants).toHaveBeenCalledWith('First');
    expect(setWants).toHaveBeenCalledWith('Second');
    expect(setDoesntWant).toHaveBeenCalledWith('Third');
    expect(setWants).toHaveBeenCalledTimes(2);
    expect(setDoesntWant).toHaveBeenCalledTimes(1);
  });

  test('renders with all optional props', () => {
    const props = {
      wants: 'Test wants',
      setWants: jest.fn(),
      doesntWant: 'Test doesnt want',
      setDoesntWant: jest.fn(),
      wantsPlaceholder: 'Custom wants placeholder',
      doesntWantPlaceholder: 'Custom doesnt want placeholder',
      sectionTitle: 'Custom Section Title'
    };
    
    render(<WantsDislikesForm {...props} />);
    
    expect(screen.getByText('Custom Section Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test wants')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test doesnt want')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Custom wants placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Custom doesnt want placeholder')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    // Just test that focus events can be fired without errors
    fireEvent.focus(wantsInput);
    fireEvent.focus(doesntWantInput);
    fireEvent.blur(wantsInput);
    fireEvent.blur(doesntWantInput);

    // Verify inputs are still in the document
    expect(wantsInput).toBeInTheDocument();
    expect(doesntWantInput).toBeInTheDocument();
  });

  test('maintains input order in DOM', () => {
    render(<WantsDislikesForm {...defaultProps} />);

    const inputs = screen.getAllByRole('textbox');
    const wantsInput = screen.getByLabelText('Wants');
    const doesntWantInput = screen.getByLabelText("Doesn't Want");

    expect(inputs[0]).toBe(wantsInput);
    expect(inputs[1]).toBe(doesntWantInput);
  });
});
