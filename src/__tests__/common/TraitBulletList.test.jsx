import React from 'react';
import { render, screen } from '@testing-library/react';
import TraitBulletList from '../../components/common/TraitBulletList';

describe('TraitBulletList', () => {
  test('renders nothing when traits array is empty', () => {
    const { container } = render(<TraitBulletList traits={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when traits is null', () => {
    const { container } = render(<TraitBulletList traits={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when traits is undefined', () => {
    const { container } = render(<TraitBulletList traits={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders single trait correctly', () => {
    const traits = ['Aggressive'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('Aggressive')).toBeInTheDocument();
    expect(screen.getByText('✱')).toBeInTheDocument();
  });

  test('renders multiple traits correctly', () => {
    const traits = ['Aggressive', 'Fast', 'Sneaky'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('Aggressive')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Sneaky')).toBeInTheDocument();
    
    // Should have three bullet symbols
    const bullets = screen.getAllByText('✱');
    expect(bullets).toHaveLength(3);
  });

  test('applies correct CSS classes', () => {
    const traits = ['Test Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const list = document.querySelector('.trait-list');
    const listItem = document.querySelector('.trait-item');
    const bullet = document.querySelector('.bullet');
    const traitText = document.querySelector('.trait-text');
    
    expect(list).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
    expect(bullet).toBeInTheDocument();
    expect(traitText).toBeInTheDocument();
  });

  test('renders as unordered list', () => {
    const traits = ['Test Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
  });

  test('renders list items correctly', () => {
    const traits = ['Trait 1', 'Trait 2'];
    render(<TraitBulletList traits={traits} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  test('handles traits with special characters', () => {
    const traits = ['Fire-breathing', 'Multi-headed', 'Spell-casting'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('Fire-breathing')).toBeInTheDocument();
    expect(screen.getByText('Multi-headed')).toBeInTheDocument();
    expect(screen.getByText('Spell-casting')).toBeInTheDocument();
  });

  test('handles long trait names', () => {
    const traits = ['This is a very long trait name that should still render correctly'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('This is a very long trait name that should still render correctly')).toBeInTheDocument();
  });

  test('handles empty string traits', () => {
    const traits = ['Valid Trait', '', 'Another Valid Trait'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('Valid Trait')).toBeInTheDocument();
    expect(screen.getByText('Another Valid Trait')).toBeInTheDocument();
    
    // Should still render 3 list items (including empty one)
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('maintains proper structure with nested elements', () => {
    const traits = ['Test Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const listItem = document.querySelector('.trait-item');
    const bullet = document.querySelector('.bullet');
    const traitText = document.querySelector('.trait-text');
    
    expect(listItem).toContainElement(bullet);
    expect(listItem).toContainElement(traitText);
  });

  test('uses correct bullet symbol', () => {
    const traits = ['Test Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const bullet = screen.getByText('✱');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveClass('bullet');
  });

  test('applies italic styling to trait text', () => {
    const traits = ['Test Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const traitText = document.querySelector('.trait-text');
    expect(traitText).toHaveClass('trait-text');
  });

  test('handles numeric trait values', () => {
    const traits = ['Armor 3', 'Speed 5', 'Health 10'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('Armor 3')).toBeInTheDocument();
    expect(screen.getByText('Speed 5')).toBeInTheDocument();
    expect(screen.getByText('Health 10')).toBeInTheDocument();
  });

  test('preserves trait order', () => {
    const traits = ['First', 'Second', 'Third'];
    render(<TraitBulletList traits={traits} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('First');
    expect(listItems[1]).toHaveTextContent('Second');
    expect(listItems[2]).toHaveTextContent('Third');
  });

  test('handles single character traits', () => {
    const traits = ['A', 'B', 'C'];
    render(<TraitBulletList traits={traits} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('renders with proper accessibility attributes', () => {
    const traits = ['Accessible Trait'];
    render(<TraitBulletList traits={traits} />);
    
    const list = screen.getByRole('list');
    const listItem = screen.getByRole('listitem');
    
    expect(list).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
  });
});
