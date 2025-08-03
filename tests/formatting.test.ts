import { describe, it, expect } from 'vitest';
import {
  pad,
  template,
  formatNumber,
  formatBytes,
  slugify,
  randomString,
} from '../src/formatting.js';

describe('Formatting Utilities', () => {
  describe('pad', () => {
    it('should pad strings on the left by default', () => {
      expect(pad('hello', 10)).toBe('     hello');
      expect(pad('test', 8)).toBe('    test');
    });

    it('should pad strings on the right', () => {
      expect(pad('hello', 10, { direction: 'right' })).toBe('hello     ');
      expect(pad('test', 8, { direction: 'right' })).toBe('test    ');
    });

    it('should pad strings on both sides', () => {
      expect(pad('hello', 11, { direction: 'both' })).toBe('   hello   ');
      expect(pad('test', 10, { direction: 'both' })).toBe('   test   ');
    });

    it('should use custom padding character', () => {
      expect(pad('hello', 10, { char: '0' })).toBe('00000hello');
      expect(pad('test', 8, { char: '*', direction: 'right' })).toBe('test****');
    });

    it('should not pad strings that are already long enough', () => {
      expect(pad('hello', 5)).toBe('hello');
      expect(pad('hello', 3)).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(pad('', 5)).toBe('     ');
      expect(pad('', 5, { char: '*' })).toBe('*****');
    });
  });

  describe('template', () => {
    it('should replace template variables', () => {
      expect(template('Hello {{name}}!', { name: 'World' })).toBe('Hello World!');
      expect(template('{{greeting}} {{name}}!', { greeting: 'Hi', name: 'John' })).toBe('Hi John!');
    });

    it('should handle multiple occurrences of same variable', () => {
      expect(template('{{name}} says hello to {{name}}', { name: 'Alice' })).toBe('Alice says hello to Alice');
    });

    it('should leave unknown variables unchanged', () => {
      expect(template('Hello {{name}} and {{unknown}}!', { name: 'World' })).toBe('Hello World and {{unknown}}!');
    });

    it('should handle various data types', () => {
      expect(template('Number: {{num}}, Boolean: {{bool}}', { num: 42, bool: true })).toBe('Number: 42, Boolean: true');
    });

    it('should handle empty template', () => {
      expect(template('', { name: 'test' })).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with default comma separator', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(999)).toBe('999');
    });

    it('should use custom separator', () => {
      expect(formatNumber(1000, '.')).toBe('1.000');
      expect(formatNumber(1234567, ' ')).toBe('1 234 567');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
      expect(formatNumber(-1234567)).toBe('-1,234,567');
    });

    it('should handle edge cases', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(123)).toBe('123');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
    });

    it('should handle decimal places', () => {
      expect(formatBytes(1536, 2)).toBe('1.5 KB');
      expect(formatBytes(1536, 0)).toBe('2 KB');
      expect(formatBytes(1536, 3)).toBe('1.5 KB');
    });

    it('should handle large numbers', () => {
      expect(formatBytes(1099511627776)).toBe('1 TB');
      expect(formatBytes(1125899906842624)).toBe('1 PB');
    });

    it('should handle fractional bytes', () => {
      expect(formatBytes(512)).toBe('512 Bytes');
      expect(formatBytes(1500)).toBe('1.46 KB');
    });
  });

  describe('slugify', () => {
    it('should create URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('The Quick Brown Fox')).toBe('the-quick-brown-fox');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello @#$ World!')).toBe('hello-world');
      expect(slugify('Test (with) [brackets]')).toBe('test-with-brackets');
    });

    it('should handle multiple spaces and hyphens', () => {
      expect(slugify('hello    world')).toBe('hello-world');
      expect(slugify('hello---world')).toBe('hello-world');
      expect(slugify('hello___world')).toBe('hello-world');
    });

    it('should trim leading and trailing characters', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
      expect(slugify('---hello world---')).toBe('hello-world');
    });

    it('should handle empty and edge cases', () => {
      expect(slugify('')).toBe('');
      expect(slugify('   ')).toBe('');
      expect(slugify('a')).toBe('a');
    });
  });

  describe('randomString', () => {
    it('should generate strings of correct length', () => {
      expect(randomString(5)).toHaveLength(5);
      expect(randomString(10)).toHaveLength(10);
      expect(randomString(0)).toHaveLength(0);
    });

    it('should use only characters from default charset', () => {
      const result = randomString(100);
      const validChars = /^[a-zA-Z0-9]+$/;
      expect(validChars.test(result)).toBe(true);
    });

    it('should use custom charset', () => {
      const result = randomString(10, 'abc');
      const validChars = /^[abc]+$/;
      expect(validChars.test(result)).toBe(true);
      expect(result).toHaveLength(10);
    });

    it('should generate different strings', () => {
      const str1 = randomString(20);
      const str2 = randomString(20);
      expect(str1).not.toBe(str2);
    });

    it('should handle single character charset', () => {
      const result = randomString(5, 'x');
      expect(result).toBe('xxxxx');
    });
  });
});