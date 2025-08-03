import { describe, it, expect } from 'vitest';
import {
  truncate,
  capitalize,
  titleCase,
  reverse,
  removeWhitespace,
  countOccurrences,
  isPalindrome,
  escapeHtml,
  unescapeHtml,
} from '../src/manipulation.js';

describe('Manipulation Utilities', () => {
  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
      expect(truncate('hello world', 5)).toBe('he...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('hello', 10)).toBe('hello');
      expect(truncate('hello', 5)).toBe('hello');
    });

    it('should use custom ellipsis', () => {
      expect(truncate('hello world', 8, '***')).toBe('hello***');
      expect(truncate('hello world', 6, ' more')).toBe('h more');
    });

    it('should handle empty strings', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('should handle single characters', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('A')).toBe('A');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('titleCase', () => {
    it('should convert to title case', () => {
      expect(titleCase('hello world')).toBe('Hello World');
      expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
      expect(titleCase('HELLO WORLD')).toBe('Hello World');
    });

    it('should handle single words', () => {
      expect(titleCase('hello')).toBe('Hello');
      expect(titleCase('WORLD')).toBe('World');
    });

    it('should handle empty strings', () => {
      expect(titleCase('')).toBe('');
    });
  });

  describe('reverse', () => {
    it('should reverse strings', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
      expect(reverse('12345')).toBe('54321');
    });

    it('should handle single characters', () => {
      expect(reverse('a')).toBe('a');
    });

    it('should handle empty strings', () => {
      expect(reverse('')).toBe('');
    });
  });

  describe('removeWhitespace', () => {
    it('should remove all whitespace', () => {
      expect(removeWhitespace('hello world')).toBe('helloworld');
      expect(removeWhitespace('  a  b  c  ')).toBe('abc');
      expect(removeWhitespace('hello\nworld\t')).toBe('helloworld');
    });

    it('should handle strings without whitespace', () => {
      expect(removeWhitespace('hello')).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(removeWhitespace('')).toBe('');
    });
  });

  describe('countOccurrences', () => {
    it('should count substring occurrences', () => {
      expect(countOccurrences('hello world', 'l')).toBe(3);
      expect(countOccurrences('hello world', 'll')).toBe(1);
      expect(countOccurrences('hello world', 'o')).toBe(2);
    });

    it('should handle non-existent substrings', () => {
      expect(countOccurrences('hello world', 'x')).toBe(0);
      expect(countOccurrences('hello world', 'xyz')).toBe(0);
    });

    it('should handle overlapping patterns', () => {
      expect(countOccurrences('aaaa', 'aa')).toBe(2);
      expect(countOccurrences('abababab', 'aba')).toBe(2);
    });

    it('should handle empty inputs', () => {
      expect(countOccurrences('', 'a')).toBe(0);
      expect(countOccurrences('hello', '')).toBe(0);
      expect(countOccurrences('', '')).toBe(0);
    });
  });

  describe('isPalindrome', () => {
    it('should identify palindromes', () => {
      expect(isPalindrome('racecar')).toBe(true);
      expect(isPalindrome('madam')).toBe(true);
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    });

    it('should handle non-palindromes', () => {
      expect(isPalindrome('hello')).toBe(false);
      expect(isPalindrome('world')).toBe(false);
      expect(isPalindrome('almost')).toBe(false);
    });

    it('should ignore case and punctuation', () => {
      expect(isPalindrome('Racecar')).toBe(true);
      expect(isPalindrome('race a car')).toBe(false); // not a palindrome when spaces matter
      expect(isPalindrome('A@#man@#a@#plan@#a@#canal@#Panama')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(isPalindrome('')).toBe(true);
      expect(isPalindrome('a')).toBe(true);
      expect(isPalindrome('aa')).toBe(true);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML characters', () => {
      expect(escapeHtml('<div>Hello & "world"</div>')).toBe('&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;');
      expect(escapeHtml("It's <great> & \"awesome\"")).toBe('It&#x27;s &lt;great&gt; &amp; &quot;awesome&quot;');
    });

    it('should handle strings without HTML characters', () => {
      expect(escapeHtml('hello world')).toBe('hello world');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('unescapeHtml', () => {
    it('should unescape HTML entities', () => {
      expect(unescapeHtml('&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;')).toBe('<div>Hello & "world"</div>');
      expect(unescapeHtml('It&#x27;s &lt;great&gt; &amp; &quot;awesome&quot;')).toBe("It's <great> & \"awesome\"");
    });

    it('should handle strings without HTML entities', () => {
      expect(unescapeHtml('hello world')).toBe('hello world');
    });

    it('should handle empty strings', () => {
      expect(unescapeHtml('')).toBe('');
    });

    it('should handle partial or invalid entities', () => {
      expect(unescapeHtml('&invalid; &amp;')).toBe('&invalid; &');
    });
  });
});