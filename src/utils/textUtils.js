/**
 * Utility functions for processing text input in forms
 */

/**
 * Parse multi-line text into an array of non-empty lines
 * @param {string} text - Multi-line text string
 * @returns {string[]} Array of trimmed, non-empty lines
 */
export function parseTextLines(text) {
  if (!text || typeof text !== 'string') return [];
  return text.split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

/**
 * Parse traits from multi-line text
 * @param {string} traitsText - Multi-line traits text
 * @returns {string[]} Array of trait strings
 */
export function parseTraits(traitsText) {
  return parseTextLines(traitsText);
}

/**
 * Parse moves from multi-line text
 * @param {string} movesText - Multi-line moves text
 * @returns {string[]} Array of move strings
 */
export function parseMoves(movesText) {
  return parseTextLines(movesText);
}

/**
 * Parse flavor items from multi-line text
 * @param {string} flavorText - Multi-line flavor text
 * @returns {string[]} Array of flavor item strings
 */
export function parseFlavorItems(flavorText) {
  return parseTextLines(flavorText);
}

/**
 * Clean text by removing common prefixes
 * @param {string} text - Text to clean
 * @param {string} prefix - Prefix to remove (case insensitive)
 * @returns {string} Cleaned text
 */
export function cleanTextPrefix(text, prefix) {
  if (!text || !prefix) return text;
  const regex = new RegExp(`^\\s*${prefix}\\s*`, 'i');
  return text.replace(regex, '').trim();
}

/**
 * Format colors string from labels
 * @param {string[]} labels - Array of color labels
 * @returns {string} Comma-separated color string
 */
export function formatColorsString(labels) {
  return labels.filter(Boolean).join(', ');
}
