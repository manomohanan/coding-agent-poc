import { describe, it, expect } from 'vitest';
import { StringUtils } from '../src/index.js';

describe('StringUtils Class', () => {
  describe('fluent interface', () => {
    it('should chain case transformations', () => {
      const result = StringUtils.of('hello_world')
        .toCamelCase()
        .toPascalCase()
        .toString();
      
      expect(result).toBe('HelloWorld');
    });

    it('should chain manipulations', () => {
      const result = StringUtils.of('  Hello World  ')
        .capitalize()
        .removeWhitespace()
        .reverse()
        .toString();
      
      expect(result).toBe('dlrowolleh');
    });

    it('should chain formatting operations', () => {
      const result = StringUtils.of('hello world')
        .titleCase()
        .slugify()
        .pad(15, { direction: 'both', char: '*' })
        .toString();
      
      expect(result).toBe('**hello-world**');
    });
  });

  describe('validation methods', () => {
    it('should validate email addresses', () => {
      expect(StringUtils.of('test@example.com').isEmail()).toBe(true);
      expect(StringUtils.of('invalid-email').isEmail()).toBe(false);
    });

    it('should validate alphabetic strings', () => {
      expect(StringUtils.of('hello').isAlpha()).toBe(true);
      expect(StringUtils.of('hello123').isAlpha()).toBe(false);
    });

    it('should validate alphanumeric strings', () => {
      expect(StringUtils.of('hello123').isAlphanumeric()).toBe(true);
      expect(StringUtils.of('hello world').isAlphanumeric()).toBe(false);
    });

    it('should validate URLs', () => {
      expect(StringUtils.of('https://example.com').isUrl()).toBe(true);
      expect(StringUtils.of('not-a-url').isUrl()).toBe(false);
    });

    it('should validate numeric strings', () => {
      expect(StringUtils.of('123.45').isNumeric()).toBe(true);
      expect(StringUtils.of('abc').isNumeric()).toBe(false);
    });

    it('should check palindromes', () => {
      expect(StringUtils.of('racecar').isPalindrome()).toBe(true);
      expect(StringUtils.of('hello').isPalindrome()).toBe(false);
    });
  });

  describe('utility methods', () => {
    it('should count occurrences', () => {
      expect(StringUtils.of('hello world').countOccurrences('l')).toBe(3);
      expect(StringUtils.of('hello world').countOccurrences('x')).toBe(0);
    });

    it('should validate against rules', () => {
      const result = StringUtils.of('test').validate({
        minLength: 3,
        maxLength: 10,
        pattern: /^[a-z]+$/,
      });
      
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should validate against failing rules', () => {
      const result = StringUtils.of('Test123').validate({
        pattern: /^[a-z]+$/,
      });
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('String does not match required pattern');
    });
  });

  describe('value extraction', () => {
    it('should return string value with toString', () => {
      const utils = StringUtils.of('hello world').toCamelCase();
      expect(utils.toString()).toBe('helloWorld');
    });

    it('should return string value with valueOf', () => {
      const utils = StringUtils.of('hello world').toCamelCase();
      expect(utils.valueOf()).toBe('helloWorld');
    });
  });

  describe('complex chaining scenarios', () => {
    it('should handle complex transformation pipeline', () => {
      const result = StringUtils.of('  The Quick Brown Fox Jumps Over The Lazy Dog  ')
        .titleCase()
        .removeWhitespace()
        .toSnakeCase()
        .toConstantCase()
        .toString();
      
      expect(result).toBe('THE_QUICK_BROWN_FOX_JUMPS_OVER_THE_LAZY_DOG');
    });

    it('should handle HTML escaping chain', () => {
      const result = StringUtils.of('<script>alert("hello")</script>')
        .escapeHtml()
        .capitalize()
        .toString();
      
      expect(result).toBe('&lt;script&gt;alert(&quot;hello&quot;)&lt;/script&gt;');
    });

    it('should handle formatting and padding chain', () => {
      const result = StringUtils.of('hello world')
        .slugify()
        .pad(20, { direction: 'both', char: '=' })
        .toString();
      
      expect(result).toBe('====hello-world=====');
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      const result = StringUtils.of('')
        .toCamelCase()
        .capitalize()
        .slugify()
        .toString();
      
      expect(result).toBe('');
    });

    it('should handle single character strings', () => {
      const result = StringUtils.of('a')
        .toPascalCase()
        .pad(5, { direction: 'both', char: '*' })
        .toString();
      
      expect(result).toBe('**A**');
    });

    it('should maintain immutability in chains', () => {
      const original = StringUtils.of('hello world');
      const transformed = original.toCamelCase().toPascalCase();
      
      expect(original.toString()).toBe('hello world');
      expect(transformed.toString()).toBe('HelloWorld');
    });
  });
});