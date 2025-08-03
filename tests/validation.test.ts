import { describe, it, expect } from 'vitest';
import {
  isEmail,
  isAlpha,
  isAlphanumeric,
  isUrl,
  isNumeric,
  validateString,
} from '../src/validation.js';

describe('Validation Utilities', () => {
  describe('isEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@domain.co.uk')).toBe(true);
      expect(isEmail('test+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isEmail('invalid-email')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@domain')).toBe(false);
      expect(isEmail('')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    it('should validate alphabetic strings', () => {
      expect(isAlpha('hello')).toBe(true);
      expect(isAlpha('WORLD')).toBe(true);
      expect(isAlpha('AbCdEf')).toBe(true);
    });

    it('should reject non-alphabetic strings', () => {
      expect(isAlpha('hello123')).toBe(false);
      expect(isAlpha('hello world')).toBe(false);
      expect(isAlpha('hello-world')).toBe(false);
      expect(isAlpha('123')).toBe(false);
      expect(isAlpha('')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    it('should validate alphanumeric strings', () => {
      expect(isAlphanumeric('hello123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
      expect(isAlphanumeric('test123TEST')).toBe(true);
      expect(isAlphanumeric('onlyletters')).toBe(true);
      expect(isAlphanumeric('123456')).toBe(true);
    });

    it('should reject non-alphanumeric strings', () => {
      expect(isAlphanumeric('hello world')).toBe(false);
      expect(isAlphanumeric('hello-123')).toBe(false);
      expect(isAlphanumeric('test@123')).toBe(false);
      expect(isAlphanumeric('')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate correct URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://test.org')).toBe(true);
      expect(isUrl('https://subdomain.example.com/path')).toBe(true);
      expect(isUrl('ftp://files.example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('example.com')).toBe(false);
      expect(isUrl('http://')).toBe(false);
      expect(isUrl('')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should validate numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('123.45')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
      expect(isNumeric('-123.45')).toBe(true);
      expect(isNumeric('0')).toBe(true);
    });

    it('should reject non-numeric strings', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('123abc')).toBe(false);
      expect(isNumeric('12.34.56')).toBe(false);
      expect(isNumeric('')).toBe(false);
    });
  });

  describe('validateString', () => {
    it('should validate string length constraints', () => {
      const result1 = validateString('hello', { minLength: 3, maxLength: 10 });
      expect(result1.valid).toBe(true);
      expect(result1.errors).toEqual([]);

      const result2 = validateString('hi', { minLength: 5 });
      expect(result2.valid).toBe(false);
      expect(result2.errors).toEqual(['String must be at least 5 characters long']);

      const result3 = validateString('verylongstring', { maxLength: 5 });
      expect(result3.valid).toBe(false);
      expect(result3.errors).toEqual(['String must be no more than 5 characters long']);
    });

    it('should validate pattern constraints', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const result1 = validateString('test@example.com', { pattern: emailPattern });
      expect(result1.valid).toBe(true);
      expect(result1.errors).toEqual([]);

      const result2 = validateString('invalid-email', { pattern: emailPattern });
      expect(result2.valid).toBe(false);
      expect(result2.errors).toEqual(['String does not match required pattern']);
    });

    it('should validate empty string constraints', () => {
      const result1 = validateString('', { allowEmpty: true });
      expect(result1.valid).toBe(true);
      expect(result1.errors).toEqual([]);

      const result2 = validateString('', { allowEmpty: false });
      expect(result2.valid).toBe(false);
      expect(result2.errors).toEqual(['String cannot be empty']);

      const result3 = validateString('', {});
      expect(result3.valid).toBe(false);
      expect(result3.errors).toEqual(['String cannot be empty']);
    });

    it('should combine multiple validation errors', () => {
      const result = validateString('x', {
        minLength: 5,
        pattern: /^\d+$/,
      });
      
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('String must be at least 5 characters long');
      expect(result.errors).toContain('String does not match required pattern');
    });
  });
});