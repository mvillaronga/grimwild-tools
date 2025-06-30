import React from 'react';
import { render, screen } from '@testing-library/react';
import WantsDislikesDisplay from '../../components/common/WantsDislikesDisplay';

describe('WantsDislikesDisplay', () => {
  test('renders both wants and doesnt want when provided', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('Wants')).toBeInTheDocument();
    expect(screen.getByText('To find treasure')).toBeInTheDocument();
    expect(screen.getByText("Doesn't want")).toBeInTheDocument();
    expect(screen.getByText('To be disturbed')).toBeInTheDocument();
  });

  test('renders only wants when doesnt want is empty', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: ''
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('Wants')).toBeInTheDocument();
    expect(screen.getByText('To find treasure')).toBeInTheDocument();
    expect(screen.queryByText("Doesn't want")).not.toBeInTheDocument();
  });

  test('renders only doesnt want when wants is empty', () => {
    const props = {
      wants: '',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.queryByText('Wants')).not.toBeInTheDocument();
    expect(screen.getByText("Doesn't want")).toBeInTheDocument();
    expect(screen.getByText('To be disturbed')).toBeInTheDocument();
  });

  test('renders nothing when both values are empty', () => {
    const props = {
      wants: '',
      doesntWant: ''
    };
    
    const { container } = render(<WantsDislikesDisplay {...props} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when both values are null', () => {
    const props = {
      wants: null,
      doesntWant: null
    };
    
    const { container } = render(<WantsDislikesDisplay {...props} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when both values are undefined', () => {
    const props = {
      wants: undefined,
      doesntWant: undefined
    };
    
    const { container } = render(<WantsDislikesDisplay {...props} />);
    expect(container.firstChild).toBeNull();
  });

  test('cleans "Wants" prefix from wants text', () => {
    const props = {
      wants: 'Wants to find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('to find treasure')).toBeInTheDocument();
    expect(screen.queryByText('Wants to find treasure')).not.toBeInTheDocument();
  });

  test('cleans "Doesn\'t want" prefix from doesnt want text', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: "Doesn't want to be disturbed"
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('to be disturbed')).toBeInTheDocument();
    expect(screen.queryByText("Doesn't want to be disturbed")).not.toBeInTheDocument();
  });

  test('handles case-insensitive prefix cleaning', () => {
    const props = {
      wants: 'WANTS to find treasure',
      doesntWant: "DOESN'T WANT to be disturbed"
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('to find treasure')).toBeInTheDocument();
    expect(screen.getByText('to be disturbed')).toBeInTheDocument();
  });

  test('handles whitespace in prefix cleaning', () => {
    const props = {
      wants: '  Wants   to find treasure',
      doesntWant: "  Doesn't want   to be disturbed"
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('to find treasure')).toBeInTheDocument();
    expect(screen.getByText('to be disturbed')).toBeInTheDocument();
  });

  test('does not clean text that doesn\'t start with prefix', () => {
    const props = {
      wants: 'Really wants to find treasure',
      doesntWant: "Really doesn't want to be disturbed"
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('Really wants to find treasure')).toBeInTheDocument();
    expect(screen.getByText("Really doesn't want to be disturbed")).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    const display = document.querySelector('.wants-dislikes-display');
    expect(display).toBeInTheDocument();
  });

  test('renders wants and doesnt want labels in bold italic', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    const wantsLabel = screen.getByText('Wants');
    const doesntWantLabel = screen.getByText("Doesn't want");
    
    expect(wantsLabel.tagName).toBe('STRONG');
    expect(wantsLabel.parentElement).toHaveClass('bold');
    expect(doesntWantLabel.tagName).toBe('STRONG');
    expect(doesntWantLabel.parentElement).toHaveClass('bold');
  });

  test('renders content text in italics', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    const wantsText = screen.getByText('To find treasure');
    const doesntWantText = screen.getByText('To be disturbed');
    
    expect(wantsText.tagName).toBe('EM');
    expect(doesntWantText.tagName).toBe('EM');
  });

  test('renders as paragraph elements', () => {
    const props = {
      wants: 'To find treasure',
      doesntWant: 'To be disturbed'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  test('handles long text content', () => {
    const longWants = 'To find a very large treasure that has been hidden for many years in a secret location';
    const longDoesntWant = 'To be disturbed by adventurers who are looking for the same treasure that it is guarding';
    
    const props = {
      wants: longWants,
      doesntWant: longDoesntWant
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText(longWants)).toBeInTheDocument();
    expect(screen.getByText(longDoesntWant)).toBeInTheDocument();
  });

  test('handles special characters in content', () => {
    const props = {
      wants: 'To find "magical" treasure & gold',
      doesntWant: "To be disturbed by thieves & rogues"
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('To find "magical" treasure & gold')).toBeInTheDocument();
    expect(screen.getByText("To be disturbed by thieves & rogues")).toBeInTheDocument();
  });

  test('handles mixed case in content', () => {
    const props = {
      wants: 'To Find TREASURE and Gold',
      doesntWant: 'To Be DISTURBED by Adventurers'
    };
    
    render(<WantsDislikesDisplay {...props} />);
    
    expect(screen.getByText('To Find TREASURE and Gold')).toBeInTheDocument();
    expect(screen.getByText('To Be DISTURBED by Adventurers')).toBeInTheDocument();
  });

  test('renders with no props provided', () => {
    const { container } = render(<WantsDislikesDisplay />);
    expect(container.firstChild).toBeNull();
  });

  test('handles whitespace-only values as empty', () => {
    const props = {
      wants: '   ',
      doesntWant: '\t\t'
    };

    // Component should not render anything for whitespace-only values
    const { container } = render(<WantsDislikesDisplay {...props} />);
    expect(container.firstChild).toBeNull();
  });
});
