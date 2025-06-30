import React from 'react';
import { render, screen } from '@testing-library/react';
import EmbodyDisplay from '../../components/common/EmbodyDisplay';

describe('EmbodyDisplay', () => {
  test('renders embody text when provided', () => {
    const embody = 'Gesture dramatically while speaking';
    
    render(<EmbodyDisplay embody={embody} />);
    
    expect(screen.getByText('Gesture dramatically while speaking')).toBeInTheDocument();
  });

  test('renders nothing when embody is empty string', () => {
    const { container } = render(<EmbodyDisplay embody="" />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when embody is null', () => {
    const { container } = render(<EmbodyDisplay embody={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when embody is undefined', () => {
    const { container } = render(<EmbodyDisplay embody={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when no props provided', () => {
    const { container } = render(<EmbodyDisplay />);
    expect(container.firstChild).toBeNull();
  });

  test('renders hand icon with correct attributes', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const icon = screen.getByAltText('Embody at the table');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/grimwild-tools/images/icons/hand.png');
    expect(icon).toHaveClass('embody-icon');
  });

  test('applies correct CSS classes', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const display = document.querySelector('.embody-display');
    const item = document.querySelector('.embody-item');
    const icon = document.querySelector('.embody-icon');
    const text = document.querySelector('.embody-text');
    
    expect(display).toBeInTheDocument();
    expect(item).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test('maintains proper structure with icon and text', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const display = document.querySelector('.embody-display');
    const item = document.querySelector('.embody-item');
    const icon = document.querySelector('.embody-icon');
    const text = document.querySelector('.embody-text');
    
    expect(display).toContainElement(item);
    expect(item).toContainElement(icon);
    expect(item).toContainElement(text);
  });

  test('handles long embody text', () => {
    const longEmbody = 'This is a very long embody description that should still render correctly without any issues and maintain proper formatting';
    
    render(<EmbodyDisplay embody={longEmbody} />);
    
    expect(screen.getByText(longEmbody)).toBeInTheDocument();
  });

  test('handles special characters in embody text', () => {
    const embody = 'Gesture with "dramatic" flair & speak loudly';
    
    render(<EmbodyDisplay embody={embody} />);
    
    expect(screen.getByText(embody)).toBeInTheDocument();
  });

  test('handles numeric content in embody text', () => {
    const embody = 'Hold up 3 fingers and count to 10';
    
    render(<EmbodyDisplay embody={embody} />);
    
    expect(screen.getByText(embody)).toBeInTheDocument();
  });

  test('handles mixed case embody text', () => {
    const embody = 'Gesture DRAMATICALLY while Speaking Softly';
    
    render(<EmbodyDisplay embody={embody} />);
    
    expect(screen.getByText(embody)).toBeInTheDocument();
  });

  test('renders icon as img element', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const icon = screen.getByAltText('Embody at the table');
    expect(icon.tagName).toBe('IMG');
  });

  test('renders text in span element', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const text = document.querySelector('.embody-text');
    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveTextContent('Test embody action');
  });

  test('handles whitespace-only embody as truthy', () => {
    const embody = '   ';

    render(<EmbodyDisplay embody={embody} />);

    // Whitespace-only should be treated as truthy and render
    const embodyText = document.querySelector('.embody-text');
    expect(embodyText).toBeInTheDocument(); // HTML normalizes whitespace
    expect(screen.getByAltText('Embody at the table')).toBeInTheDocument();
  });

  test('handles single character embody', () => {
    const embody = 'A';
    
    render(<EmbodyDisplay embody={embody} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('handles embody with line breaks', () => {
    const embody = 'First line\nSecond line';

    render(<EmbodyDisplay embody={embody} />);

    const embodyText = document.querySelector('.embody-text');
    expect(embodyText).toHaveTextContent('First line Second line'); // HTML normalizes line breaks to spaces
  });

  test('handles embody with tabs', () => {
    const embody = 'Text\twith\ttabs';

    render(<EmbodyDisplay embody={embody} />);

    const embodyText = document.querySelector('.embody-text');
    expect(embodyText).toHaveTextContent('Text with tabs'); // HTML normalizes tabs to spaces
  });

  test('renders with proper semantic structure', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const display = document.querySelector('.embody-display');
    const item = document.querySelector('.embody-item');
    
    expect(display).toBeInTheDocument();
    expect(item).toBeInTheDocument();
    expect(display.children).toHaveLength(1);
    expect(item.children).toHaveLength(2); // icon and text
  });

  test('icon has proper accessibility attributes', () => {
    const embody = 'Test embody action';
    
    render(<EmbodyDisplay embody={embody} />);
    
    const icon = screen.getByAltText('Embody at the table');
    expect(icon).toHaveAttribute('alt', 'Embody at the table');
    expect(icon).toHaveAttribute('src');
  });

  test('handles boolean false as falsy', () => {
    const { container } = render(<EmbodyDisplay embody={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('handles number zero as falsy', () => {
    const { container } = render(<EmbodyDisplay embody={0} />);
    expect(container.firstChild).toBeNull();
  });

  test('handles non-zero number as truthy', () => {
    render(<EmbodyDisplay embody={123} />);
    
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
