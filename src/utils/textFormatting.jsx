import React from 'react';

/**
 * Parses text with asterisk-delimited bold formatting and returns JSX elements
 * @param {string} text - Text that may contain *bold* formatting
 * @param {string} key - Unique key for React elements
 * @returns {Array} Array of JSX elements with bold formatting applied
 */
export function parseTextWithBold(text, key = '') {
  if (!text || typeof text !== 'string') {
    return [text];
  }

  // Split by asterisks, keeping the delimiters
  const parts = text.split(/(\*[^*]*\*)/);
  
  return parts.map((part, index) => {
    // Check if this part is surrounded by asterisks
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      // Remove the asterisks and make it bold
      const boldText = part.slice(1, -1);
      return (
        <strong key={`${key}-bold-${index}`}>
          {boldText}
        </strong>
      );
    }
    
    // Return regular text
    return part || '';
  }).filter(part => part !== ''); // Remove empty strings
}
