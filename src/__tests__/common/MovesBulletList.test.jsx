import React from 'react';
import { render, screen } from '@testing-library/react';
import MovesBulletList from '../../components/common/MovesBulletList';

describe('MovesBulletList', () => {
  test('renders nothing when moves array is empty', () => {
    const { container } = render(<MovesBulletList moves={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when moves is null', () => {
    const { container } = render(<MovesBulletList moves={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when moves is undefined', () => {
    const { container } = render(<MovesBulletList moves={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders single move correctly', () => {
    const moves = ['ATTACK'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('TTACK')).toBeInTheDocument(); // First letter is separate
    expect(screen.getByText('◉')).toBeInTheDocument();
  });

  test('renders multiple moves correctly', () => {
    const moves = ['ATTACK', 'DEFEND', 'CAST SPELL'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('TTACK')).toBeInTheDocument(); // First letter is separate
    expect(screen.getByText('EFEND')).toBeInTheDocument(); // First letter is separate
    expect(screen.getByText('AST')).toBeInTheDocument(); // Multi-word moves split differently
    expect(screen.getByText('PELL')).toBeInTheDocument();

    // Should have three bullet symbols
    const bullets = screen.getAllByText('◉');
    expect(bullets).toHaveLength(3);
  });

  test('applies correct CSS classes', () => {
    const moves = ['TEST MOVE'];
    render(<MovesBulletList moves={moves} />);
    
    const list = document.querySelector('.moves-list');
    const listItem = document.querySelector('.move-item');
    const bullet = document.querySelector('.bullet');
    const moveText = document.querySelector('.move-text');
    
    expect(list).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
    expect(bullet).toBeInTheDocument();
    expect(moveText).toBeInTheDocument();
  });

  test('renders as unordered list', () => {
    const moves = ['TEST MOVE'];
    render(<MovesBulletList moves={moves} />);
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
  });

  test('renders list items correctly', () => {
    const moves = ['MOVE ONE', 'MOVE TWO'];
    render(<MovesBulletList moves={moves} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  test('handles moves with multiple words and special formatting', () => {
    const moves = ['FIRE BREATH', 'TAIL SWEEP', 'MAGIC MISSILE'];
    render(<MovesBulletList moves={moves} />);

    // Check that each move is rendered (text is split across elements, first letters separate)
    expect(screen.getByText('IRE')).toBeInTheDocument(); // F is separate
    expect(screen.getByText('REATH')).toBeInTheDocument(); // B is separate
    expect(screen.getByText('AIL')).toBeInTheDocument(); // T is separate
    expect(screen.getByText('WEEP')).toBeInTheDocument(); // S is separate
    expect(screen.getByText('AGIC')).toBeInTheDocument(); // M is separate
    expect(screen.getByText('ISSILE')).toBeInTheDocument(); // M is separate
  });

  test('applies special formatting to first letter of each word', () => {
    const moves = ['FIRE BREATH'];
    render(<MovesBulletList moves={moves} />);
    
    // Check for the presence of move-first-letter class
    const firstLetters = document.querySelectorAll('.move-first-letter');
    expect(firstLetters).toHaveLength(2); // F and B
    expect(firstLetters[0]).toHaveTextContent('F');
    expect(firstLetters[1]).toHaveTextContent('B');
  });

  test('handles single word moves', () => {
    const moves = ['ATTACK'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('TTACK')).toBeInTheDocument(); // First letter is separate

    const firstLetters = document.querySelectorAll('.move-first-letter');
    expect(firstLetters).toHaveLength(1);
    expect(firstLetters[0]).toHaveTextContent('A');
  });

  test('handles empty string moves', () => {
    const moves = ['VALID MOVE', '', 'ANOTHER MOVE'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('ALID')).toBeInTheDocument(); // V is separate
    expect(screen.getAllByText('OVE')).toHaveLength(2); // Both moves end with "OVE"
    expect(screen.getByText('NOTHER')).toBeInTheDocument(); // A is separate

    // Should still render 3 list items (including empty one)
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('maintains proper structure with nested elements', () => {
    const moves = ['TEST MOVE'];
    render(<MovesBulletList moves={moves} />);
    
    const listItem = document.querySelector('.move-item');
    const bullet = document.querySelector('.bullet');
    const moveText = document.querySelector('.move-text');
    
    expect(listItem).toContainElement(bullet);
    expect(listItem).toContainElement(moveText);
  });

  test('uses correct bullet symbol', () => {
    const moves = ['TEST MOVE'];
    render(<MovesBulletList moves={moves} />);
    
    const bullet = screen.getByText('◉');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveClass('bullet');
  });

  test('handles moves with numbers', () => {
    const moves = ['ATTACK 1', 'SPELL 2', 'ABILITY 3'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('TTACK')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('PELL')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('BILITY')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('preserves move order', () => {
    const moves = ['FIRST', 'SECOND', 'THIRD'];
    render(<MovesBulletList moves={moves} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('FIRST');
    expect(listItems[1]).toHaveTextContent('SECOND');
    expect(listItems[2]).toHaveTextContent('THIRD');
  });

  test('handles moves with special characters', () => {
    const moves = ['FIRE-BREATH', 'SPELL-CAST', 'MULTI-ATTACK'];
    render(<MovesBulletList moves={moves} />);

    expect(screen.getByText('IRE-BREATH')).toBeInTheDocument();
    expect(screen.getByText('PELL-CAST')).toBeInTheDocument();
    expect(screen.getByText('ULTI-ATTACK')).toBeInTheDocument();
  });

  test('handles long move names', () => {
    const moves = ['THIS IS A VERY LONG MOVE NAME'];
    render(<MovesBulletList moves={moves} />);

    // Check for individual words since text is split across elements
    expect(screen.getByText('HIS')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('ERY')).toBeInTheDocument();
    expect(screen.getByText('ONG')).toBeInTheDocument();
    expect(screen.getByText('OVE')).toBeInTheDocument();
    expect(screen.getByText('AME')).toBeInTheDocument();
  });

  test('renders with proper accessibility attributes', () => {
    const moves = ['ACCESSIBLE MOVE'];
    render(<MovesBulletList moves={moves} />);
    
    const list = screen.getByRole('list');
    const listItem = screen.getByRole('listitem');
    
    expect(list).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
  });

  test('handles three word moves correctly', () => {
    const moves = ['CAST MAGIC SPELL'];
    render(<MovesBulletList moves={moves} />);

    // Check for individual words since text is split across elements
    expect(screen.getByText('AST')).toBeInTheDocument();
    expect(screen.getByText('AGIC')).toBeInTheDocument();
    expect(screen.getByText('PELL')).toBeInTheDocument();

    const firstLetters = document.querySelectorAll('.move-first-letter');
    expect(firstLetters).toHaveLength(3); // C, M, S
    expect(firstLetters[0]).toHaveTextContent('C');
    expect(firstLetters[1]).toHaveTextContent('M');
    expect(firstLetters[2]).toHaveTextContent('S');
  });

  test('handles single character moves', () => {
    const moves = ['A', 'B', 'C'];
    render(<MovesBulletList moves={moves} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
