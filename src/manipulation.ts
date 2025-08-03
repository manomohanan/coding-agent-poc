/**
 * String manipulation utilities
 */

/**
 * Truncates a string to a specified length with optional ellipsis
 */
export function truncate(str: string, length: number, ellipsis = '...'): string {
  if (!str || str.length <= length) return str;
  
  return str.slice(0, length - ellipsis.length) + ellipsis;
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each word in a string
 */
export function titleCase(str: string): string {
  if (!str) return str;
  
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Reverses a string
 */
export function reverse(str: string): string {
  if (!str) return str;
  
  return str.split('').reverse().join('');
}

/**
 * Removes all whitespace from a string
 */
export function removeWhitespace(str: string): string {
  if (!str) return str;
  
  return str.replace(/\s+/g, '');
}

/**
 * Counts the number of occurrences of a substring in a string
 */
export function countOccurrences(str: string, substring: string): number {
  if (!str || !substring) return 0;
  
  let count = 0;
  let position = 0;
  
  while ((position = str.indexOf(substring, position)) !== -1) {
    count++;
    position += substring.length;
  }
  
  return count;
}

/**
 * Checks if a string is a palindrome
 */
export function isPalindrome(str: string): boolean {
  if (!str) return true;
  
  const cleaned = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

/**
 * Escapes HTML characters in a string
 */
export function escapeHtml(str: string): string {
  if (!str) return str;
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  
  return str.replace(/[&<>"']/g, char => htmlEscapes[char] || char);
}

/**
 * Unescapes HTML characters in a string
 */
export function unescapeHtml(str: string): string {
  if (!str) return str;
  
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
  };
  
  return str.replace(/&(?:amp|lt|gt|quot|#x27);/g, entity => htmlUnescapes[entity] || entity);
}